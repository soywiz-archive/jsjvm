var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var opcodes = require('./opcodes');
var utils = require('./utils');
var types = require('./types');
var Stream = utils.Stream;
exports.Stream = Stream;

require('./runtime');

var Opcode = opcodes.Opcode;

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
(function (CONSTANT) {
    CONSTANT[CONSTANT["Utf8"] = 1] = "Utf8";
    CONSTANT[CONSTANT["Integer"] = 3] = "Integer";
    CONSTANT[CONSTANT["Float"] = 4] = "Float";
    CONSTANT[CONSTANT["Long"] = 5] = "Long";
    CONSTANT[CONSTANT["Double"] = 6] = "Double";
    CONSTANT[CONSTANT["Class"] = 7] = "Class";
    CONSTANT[CONSTANT["String"] = 8] = "String";
    CONSTANT[CONSTANT["Fieldref"] = 9] = "Fieldref";
    CONSTANT[CONSTANT["Methodref"] = 10] = "Methodref";
    CONSTANT[CONSTANT["InterfaceMethodref"] = 11] = "InterfaceMethodref";
    CONSTANT[CONSTANT["NameAndType"] = 12] = "NameAndType";
})(exports.CONSTANT || (exports.CONSTANT = {}));
var CONSTANT = exports.CONSTANT;

var ConstantPool = (function () {
    function ConstantPool() {
        this.items = [];
    }
    ConstantPool.prototype.get = function (index) {
        return this.items[index];
    };
    ConstantPool.prototype.getValue = function (index) {
        return this.items[index].value;
    };
    ConstantPool.prototype.getString = function (index) {
        return this.get(index).string;
    };
    ConstantPool.prototype.getClassName = function (index) {
        return this.getString(this.get(index).indexName);
    };

    ConstantPool.prototype.getMethodName = function (index) {
        var mr = this.getMethodReference(index);
        var className = this.getString(this.get(mr.indexClassReference).indexName);
        var methodName = this.getString(this.get(mr.indexNameType).indexName);
        var typeName = this.getString(this.get(mr.indexNameType).indexType);
        return className + '.' + methodName + typeName;
    };

    ConstantPool.prototype.getType = function (index) {
        return this.items[index].constructor;
    };
    ConstantPool.prototype.getFieldReference = function (index) {
        return this.get(index);
    };
    ConstantPool.prototype.getMethodReference = function (index) {
        return this.get(index);
    };
    ConstantPool.prototype.getMethodType = function (index) {
        return this.getMethodReference(index).type(this);
    };
    ConstantPool.prototype.dump = function () {
        this.items.forEach(function (item, index) {
            console.log(index, item.constructor, item);
        });
    };
    return ConstantPool;
})();
exports.ConstantPool = ConstantPool;

var JavaConstantUtf8 = (function () {
    function JavaConstantUtf8(pool, data) {
        this.string = "";
        this.string = data.toString('utf-8');
    }
    return JavaConstantUtf8;
})();
exports.JavaConstantUtf8 = JavaConstantUtf8;
var JavaConstantInt = (function () {
    function JavaConstantInt(pool, value) {
        this.value = value;
    }
    return JavaConstantInt;
})();
exports.JavaConstantInt = JavaConstantInt;
var JavaConstantLong = (function () {
    function JavaConstantLong(pool, low, high) {
        this.low = low;
        this.high = high;
    }
    return JavaConstantLong;
})();
exports.JavaConstantLong = JavaConstantLong;
var JavaConstantDouble = (function () {
    function JavaConstantDouble(pool, value) {
        this.value = value;
    }
    return JavaConstantDouble;
})();
exports.JavaConstantDouble = JavaConstantDouble;
var JavaConstantClassReference = (function () {
    function JavaConstantClassReference(pool, indexName) {
        this.indexName = indexName;
    }
    JavaConstantClassReference.prototype.name = function (pool) {
        return pool.getString(this.indexName);
    };
    return JavaConstantClassReference;
})();
exports.JavaConstantClassReference = JavaConstantClassReference;
var JavaConstantStringReference = (function () {
    function JavaConstantStringReference(pool, index) {
        this.index = index;
    }
    return JavaConstantStringReference;
})();
exports.JavaConstantStringReference = JavaConstantStringReference;

var JavaConstantFieldMethodReference = (function () {
    function JavaConstantFieldMethodReference(pool, indexClassReference, indexNameType) {
        this.indexClassReference = indexClassReference;
        this.indexNameType = indexNameType;
    }
    JavaConstantFieldMethodReference.prototype.classReference = function (pool) {
        return pool.get(this.indexClassReference);
    };
    JavaConstantFieldMethodReference.prototype.className = function (pool) {
        return pool.getString(this.classReference(pool).indexName);
    };
    JavaConstantFieldMethodReference.prototype.nameTypeDescriptor = function (pool) {
        return pool.get(this.indexNameType);
    };
    JavaConstantFieldMethodReference.prototype.name = function (pool) {
        return this.nameTypeDescriptor(pool).name(pool);
    };
    JavaConstantFieldMethodReference.prototype.type = function (pool) {
        return this.nameTypeDescriptor(pool).type(pool);
    };
    return JavaConstantFieldMethodReference;
})();
exports.JavaConstantFieldMethodReference = JavaConstantFieldMethodReference;

