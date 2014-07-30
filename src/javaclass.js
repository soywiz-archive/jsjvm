var utils = require('./utils');
var types = require('./types');

var constantpool = require('./constantpool');
var dynarec = require('./dynarec');
var Stream = utils.Stream;
var ConstantPool = constantpool.ConstantPool;

require('./runtime');

(function (ACC_CLASS) {
    ACC_CLASS[ACC_CLASS["PUBLIC"] = 0x0001] = "PUBLIC";
    ACC_CLASS[ACC_CLASS["FINAL"] = 0x0010] = "FINAL";
    ACC_CLASS[ACC_CLASS["SUPER"] = 0x0020] = "SUPER";
    ACC_CLASS[ACC_CLASS["INTERFACE"] = 0x0200] = "INTERFACE";
    ACC_CLASS[ACC_CLASS["ABSTRACT"] = 0x0400] = "ABSTRACT";
})(exports.ACC_CLASS || (exports.ACC_CLASS = {}));
var ACC_CLASS = exports.ACC_CLASS;
(function (ACC_MEMBER) {
    ACC_MEMBER[ACC_MEMBER["PUBLIC"] = 0x0001] = "PUBLIC";
    ACC_MEMBER[ACC_MEMBER["PRIVATE"] = 0x0002] = "PRIVATE";
    ACC_MEMBER[ACC_MEMBER["PROTECTED"] = 0x0004] = "PROTECTED";
    ACC_MEMBER[ACC_MEMBER["STATIC"] = 0x0008] = "STATIC";
    ACC_MEMBER[ACC_MEMBER["FINAL"] = 0x0010] = "FINAL";
    ACC_MEMBER[ACC_MEMBER["SYNCHRONIZED"] = 0x0020] = "SYNCHRONIZED";
    ACC_MEMBER[ACC_MEMBER["VOLATILE"] = 0x0040] = "VOLATILE";
    ACC_MEMBER[ACC_MEMBER["TRANSIENT"] = 0x0080] = "TRANSIENT";
    ACC_MEMBER[ACC_MEMBER["NATIVE"] = 0x0100] = "NATIVE";
    ACC_MEMBER[ACC_MEMBER["ABSTRACT"] = 0x0400] = "ABSTRACT";
    ACC_MEMBER[ACC_MEMBER["STRICT"] = 0x0800] = "STRICT";
})(exports.ACC_MEMBER || (exports.ACC_MEMBER = {}));
var ACC_MEMBER = exports.ACC_MEMBER;

var JavaMemberInfo = (function () {
    function JavaMemberInfo(access_flags, name_index, descriptor_index, attributes) {
        this.access_flags = access_flags;
        this.name_index = name_index;
        this.descriptor_index = descriptor_index;
        this.attributes = attributes;
    }
    return JavaMemberInfo;
})();
exports.JavaMemberInfo = JavaMemberInfo;

var JavaAttributeInfo = (function () {
    function JavaAttributeInfo(index, data) {
        this.index = index;
        this.data = data;
    }
    return JavaAttributeInfo;
})();
exports.JavaAttributeInfo = JavaAttributeInfo;

var JavaClass = (function () {
    function JavaClass() {
        this.methods = [];
        this.interfaces = [];
        this.fields = [];
        this.attributes = [];
    }
    JavaClass.fromStream = function (stream) {
        var javaClass = new JavaClass();
        javaClass.readData(stream);
        return javaClass;
    };

    JavaClass.prototype.readData = function (stream) {
        var magic = stream.readUInt32BE();
        if (magic != 3405691582)
            throw (new Error("Not a java class"));

        var minor_version = stream.readUInt16BE();
        var major_version = stream.readUInt16BE();

        this.constantPool = ConstantPool.fromStream(stream, stream.readUInt16BE());

        this.access_flags = stream.readUInt16BE();
        this.this_class = stream.readUInt16BE();
        this.super_class = stream.readUInt16BE();

        for (var n = 0, count = stream.readUInt16BE(); n < count; n++)
            this.interfaces.push(stream.readUInt16BE());
        for (var n = 0, count = stream.readUInt16BE(); n < count; n++)
            this.fields.push(this.readFieldInfo(stream));
        for (var n = 0, count = stream.readUInt16BE(); n < count; n++)
            this.methods.push(new JavaMethod(this.constantPool, this.readMethodInfo(stream)));
        for (var n = 0, count = stream.readUInt16BE(); n < count; n++)
            this.attributes.push(this.readAttributeInfo(stream));
    };

    JavaClass.prototype.getMethod = function (name, type) {
        if (typeof type === "undefined") { type = null; }
        for (var n = 0; n < this.methods.length; n++) {
            var method = this.methods[n];
            if (method.name != name)
                continue;
            if (type && method.methodTypeStr != type)
                continue;
            return method.prepare();
        }
        return null;
    };

    JavaClass.prototype._readMemberInfo = function (stream) {
        var access_flags = stream.readUInt16BE(), name_index = stream.readUInt16BE(), descriptor_index = stream.readUInt16BE();
        var attributes = [];
        for (var n = 0, count = stream.readUInt16BE(); n < count; n++)
            attributes.push(this.readAttributeInfo(stream));
        return new JavaMemberInfo(access_flags, name_index, descriptor_index, attributes);
    };

    JavaClass.prototype.readMethodInfo = function (stream) {
        return this._readMemberInfo(stream);
    };
    JavaClass.prototype.readFieldInfo = function (stream) {
        return this._readMemberInfo(stream);
    };
    JavaClass.prototype.readAttributeInfo = function (stream) {
        return new JavaAttributeInfo(stream.readUInt16BE(), stream.readBytes(stream.readUInt32BE()));
    };
    JavaClass.majorVersionMap = { 45: 'JDK 1.1', 46: 'JDK 1.2', 47: 'JDK 1.3', 48: 'JDK 1.4', 49: 'J2SE 5.0', 50: 'J2SE 6.0', 51: 'J2SE 7', 52: 'J2SE 8' };
    return JavaClass;
})();
exports.JavaClass = JavaClass;

var JavaMethod = (function () {
    function JavaMethod(pool, info) {
        var _this = this;
        this.pool = pool;
        this.info = info;
        this.name = pool.getString(info.name_index);
        this.methodTypeStr = pool.getString(info.descriptor_index);
        this.methodType = types.demangleMethod(this.methodTypeStr);

        this.info.attributes.forEach(function (attribute) {
            var attribute_name = _this.pool.getString(attribute.index);
            if (attribute_name == 'Code') {
                _this.bodydata = attribute.data;
            }
        });
    }
    JavaMethod.prototype.prepare = function () {
        if (!this.func)
            this._createFunction();
        return this;
    };

    JavaMethod.prototype._createFunction = function () {
        //console.log('Code!');
        var stream = new Stream(this.bodydata);
        var maxStack = stream.readInt16BE();
        var maxLocals = stream.readInt16BE();
        var codeLength = stream.readInt32BE();
        var codeStream = new Stream(stream.readBytes(codeLength));

        //console.log('max_stack_locals', max_stack, max_locals);
        var instructions = dynarec.readInstructions(this.pool, codeStream);
        var info = dynarec.getFunctionCode(this.pool, this.name, this.methodType, maxStack, maxLocals, ((this.info.access_flags & 8 /* STATIC */) != 0), instructions);
        this.func = info.func;
        this.body = info.body;
    };
    return JavaMethod;
})();
exports.JavaMethod = JavaMethod;
//# sourceMappingURL=javaclass.js.map