var JavaConstantFieldReference = (function (_super) {
    __extends(JavaConstantFieldReference, _super);
    function JavaConstantFieldReference(pool, indexClassReference, indexNameType) {
        _super.call(this, pool, indexClassReference, indexNameType);
        this.indexClassReference = indexClassReference;
        this.indexNameType = indexNameType;
    }
    return JavaConstantFieldReference;
})(JavaConstantFieldMethodReference);
exports.JavaConstantFieldReference = JavaConstantFieldReference;
var JavaConstantMethodReference = (function (_super) {
    __extends(JavaConstantMethodReference, _super);
    function JavaConstantMethodReference(pool, indexClassReference, indexNameType) {
        _super.call(this, pool, indexClassReference, indexNameType);
        this.indexClassReference = indexClassReference;
        this.indexNameType = indexNameType;
    }
    return JavaConstantMethodReference;
})(JavaConstantFieldMethodReference);
exports.JavaConstantMethodReference = JavaConstantMethodReference;
var JavaConstantInterfaceMethodReference = (function () {
    function JavaConstantInterfaceMethodReference(pool, index1, index2) {
        this.index1 = index1;
        this.index2 = index2;
    }
    return JavaConstantInterfaceMethodReference;
})();
exports.JavaConstantInterfaceMethodReference = JavaConstantInterfaceMethodReference;
var JavaConstantNameTypeDescriptor = (function () {
    function JavaConstantNameTypeDescriptor(pool, indexName, indexType) {
        this.indexName = indexName;
        this.indexType = indexType;
    }
    JavaConstantNameTypeDescriptor.prototype.name = function (pool) {
        return pool.getString(this.indexName);
    };
    JavaConstantNameTypeDescriptor.prototype.type = function (pool) {
        return pool.getString(this.indexType);
    };
    return JavaConstantNameTypeDescriptor;
})();
exports.JavaConstantNameTypeDescriptor = JavaConstantNameTypeDescriptor;

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

var Instruction = (function () {
    function Instruction(offset, op, stackOffset, param, param2) {
        if (typeof param2 === "undefined") { param2 = null; }
        this.offset = offset;
        this.op = op;
        this.stackOffset = stackOffset;
        this.param = param;
        this.param2 = param2;
        this.name = Opcode[op];
    }
    return Instruction;
})();
exports.Instruction = Instruction;

var InstructionReader = (function () {
    function InstructionReader() {
    }
    InstructionReader.read = function (pool, code) {
        var offset = code.position;
        var op = code.readUInt8();
        var stackOffset = 0;
        switch (op) {
            case 170 /* tableswitch */:
                throw (new Error("Not implemented tableswitch"));
            case 171 /* lookupswitch */:
                throw (new Error("Not implemented lookupswitch"));
            case 16 /* bipush */:
                return new Instruction(offset, op, stackOffset, code.readUInt8());
            case 17 /* sipush */:
                return new Instruction(offset, op, stackOffset, code.readUInt16BE());
            case 18 /* ldc */:
                return new Instruction(offset, op, stackOffset, code.readUInt8());
            case 132 /* iinc */:
                return new Instruction(offset, op, stackOffset, code.readUInt8(), code.readInt8());
            case 188 /* newarray */:
                throw (new Error("Not implemented newarray"));
            case 196 /* wide */:
                throw (new Error("Not implemented wide"));
            case 197 /* multianewarray */:
                throw (new Error("Not implemented multianewarray"));
            case 185 /* invokeinterface */:
                throw (new Error("Not implemented invokeinterface"));
            case 186 /* invokedynamic */:
                throw (new Error("Not implemented invokedynamic"));
            case 200 /* goto_w */:
            case 201 /* jsr_w */:
                throw (new Error("Not implemented branchbyte1_4_body"));

            case 21 /* iload */:
            case 22 /* lload */:
            case 23 /* fload */:
            case 24 /* dload */:
            case 25 /* aload */:
            case 54 /* istore */:
            case 55 /* lstore */:
            case 56 /* fstore */:
            case 57 /* dstore */:
            case 58 /* astore */:
            case 169 /* ret */:
                return new Instruction(offset, op, stackOffset, code.readUInt8());

            case 19 /* ldc_w */:
            case 20 /* ldc2_w */:
            case 178 /* getstatic */:
            case 179 /* putstatic */:
            case 180 /* getfield */:
            case 181 /* putfield */:
            case 187 /* new */:
            case 182 /* invokevirtual */:
            case 183 /* invokespecial */:
            case 184 /* invokestatic */:
            case 189 /* anewarray */:
            case 192 /* checkcast */:
            case 193 /* instanceof */:
                return new Instruction(offset, op, stackOffset, code.readUInt16BE());

            case 153 /* ifeq */:
            case 154 /* ifne */:
            case 155 /* iflt */:
            case 156 /* ifge */:
            case 157 /* ifgt */:
            case 158 /* ifle */:
            case 159 /* if_icmpeq */:
            case 160 /* if_icmpne */:
            case 161 /* if_icmplt */:
            case 162 /* if_icmpge */:
            case 163 /* if_icmpgt */:
            case 164 /* if_icmple */:
            case 165 /* if_acmpeq */:
            case 166 /* if_acmpne */:
            case 167 /* goto */:
            case 168 /* jsr */:
            case 198 /* ifnull */:
            case 199 /* ifnonnull */:
                return new Instruction(offset, op, stackOffset, offset + code.readInt16BE());

            default:
                return new Instruction(offset, op, stackOffset, null);
        }
    };
    return InstructionReader;
})();
exports.InstructionReader = InstructionReader;

var JavaMethod = (function () {
    function JavaMethod(pool, info) {
        this.pool = pool;
        this.info = info;
        this.name = pool.getString(info.name_index);
        this.methodTypeStr = pool.getString(info.descriptor_index);
        this.parse();
    }
    JavaMethod.prototype.parse = function () {
        var _this = this;
        var methodType = types.demangleMethod(this.methodTypeStr);

        //console.log('JavaMethod.parse() -> ', this.name, this.methodTypeStr, methodType.mangled);
        this.info.attributes.forEach(function (attribute) {
            var attribute_name = _this.pool.getString(attribute.index);

            //console.log('attribute:', attribute_name);
            if (attribute_name == 'Code') {
                //console.log('Code!');
                var attr2 = new exports.Stream(attribute.data);
                var max_stack = attr2.readInt16BE();
                var max_locals = attr2.readInt16BE();
                var code_length = attr2.readInt32BE();
                var code = new exports.Stream(attr2.readBytes(code_length));

                //console.log('max_stack_locals', max_stack, max_locals);
                var instructions = [];
                while (!code.eof) {
                    instructions.push(InstructionReader.read(_this.pool, code));
                }

                var info = Dynarec.getFunctionCode(_this.pool, _this.name, methodType, max_stack, max_locals, ((_this.info.access_flags & 8 /* STATIC */) != 0), instructions);
                _this.func = info.func;
                _this.body = info.body;
            }
        });
    };
    return JavaMethod;
})();
exports.JavaMethod = JavaMethod;

var Node = (function () {
    function Node() {
    }
    Node.prototype.toString = function () {
        return '';
    };
    return Node;
})();
var NodeRef = (function (_super) {
    __extends(NodeRef, _super);
    function NodeRef(name) {
        _super.call(this);
        this.name = name;
    }
    NodeRef.prototype.toString = function () {
        return this.name;
    };
    return NodeRef;
})(Node);
var NodeRaw = (function (_super) {
    __extends(NodeRaw, _super);
    function NodeRaw(name) {
        _super.call(this);
        this.name = name;
    }
    NodeRaw.prototype.toString = function () {
        return this.name;
    };
    return NodeRaw;
})(Node);
var NodeValue = (function (_super) {
    __extends(NodeValue, _super);
    function NodeValue(value) {
        _super.call(this);
        this.value = value;
    }
    NodeValue.prototype.toString = function () {
        return String(this.value);
    };
    return NodeValue;
})(Node);
var NodeArrayAccess = (function (_super) {
    __extends(NodeArrayAccess, _super);
    function NodeArrayAccess(array, index) {
        _super.call(this);
        this.array = array;
        this.index = index;
    }
    NodeArrayAccess.prototype.toString = function () {
        return this.array.toString() + '[' + this.index.toString() + ']';
    };
    return NodeArrayAccess;
})(Node);

var NodeCast = (function (_super) {
    __extends(NodeCast, _super);
    function NodeCast(type, node) {
        _super.call(this);
        this.type = type;
        this.node = node;
    }
    NodeCast.prototype.toString = function () {
        return 'Convert.Cast' + this.type.mangled + '(' + this.node.toString() + '|0' + ')';
    };
    return NodeCast;
})(Node);

var NodeBinop = (function (_super) {
    __extends(NodeBinop, _super);
    function NodeBinop(type, left, op, right) {
        _super.call(this);
        this.type = type;
        this.left = left;
        this.op = op;
        this.right = right;
    }
    NodeBinop.prototype.toString = function () {
        return '(' + this.left.toString() + ' ' + this.op + ' ' + this.right.toString() + ')';
    };
    return NodeBinop;
})(Node);

var NodeUnop = (function (_super) {
    __extends(NodeUnop, _super);
    function NodeUnop(type, left, l, r) {
        _super.call(this);
        this.type = type;
        this.left = left;
        this.l = l;
        this.r = r;
    }
    NodeUnop.prototype.toString = function () {
        return '(' + this.l + this.left.toString() + this.r + ')';
    };
    return NodeUnop;
})(Node);

var NodeCall = (function (_super) {
    __extends(NodeCall, _super);
    function NodeCall(methodName, args) {
        _super.call(this);
        this.methodName = methodName;
        this.args = args;
    }
    NodeCall.prototype.toString = function () {
        return this.methodName + '(' + this.args.map(function (arg) {
            return arg.toString();
        }).join(', ') + ')';
    };
    return NodeCall;
})(Node);

var Dynarec = (function () {
    function Dynarec() {
    }
    Dynarec.getFunctionCode = function (pool, methodName, methodType, max_stack, max_locals, is_static, instructions) {
        var dynarec = new Dynarec1(pool, methodName, methodType, max_stack, max_locals, is_static);
        dynarec.process(instructions);
        var func;

        try  {
            func = Function.apply(null, utils.range(methodType.arguments.length).map(function (index) {
                return 'arg' + index;
            }).concat([dynarec.body]));
        } catch (e) {
            console.info(dynarec.body);
            console.error(e);
            func = null;
        }
        return { func: func, body: dynarec.body };
    };
    return Dynarec;
})();

var InvokeType;
(function (InvokeType) {
    InvokeType[InvokeType["special"] = 0] = "special";
    InvokeType[InvokeType["static"] = 1] = "static";
    InvokeType[InvokeType["virtual"] = 2] = "virtual";
})(InvokeType || (InvokeType = {}));

var LocalReference = (function () {
    function LocalReference(index) {
        this.index = index;
    }
    return LocalReference;
})();

var DynarecProcessor = (function () {
    function DynarecProcessor() {
    }
    DynarecProcessor.processOne = function (processor, pool, i) {
        var op = i.op, param = i.param, param2 = i.param2;

        switch (op) {
            case 42 /* aload_0 */:
            case 43 /* aload_1 */:
            case 44 /* aload_2 */:
            case 45 /* aload_3 */:
                return processor._load(new types.Ref, op - 42 /* aload_0 */);
            case 26 /* iload_0 */:
            case 27 /* iload_1 */:
            case 28 /* iload_2 */:
            case 29 /* iload_3 */:
                return processor._load(new types.Integer, op - 26 /* iload_0 */);
            case 30 /* lload_0 */:
            case 31 /* lload_1 */:
            case 32 /* lload_2 */:
            case 33 /* lload_3 */:
                return processor._load(new types.Long, op - 30 /* lload_0 */);
            case 34 /* fload_0 */:
            case 35 /* fload_1 */:
            case 36 /* fload_2 */:
            case 37 /* fload_3 */:
                return processor._load(new types.Float, op - 34 /* fload_0 */);
            case 38 /* dload_0 */:
            case 39 /* dload_1 */:
            case 40 /* dload_2 */:
            case 41 /* dload_3 */:
                return processor._load(new types.Double, op - 38 /* dload_0 */);

            case 25 /* aload */:
                return processor._load(new types.Ref, param);
            case 21 /* iload */:
                return processor._load(new types.Integer, param);
            case 22 /* lload */:
                return processor._load(new types.Long, param);
            case 23 /* fload */:
                return processor._load(new types.Float, param);
            case 24 /* dload */:
                return processor._load(new types.Double, param);

            case 50 /* aaload */:
                return processor.aaload();
            case 83 /* aastore */:
                return processor.aastore();

            case 75 /* astore_0 */:
            case 76 /* astore_1 */:
            case 77 /* astore_2 */:
            case 78 /* astore_3 */:
                return processor._store(new types.Ref, op - 75 /* astore_0 */);
            case 59 /* istore_0 */:
            case 60 /* istore_1 */:
            case 61 /* istore_2 */:
            case 62 /* istore_3 */:
                return processor._store(new types.Integer, op - 59 /* istore_0 */);
            case 63 /* lstore_0 */:
            case 64 /* lstore_1 */:
            case 65 /* lstore_2 */:
            case 66 /* lstore_3 */:
                return processor._store(new types.Long, op - 63 /* lstore_0 */);
            case 67 /* fstore_0 */:
            case 68 /* fstore_1 */:
            case 69 /* fstore_2 */:
            case 70 /* fstore_3 */:
                return processor._store(new types.Float, op - 67 /* fstore_0 */);
            case 71 /* dstore_0 */:
            case 72 /* dstore_1 */:
            case 73 /* dstore_2 */:
            case 74 /* dstore_3 */:
                return processor._store(new types.Double, op - 71 /* dstore_0 */);

            case 58 /* astore */:
                return processor._store(new types.Ref, param);
            case 54 /* istore */:
                return processor._store(new types.Integer, param);
            case 55 /* lstore */:
                return processor._store(new types.Long, param);
            case 56 /* fstore */:
                return processor._store(new types.Float, param);
            case 57 /* dstore */:
                return processor._store(new types.Double, param);

            case 2 /* iconst_m1 */:
            case 3 /* iconst_0 */:
            case 4 /* iconst_1 */:
            case 5 /* iconst_2 */:
            case 6 /* iconst_3 */:
            case 7 /* iconst_4 */:
            case 8 /* iconst_5 */:
                return processor._const(new types.Integer, op - 3 /* iconst_0 */);
            case 9 /* lconst_0 */:
            case 10 /* lconst_1 */:
                return processor._const(new types.Long, op - 3 /* iconst_0 */);
            case 17 /* sipush */:
                return processor._const(new types.Short, param);
            case 16 /* bipush */:
                return processor._const(new types.Byte, param);

            case 20 /* ldc2_w */:
                return processor.ldc(param, true);
            case 18 /* ldc */:
                return processor.ldc(param, false);

            case 183 /* invokespecial */:
                return processor.invoke(0 /* special */, pool.getMethodReference(param));
            case 184 /* invokestatic */:
                return processor.invoke(1 /* static */, pool.getMethodReference(param));
            case 182 /* invokevirtual */:
                return processor.invoke(2 /* virtual */, pool.getMethodReference(param));
            case 178 /* getstatic */:
                return processor.getstatic(pool.get(param));

            case 177 /* Return */:
                return processor._return(new types.Void);
            case 172 /* ireturn */:
                return processor._return(new types.Integer);
            case 174 /* freturn */:
                return processor._return(new types.Float);
            case 175 /* dreturn */:
                return processor._return(new types.Double);
            case 173 /* lreturn */:
                return processor._return(new types.Long);

            case 132 /* iinc */:
                return processor.iinc(param, param2);

            case 96 /* iadd */:
                return processor._binop(new types.Integer, '+');
            case 100 /* isub */:
                return processor._binop(new types.Integer, '-');
            case 126 /* iand */:
                return processor._binop(new types.Integer, '&');
            case 120 /* ishl */:
                return processor._binop(new types.Integer, '<<');
            case 122 /* ishr */:
                return processor._binop(new types.Integer, '>>');
            case 124 /* iushr */:
                return processor._binop(new types.Integer, '>>>');

            case 97 /* ladd */:
                return processor._binop(new types.Long, '+');
            case 101 /* lsub */:
                return processor._binop(new types.Long, '+');
            case 127 /* land */:
                return processor._binop(new types.Long, '&');
            case 121 /* lshl */:
                return processor._binop(new types.Long, '<<');
            case 123 /* lshr */:
                return processor._binop(new types.Long, '>>');
            case 125 /* lushr */:
                return processor._binop(new types.Long, '>>>');

            case 51 /* baload */:
                return processor.baload();
            case 84 /* bastore */:
                return processor.bastore();

            case 190 /* arraylength */:
                return processor.arraylength();
            case 187 /* new */:
                return processor._new(pool.get(param));

            case 89 /* dup */:
                return processor.dup();

            case 145 /* i2b */:
                return processor.convert(new types.Integer, new types.Byte);
            case 146 /* i2c */:
                return processor.convert(new types.Integer, new types.Character);
            case 135 /* i2d */:
                return processor.convert(new types.Integer, new types.Double);
            case 134 /* i2f */:
                return processor.convert(new types.Integer, new types.Float);
            case 133 /* i2l */:
                return processor.convert(new types.Integer, new types.Long);
            case 147 /* i2s */:
                return processor.convert(new types.Integer, new types.Short);
            case 138 /* l2d */:
                return processor.convert(new types.Long, new types.Double);
            case 137 /* l2f */:
                return processor.convert(new types.Long, new types.Float);
            case 136 /* l2i */:
                return processor.convert(new types.Long, new types.Integer);

            case 153 /* ifeq */:
                return processor.ifcond('==', param);
            case 154 /* ifne */:
                return processor.ifcond('!=', param);
            case 156 /* ifge */:
                return processor.ifcond('>=', param);
            case 157 /* ifgt */:
                return processor.ifcond('>', param);
            case 158 /* ifle */:
                return processor.ifcond('<=', param);
            case 155 /* iflt */:
                return processor.ifcond('<', param);

            case 159 /* if_icmpeq */:
                return processor.ifcond2('==', param);
            case 160 /* if_icmpne */:
                return processor.ifcond2('!=', param);
            case 162 /* if_icmpge */:
                return processor.ifcond2('>=', param);
            case 163 /* if_icmpgt */:
                return processor.ifcond2('>', param);
            case 164 /* if_icmple */:
                return processor.ifcond2('<=', param);
            case 161 /* if_icmplt */:
                return processor.ifcond2('<', param);

            case 167 /* goto */:
                return processor.goto(param);

            default:
                throw (new Error("Not implemented opcode " + i.name + '(' + i.op + ')' + "!"));
        }
    };
    return DynarecProcessor;
})();

var Dynarec0 = (function () {
    function Dynarec0(pool, methodName, methodType, max_stack, max_locals, is_static) {
        this.pool = pool;
        this.methodName = methodName;
        this.methodType = methodType;
        this.max_stack = max_stack;
        this.max_locals = max_locals;
        this.is_static = is_static;
        this.body = '"use strict"; var stack = []; var locals = []; var label = 0;\n';
    }
    Dynarec0.prototype.writeSentence = function (text) {
        this.body += text + "\n";
    };

    Dynarec0.prototype.process = function (instructions) {
        var _this = this;
        for (var n = 0; n < this.max_locals; n++) {
            this.writeSentence("locals[" + n + "] = { value: null };");
        }
        for (var n = 0; n < this.methodType.arguments.length; n++) {
            this.writeSentence("arg" + n + " = { value: arg" + n + " };");
        }
        this.writeSentence('while (true) switch (label) {');
        instructions.forEach(function (i) {
            _this.body += 'case ' + i.offset + ': ';
            _this.processOne(i);
        });
        this.writeSentence('}');
    };

    Dynarec0.prototype.processOne = function (i) {
        DynarecProcessor.processOne(this, this.pool, i);
    };

    Dynarec0.prototype.call = function (method, count) {
        this.writeSentence('stack.push(' + method + '(stack.splice(stack.length - ' + count + '))); // call');
    };

    Dynarec0.prototype.call_void = function (method, count) {
        this.writeSentence('' + method + '(stack.splice(stack.length - ' + count + ')); // call_void');
    };

    Dynarec0.prototype.getref = function (index) {
        var argLength = this.methodType.arguments.length;
        if (index < argLength) {
            return 'arg' + (index);
        } else {
            return 'locals[' + (index - argLength) + ']';
        }
    };

    Dynarec0.prototype._load = function (type, index) {
        if (type instanceof types.Ref) {
            this.writeSentence('stack.push(' + this.getref(index) + '); // aload');
        } else {
            this.writeSentence('stack.push(' + this.getref(index) + '.value); // _load');
        }
    };
    Dynarec0.prototype._return = function (type) {
        if (type instanceof types.Void) {
            this.writeSentence('return;');
        } else {
            this.writeSentence('return stack.pop(); // _return');
        }
    };

    Dynarec0.prototype.invoke = function (invokeType, methodInfo) {
        var className = methodInfo.className(this.pool);
        var name = methodInfo.name(this.pool);
        var type = methodInfo.type(this.pool);
        var demangledType = types.demangleMethod(methodInfo.type(this.pool));
        var argCount = demangledType.arguments.length;

        //if (invoketype == 'static') argCount++;
        if (demangledType.rettype instanceof types.Void) {
            this.call(name, argCount);
        } else {
            this.call_void(name, argCount);
        }
    };

    Dynarec0.prototype._store = function (type, index) {
        this.writeSentence(this.getref(index) + '.value = stack.pop(); // _store');
    };
    Dynarec0.prototype.convert = function (from, to) {
        this.writeSentence('stack.push(Convert.Convert' + from.mangled + to.mangled + '(stack.pop())); // _const');
    };
    Dynarec0.prototype._const = function (type, value) {
        this.writeSentence('stack.push(' + value + '); // _const');
    };
    Dynarec0.prototype.aaload = function () {
        this.writeSentence('var i = stack.pop(), aref = stack.pop(); stack.push(aref.value[i]); // aaload');
    };
    Dynarec0.prototype.aastore = function () {
        throw (new Error("Not implemented!"));
    };
    Dynarec0.prototype.ldc = function (index, wide) {
        this.writeSentence('stack.push(' + this.pool.getValue(index) + '); // ldc');
    };
    Dynarec0.prototype.getstatic = function (methodInfo) {
        this.writeSentence('stack.push(getstatic(' + methodInfo.name(this.pool) + ')); // getstatic');
    };
    Dynarec0.prototype._binop = function (type, op) {
        if (type instanceof types.Integer) {
            this.writeSentence('var r = stack.pop(), l = stack.pop(); stack.push(l ' + op + ' r); // ibinop(' + op + ')');
        } else {
            this.writeSentence('var r = stack.pop(), l = stack.pop(); stack.push(Long["' + op + '"](l, r)); // lbinop(' + op + ')');
        }
    };
    Dynarec0.prototype.ifcond = function (op, offset) {
        this.writeSentence('if (stack.pop() ' + op + ' 0) { label = ' + offset + '; break; } // ifcond(' + op + ')');
    };
    Dynarec0.prototype.ifcond2 = function (op, offset) {
        this.writeSentence('if (stack.pop() ' + op + ' stack.pop()) { label = ' + offset + '; break; } // ifcond2(' + op + ')');
    };
    Dynarec0.prototype.goto = function (offset) {
        this.writeSentence('{ label = ' + offset + '; break; }; // goto');
    };
    Dynarec0.prototype.iinc = function (local, increment) {
        this.writeSentence(this.getref(local) + ' = ' + this.getref(local) + ' + ' + increment + '; // iinc');
    };
    Dynarec0.prototype.baload = function () {
        this.writeSentence('var i = stack.pop(), aref = stack.pop(); stack.push(aref.value[i]); // baload');
    };
    Dynarec0.prototype.bastore = function () {
        this.writeSentence('var val = stack.pop(), i = stack.pop(), aref = stack.pop(); aref.value[i] = val; // bastore');
    };
    Dynarec0.prototype.arraylength = function () {
        this.writeSentence('stack.push(Convert.arraylength(stack.pop())); // arraylength');
    };
    Dynarec0.prototype._new = function (clazz) {
        this.writeSentence('stack.push(new ' + this.pool.getString(clazz.indexName) + '()); // new');
    };
    Dynarec0.prototype.dup = function () {
        this.writeSentence('stack.push(stack[stack.length - 1]); // dup');
    };
    return Dynarec0;
})();

var Dynarec1 = (function () {
    function Dynarec1(pool, methodName, methodType, max_stack, max_locals, is_static) {
        this.pool = pool;
        this.methodName = methodName;
        this.methodType = methodType;
        this.max_stack = max_stack;
        this.max_locals = max_locals;
        this.is_static = is_static;
        this.stack = [];
        this.body = '"use strict";\n';
    }
    Dynarec1.prototype.writeSentence = function (text) {
        this.body += text + "\n";
    };

    Dynarec1.prototype.process = function (instructions) {
        var _this = this;
        //console.log('-----------------------------', this.methodName);
        instructions.forEach(function (i) {
            _this.processOne(i);
        });

        //console.log('///////////////////////////// ', this.stack.length);
        if (this.stack.length)
            console.warn('stack length not zero at the end of the function! Probably a bug!');
    };

    Dynarec1.prototype.processOne = function (i) {
        DynarecProcessor.processOne(this, this.pool, i);
    };

    Dynarec1.prototype.getref = function (index) {
        var argLength = this.methodType.arguments.length;
        if (index < argLength) {
            return new NodeRef('arg' + (index) + '');
        } else {
            return new NodeRef('local_' + (index - argLength));
        }
    };

    Dynarec1.prototype._load = function (type, index) {
        if (type instanceof types.Ref) {
            this.stack.push(this.getref(index));
        } else {
            this.stack.push(new NodeCast(type, this.getref(index)));
        }
    };

    Dynarec1.prototype._store = function (type, index) {
        var ref = this.stack.pop();
        this.writeSentence(this.getref(index).name + ' = ' + ref.toString() + ';');
    };

    Dynarec1.prototype._return = function (type) {
        if (type instanceof types.Void) {
            this.writeSentence('return;');
        } else {
            this.writeSentence('return ' + this.stack.pop().toString() + ';');
        }
    };

    Dynarec1.prototype.convert = function (from, to) {
        this.stack.push(new NodeCall('Convert.Convert' + from.mangled + to.mangled, [this.stack.pop()]));
    };

    Dynarec1.prototype._const = function (type, value) {
        this.stack.push(new NodeValue(value));
    };

    Dynarec1.prototype.aaload = function () {
        var index = this.stack.pop();
        var arrayref = this.stack.pop();
        this.stack.push(new NodeArrayAccess(arrayref, index));
    };
    Dynarec1.prototype.aastore = function () {
        throw (new Error("Not implemented"));
    };

    Dynarec1.prototype.ldc = function (index, wide) {
        this.stack.push(new NodeValue(this.pool.getValue(index)));
    };

    Dynarec1.prototype.invoke = function (invokeType, methodInfo) {
        var className = methodInfo.className(this.pool);
        var name = methodInfo.name(this.pool);
        var type = methodInfo.type(this.pool);
        var demangledType = types.demangleMethod(methodInfo.type(this.pool));
        var argCount = demangledType.arguments.length;
        var args = [];

        for (var n = 0; n < argCount; n++) {
            args.push(this.stack.pop());
        }

        var call = new NodeCall(name, args);

        if (demangledType.rettype instanceof types.Void) {
            this.writeSentence(call.toString() + ";");
        } else {
            this.stack.push(call);
        }
    };

    Dynarec1.prototype.getstatic = function (methodInfo) {
        this.stack.push(new NodeRef(methodInfo.name(this.pool)));
    };

    Dynarec1.prototype._binop = function (type, op) {
        var right = this.stack.pop();
        var left = this.stack.pop();
        this.stack.push(new NodeBinop(type, left, op, right));
    };

    Dynarec1.prototype.ifcond = function (op, offset) {
        var a1 = this.stack.pop();

        //var a2 = this.stack.pop();
        this.writeSentence('if (' + a1.toString() + op + ' ' + 0 + ') goto ' + offset + ';');
    };

    Dynarec1.prototype.ifcond2 = function (op, offset) {
        var a2 = this.stack.pop();
        var a1 = this.stack.pop();
        this.writeSentence('if (' + a1.toString() + op + a2.toString() + ') goto ' + offset + ';');
    };

    Dynarec1.prototype.goto = function (offset) {
        this.writeSentence('goto L_' + offset + ';');
    };

    Dynarec1.prototype.iinc = function (local, increment) {
        this.writeSentence(this.getref(local).toString() + ' = ' + this.getref(local).toString() + ' + ' + increment);
    };

    Dynarec1.prototype.baload = function () {
        var index = this.stack.pop();
        var ref = this.stack.pop();
        this.stack.push(new NodeArrayAccess(ref, index));
    };

    Dynarec1.prototype.bastore = function () {
        var value = this.stack.pop();
        var index = this.stack.pop();
        var ref = this.stack.pop();
        this.writeSentence(ref.toString() + '[' + index.toString() + '] = ' + value.toString());
    };

    Dynarec1.prototype.arraylength = function () {
        this.stack.push(new NodeCall('Convert.arraylength', [this.stack.pop()]));
    };
    Dynarec1.prototype._new = function (clazz) {
        this.call('new ' + clazz.name(this.pool), 0);
    };
    Dynarec1.prototype.dup = function () {
        var node = this.stack.pop();
        this.stack.push(new NodeRaw('(var temp = ' + this.stack.push(node.toString()) + ', temp)'));
    };

    Dynarec1.prototype.call = function (method, count) {
        var args = [];
        for (var n = 0; n < count; n++)
            args.push(this.stack.pop());
        this.stack.push(new NodeCall(method, args.reverse()));
    };
    return Dynarec1;
})();

var JavaClass = (function () {
    function JavaClass() {
        this.methods = [];
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
        var contant_pool_count = stream.readUInt16BE();

        this.constantPool = new ConstantPool();
        for (var index = 1; index < contant_pool_count; index++) {
            var item = this.constantPool.items[index] = JavaClass.readConstantPoolInfo(this.constantPool, stream);
            if (item instanceof JavaConstantLong || item instanceof JavaConstantDouble)
                index++;
        }

        //this.constantPool.dump();
        var access_flags = stream.readUInt16BE();
        var this_class = stream.readUInt16BE();
        var super_class = stream.readUInt16BE();

        /*
        console.log(this_class);
        console.log(this.constantPool.getClassName(this_class));
        return;
        */
        var interfaces = [];
        var fields = [];
        var attributes = [];

        for (var n = 0, count = stream.readUInt16BE(); n < count; n++)
            interfaces.push(stream.readUInt16BE());
        for (var n = 0, count = stream.readUInt16BE(); n < count; n++)
            fields.push(this.readFieldInfo(stream));
        for (var n = 0, count = stream.readUInt16BE(); n < count; n++)
            this.methods.push(new JavaMethod(this.constantPool, this.readMethodInfo(stream)));
        for (var n = 0, count = stream.readUInt16BE(); n < count; n++)
            attributes.push(this.readAttributeInfo(stream));
        //console.log(magic);
        //console.log(minor_version);
        //console.log(major_version, JavaClass.majorVersionMap[major_version]);
        //console.log(contant_pool_count);
        //console.log(interfaces);
        //console.log(fields);
        //console.log(methods);
        //console.log(attributes);
    };

    JavaClass.prototype.getMethod = function (name, type) {
        if (typeof type === "undefined") { type = ''; }
        for (var n = 0; n < this.methods.length; n++) {
            var method = this.methods[n];
            if (method.name == name)
                return method;
        }
        return null;
    };

    JavaClass.readConstantPoolInfo = function (pool, stream) {
        var offset = stream.position;
        var type = stream.readUInt8();

        switch (type) {
            case 1 /* Utf8 */:
                return new JavaConstantUtf8(pool, stream.readBytes(stream.readUInt16BE()));
            case 3 /* Integer */:
                return new JavaConstantInt(pool, stream.readInt32BE());
            case 4 /* Float */:
                throw (new Error("CONSTANT.Float"));
            case 5 /* Long */:
                return new JavaConstantLong(pool, stream.readInt32BE(), stream.readInt32BE());
            case 6 /* Double */:
                throw (new Error("CONSTANT.Double"));
            case 7 /* Class */:
                return new JavaConstantClassReference(pool, stream.readUInt16BE());
            case 8 /* String */:
                return new JavaConstantStringReference(pool, stream.readUInt16BE());
            case 9 /* Fieldref */:
                return new JavaConstantFieldReference(pool, stream.readUInt16BE(), stream.readUInt16BE());
            case 10 /* Methodref */:
                return new JavaConstantMethodReference(pool, stream.readUInt16BE(), stream.readUInt16BE());
            case 11 /* InterfaceMethodref */:
                return new JavaConstantInterfaceMethodReference(pool, stream.readUInt16BE(), stream.readUInt16BE());
            case 12 /* NameAndType */:
                return new JavaConstantNameTypeDescriptor(pool, stream.readUInt16BE(), stream.readUInt16BE());
        }

        throw (new Error("Unknown type of constant pool info " + type + " at " + 'className' + ":" + offset + ":"));
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
//# sourceMappingURL=jsjvm.js.map
