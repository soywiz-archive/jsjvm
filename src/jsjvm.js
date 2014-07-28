var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
function range(count) {
    return Array.apply(null, { length: count }).map(Number.call, Number);
}

var Stream = (function () {
    function Stream(buffer) {
        this.buffer = buffer;
        this.position = 0;
    }
    Object.defineProperty(Stream.prototype, "length", {
        get: function () {
            return this.buffer.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Stream.prototype, "available", {
        get: function () {
            return this.buffer.length - this.position;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Stream.prototype, "eof", {
        get: function () {
            return this.available <= 0;
        },
        enumerable: true,
        configurable: true
    });
    Stream.prototype._move = function (value, offset) {
        this.position += offset;
        return value;
    };
    Stream.prototype.readUInt32BE = function () {
        return this._move(this.buffer.readUInt32BE(this.position), 4);
    };
    Stream.prototype.readUInt16BE = function () {
        return this._move(this.buffer.readUInt16BE(this.position), 2);
    };
    Stream.prototype.readInt32BE = function () {
        return this._move(this.buffer.readInt32BE(this.position), 4);
    };
    Stream.prototype.readInt16BE = function () {
        return this._move(this.buffer.readInt16BE(this.position), 2);
    };
    Stream.prototype.readInt8 = function () {
        return this._move(this.buffer.readInt8(this.position), 1);
    };
    Stream.prototype.readUInt8 = function () {
        return this._move(this.buffer.readUInt8(this.position), 1);
    };
    Stream.prototype.readBytes = function (count) {
        return this._move(this.buffer.slice(this.position, this.position + count), count);
    };
    return Stream;
})();
exports.Stream = Stream;

var Convert = (function () {
    function Convert() {
    }
    Convert.CastI = function (value) {
        return value | 0;
    };
    Convert.ConvertIC = function (value) {
        return (value & 0xFFFF) >>> 0;
    };
    return Convert;
})();
exports.Convert = Convert;

global['Convert'] = Convert;

// http://en.wikipedia.org/wiki/Java_bytecode_instruction_listings
(function (Opcode) {
    Opcode[Opcode["nop"] = 0x00] = "nop";
    Opcode[Opcode["aconst_null"] = 0x01] = "aconst_null";
    Opcode[Opcode["iconst_m1"] = 0x02] = "iconst_m1";
    Opcode[Opcode["iconst_0"] = 0x03] = "iconst_0";
    Opcode[Opcode["iconst_1"] = 0x04] = "iconst_1";
    Opcode[Opcode["iconst_2"] = 0x05] = "iconst_2";
    Opcode[Opcode["iconst_3"] = 0x06] = "iconst_3";
    Opcode[Opcode["iconst_4"] = 0x07] = "iconst_4";
    Opcode[Opcode["iconst_5"] = 0x08] = "iconst_5";
    Opcode[Opcode["lconst_0"] = 0x09] = "lconst_0";
    Opcode[Opcode["lconst_1"] = 0x0a] = "lconst_1";
    Opcode[Opcode["fconst_0"] = 0x0b] = "fconst_0";
    Opcode[Opcode["fconst_1"] = 0x0c] = "fconst_1";
    Opcode[Opcode["fconst_2"] = 0x0d] = "fconst_2";
    Opcode[Opcode["dconst_0"] = 0x0e] = "dconst_0";
    Opcode[Opcode["dconst_1"] = 0x0f] = "dconst_1";
    Opcode[Opcode["bipush"] = 0x10] = "bipush";
    Opcode[Opcode["sipush"] = 0x11] = "sipush";
    Opcode[Opcode["ldc"] = 0x12] = "ldc";
    Opcode[Opcode["ldc_w"] = 0x13] = "ldc_w";
    Opcode[Opcode["ldc2_w"] = 0x14] = "ldc2_w";
    Opcode[Opcode["iload"] = 0x15] = "iload";
    Opcode[Opcode["lload"] = 0x16] = "lload";
    Opcode[Opcode["fload"] = 0x17] = "fload";
    Opcode[Opcode["dload"] = 0x18] = "dload";
    Opcode[Opcode["aload"] = 0x19] = "aload";
    Opcode[Opcode["iload_0"] = 0x1a] = "iload_0";
    Opcode[Opcode["iload_1"] = 0x1b] = "iload_1";
    Opcode[Opcode["iload_2"] = 0x1c] = "iload_2";
    Opcode[Opcode["iload_3"] = 0x1d] = "iload_3";
    Opcode[Opcode["lload_0"] = 0x1e] = "lload_0";
    Opcode[Opcode["lload_1"] = 0x1f] = "lload_1";
    Opcode[Opcode["lload_2"] = 0x20] = "lload_2";
    Opcode[Opcode["lload_3"] = 0x21] = "lload_3";
    Opcode[Opcode["fload_0"] = 0x22] = "fload_0";
    Opcode[Opcode["fload_1"] = 0x23] = "fload_1";
    Opcode[Opcode["fload_2"] = 0x24] = "fload_2";
    Opcode[Opcode["fload_3"] = 0x25] = "fload_3";
    Opcode[Opcode["dload_0"] = 0x26] = "dload_0";
    Opcode[Opcode["dload_1"] = 0x27] = "dload_1";
    Opcode[Opcode["dload_2"] = 0x28] = "dload_2";
    Opcode[Opcode["dload_3"] = 0x29] = "dload_3";
    Opcode[Opcode["aload_0"] = 0x2a] = "aload_0";
    Opcode[Opcode["aload_1"] = 0x2b] = "aload_1";
    Opcode[Opcode["aload_2"] = 0x2c] = "aload_2";
    Opcode[Opcode["aload_3"] = 0x2d] = "aload_3";
    Opcode[Opcode["iaload"] = 0x2e] = "iaload";
    Opcode[Opcode["laload"] = 0x2f] = "laload";
    Opcode[Opcode["faload"] = 0x30] = "faload";
    Opcode[Opcode["daload"] = 0x31] = "daload";
    Opcode[Opcode["aaload"] = 0x32] = "aaload";
    Opcode[Opcode["baload"] = 0x33] = "baload";
    Opcode[Opcode["caload"] = 0x34] = "caload";
    Opcode[Opcode["saload"] = 0x35] = "saload";
    Opcode[Opcode["istore"] = 0x36] = "istore";
    Opcode[Opcode["lstore"] = 0x37] = "lstore";
    Opcode[Opcode["fstore"] = 0x38] = "fstore";
    Opcode[Opcode["dstore"] = 0x39] = "dstore";
    Opcode[Opcode["astore"] = 0x3a] = "astore";
    Opcode[Opcode["istore_0"] = 0x3b] = "istore_0";
    Opcode[Opcode["istore_1"] = 0x3c] = "istore_1";
    Opcode[Opcode["istore_2"] = 0x3d] = "istore_2";
    Opcode[Opcode["istore_3"] = 0x3e] = "istore_3";
    Opcode[Opcode["lstore_0"] = 0x3f] = "lstore_0";
    Opcode[Opcode["lstore_1"] = 0x40] = "lstore_1";
    Opcode[Opcode["lstore_2"] = 0x41] = "lstore_2";
    Opcode[Opcode["lstore_3"] = 0x42] = "lstore_3";
    Opcode[Opcode["fstore_0"] = 0x43] = "fstore_0";
    Opcode[Opcode["fstore_1"] = 0x44] = "fstore_1";
    Opcode[Opcode["fstore_2"] = 0x45] = "fstore_2";
    Opcode[Opcode["fstore_3"] = 0x46] = "fstore_3";
    Opcode[Opcode["dstore_0"] = 0x47] = "dstore_0";
    Opcode[Opcode["dstore_1"] = 0x48] = "dstore_1";
    Opcode[Opcode["dstore_2"] = 0x49] = "dstore_2";
    Opcode[Opcode["dstore_3"] = 0x4a] = "dstore_3";
    Opcode[Opcode["astore_0"] = 0x4b] = "astore_0";
    Opcode[Opcode["astore_1"] = 0x4c] = "astore_1";
    Opcode[Opcode["astore_2"] = 0x4d] = "astore_2";
    Opcode[Opcode["astore_3"] = 0x4e] = "astore_3";
    Opcode[Opcode["iastore"] = 0x4f] = "iastore";
    Opcode[Opcode["lastore"] = 0x50] = "lastore";
    Opcode[Opcode["fastore"] = 0x51] = "fastore";
    Opcode[Opcode["dastore"] = 0x52] = "dastore";
    Opcode[Opcode["aastore"] = 0x53] = "aastore";
    Opcode[Opcode["bastore"] = 0x54] = "bastore";
    Opcode[Opcode["castore"] = 0x55] = "castore";
    Opcode[Opcode["sastore"] = 0x56] = "sastore";
    Opcode[Opcode["pop"] = 0x57] = "pop";
    Opcode[Opcode["pop2"] = 0x58] = "pop2";
    Opcode[Opcode["dup"] = 0x59] = "dup";
    Opcode[Opcode["dup_x1"] = 0x5a] = "dup_x1";
    Opcode[Opcode["dup_x2"] = 0x5b] = "dup_x2";
    Opcode[Opcode["dup2"] = 0x5c] = "dup2";
    Opcode[Opcode["dup2_x1"] = 0x5d] = "dup2_x1";
    Opcode[Opcode["dup2_x2"] = 0x5e] = "dup2_x2";
    Opcode[Opcode["swap"] = 0x5f] = "swap";
    Opcode[Opcode["iadd"] = 0x60] = "iadd";
    Opcode[Opcode["ladd"] = 0x61] = "ladd";
    Opcode[Opcode["fadd"] = 0x62] = "fadd";
    Opcode[Opcode["dadd"] = 0x63] = "dadd";
    Opcode[Opcode["isub"] = 0x64] = "isub";
    Opcode[Opcode["lsub"] = 0x65] = "lsub";
    Opcode[Opcode["fsub"] = 0x66] = "fsub";
    Opcode[Opcode["dsub"] = 0x67] = "dsub";
    Opcode[Opcode["imul"] = 0x68] = "imul";
    Opcode[Opcode["lmul"] = 0x69] = "lmul";
    Opcode[Opcode["fmul"] = 0x6a] = "fmul";
    Opcode[Opcode["dmul"] = 0x6b] = "dmul";
    Opcode[Opcode["idiv"] = 0x6c] = "idiv";
    Opcode[Opcode["ldiv"] = 0x6d] = "ldiv";
    Opcode[Opcode["fdiv"] = 0x6e] = "fdiv";
    Opcode[Opcode["ddiv"] = 0x6f] = "ddiv";
    Opcode[Opcode["irem"] = 0x70] = "irem";
    Opcode[Opcode["lrem"] = 0x71] = "lrem";
    Opcode[Opcode["frem"] = 0x72] = "frem";
    Opcode[Opcode["drem"] = 0x73] = "drem";
    Opcode[Opcode["ineg"] = 0x74] = "ineg";
    Opcode[Opcode["lneg"] = 0x75] = "lneg";
    Opcode[Opcode["fneg"] = 0x76] = "fneg";
    Opcode[Opcode["dneg"] = 0x77] = "dneg";
    Opcode[Opcode["ishl"] = 0x78] = "ishl";
    Opcode[Opcode["lshl"] = 0x79] = "lshl";
    Opcode[Opcode["ishr"] = 0x7a] = "ishr";
    Opcode[Opcode["lshr"] = 0x7b] = "lshr";
    Opcode[Opcode["iushr"] = 0x7c] = "iushr";
    Opcode[Opcode["lushr"] = 0x7d] = "lushr";
    Opcode[Opcode["iand"] = 0x7e] = "iand";
    Opcode[Opcode["land"] = 0x7f] = "land";
    Opcode[Opcode["ior"] = 0x80] = "ior";
    Opcode[Opcode["lor"] = 0x81] = "lor";
    Opcode[Opcode["ixor"] = 0x82] = "ixor";
    Opcode[Opcode["lxor"] = 0x83] = "lxor";
    Opcode[Opcode["iinc"] = 0x84] = "iinc";
    Opcode[Opcode["i2l"] = 0x85] = "i2l";
    Opcode[Opcode["i2f"] = 0x86] = "i2f";
    Opcode[Opcode["i2d"] = 0x87] = "i2d";
    Opcode[Opcode["l2i"] = 0x88] = "l2i";
    Opcode[Opcode["l2f"] = 0x89] = "l2f";
    Opcode[Opcode["l2d"] = 0x8a] = "l2d";
    Opcode[Opcode["f2i"] = 0x8b] = "f2i";
    Opcode[Opcode["f2l"] = 0x8c] = "f2l";
    Opcode[Opcode["f2d"] = 0x8d] = "f2d";
    Opcode[Opcode["d2i"] = 0x8e] = "d2i";
    Opcode[Opcode["d2l"] = 0x8f] = "d2l";
    Opcode[Opcode["d2f"] = 0x90] = "d2f";
    Opcode[Opcode["i2b"] = 0x91] = "i2b";
    Opcode[Opcode["i2c"] = 0x92] = "i2c";
    Opcode[Opcode["i2s"] = 0x93] = "i2s";
    Opcode[Opcode["lcmp"] = 0x94] = "lcmp";
    Opcode[Opcode["fcmpl"] = 0x95] = "fcmpl";
    Opcode[Opcode["fcmpg"] = 0x96] = "fcmpg";
    Opcode[Opcode["dcmpl"] = 0x97] = "dcmpl";
    Opcode[Opcode["dcmpg"] = 0x98] = "dcmpg";
    Opcode[Opcode["ifeq"] = 0x99] = "ifeq";
    Opcode[Opcode["ifne"] = 0x9a] = "ifne";
    Opcode[Opcode["iflt"] = 0x9b] = "iflt";
    Opcode[Opcode["ifge"] = 0x9c] = "ifge";
    Opcode[Opcode["ifgt"] = 0x9d] = "ifgt";
    Opcode[Opcode["ifle"] = 0x9e] = "ifle";
    Opcode[Opcode["if_icmpeq"] = 0x9f] = "if_icmpeq";
    Opcode[Opcode["if_icmpne"] = 0xa0] = "if_icmpne";
    Opcode[Opcode["if_icmplt"] = 0xa1] = "if_icmplt";
    Opcode[Opcode["if_icmpge"] = 0xa2] = "if_icmpge";
    Opcode[Opcode["if_icmpgt"] = 0xa3] = "if_icmpgt";
    Opcode[Opcode["if_icmple"] = 0xa4] = "if_icmple";
    Opcode[Opcode["if_acmpeq"] = 0xa5] = "if_acmpeq";
    Opcode[Opcode["if_acmpne"] = 0xa6] = "if_acmpne";
    Opcode[Opcode["goto"] = 0xa7] = "goto";
    Opcode[Opcode["jsr"] = 0xa8] = "jsr";
    Opcode[Opcode["ret"] = 0xa9] = "ret";
    Opcode[Opcode["tableswitch"] = 0xaa] = "tableswitch";
    Opcode[Opcode["lookupswitch"] = 0xab] = "lookupswitch";
    Opcode[Opcode["ireturn"] = 0xac] = "ireturn";
    Opcode[Opcode["lreturn"] = 0xad] = "lreturn";
    Opcode[Opcode["freturn"] = 0xae] = "freturn";
    Opcode[Opcode["dreturn"] = 0xaf] = "dreturn";
    Opcode[Opcode["areturn"] = 0xb0] = "areturn";
    Opcode[Opcode["Return"] = 0xb1] = "Return";
    Opcode[Opcode["getstatic"] = 0xb2] = "getstatic";
    Opcode[Opcode["putstatic"] = 0xb3] = "putstatic";
    Opcode[Opcode["getfield"] = 0xb4] = "getfield";
    Opcode[Opcode["putfield"] = 0xb5] = "putfield";
    Opcode[Opcode["invokevirtual"] = 0xb6] = "invokevirtual";
    Opcode[Opcode["invokespecial"] = 0xb7] = "invokespecial";
    Opcode[Opcode["invokestatic"] = 0xb8] = "invokestatic";
    Opcode[Opcode["invokeinterface"] = 0xb9] = "invokeinterface";
    Opcode[Opcode["invokedynamic"] = 0xba] = "invokedynamic";
    Opcode[Opcode['new'] = 0xbb] = 'new';
    Opcode[Opcode["newarray"] = 0xbc] = "newarray";
    Opcode[Opcode["anewarray"] = 0xbd] = "anewarray";
    Opcode[Opcode["arraylength"] = 0xbe] = "arraylength";
    Opcode[Opcode["athrow"] = 0xbf] = "athrow";
    Opcode[Opcode["checkcast"] = 0xc0] = "checkcast";
    Opcode[Opcode['instanceof'] = 0xc1] = 'instanceof';
    Opcode[Opcode["monitorenter"] = 0xc2] = "monitorenter";
    Opcode[Opcode["monitorexit"] = 0xc3] = "monitorexit";
    Opcode[Opcode["wide"] = 0xc4] = "wide";
    Opcode[Opcode["multianewarray"] = 0xc5] = "multianewarray";
    Opcode[Opcode["ifnull"] = 0xc6] = "ifnull";
    Opcode[Opcode["ifnonnull"] = 0xc7] = "ifnonnull";
    Opcode[Opcode["goto_w"] = 0xc8] = "goto_w";
    Opcode[Opcode["jsr_w"] = 0xc9] = "jsr_w";
    Opcode[Opcode["breakpoint"] = 0xca] = "breakpoint";
    Opcode[Opcode["impdep1"] = 0xfe] = "impdep1";
    Opcode[Opcode["impdep2"] = 0xff] = "impdep2";
})(exports.Opcode || (exports.Opcode = {}));
var Opcode = exports.Opcode;

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
    function Instruction(offset, op, param, param2) {
        if (typeof param2 === "undefined") { param2 = null; }
        this.offset = offset;
        this.op = op;
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
    InstructionReader.read = function (code) {
        var offset = code.position;
        var op = code.readUInt8();
        switch (op) {
            case 170 /* tableswitch */:
                throw (new Error("Not implemented tableswitch"));
            case 171 /* lookupswitch */:
                throw (new Error("Not implemented lookupswitch"));
            case 16 /* bipush */:
                return new Instruction(offset, op, code.readUInt8());
            case 17 /* sipush */:
                return new Instruction(offset, op, code.readUInt16BE());
            case 18 /* ldc */:
                return new Instruction(offset, op, code.readUInt8());
            case 132 /* iinc */:
                return new Instruction(offset, op, code.readUInt8(), code.readInt8());
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
                return new Instruction(offset, op, code.readUInt8());

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
                return new Instruction(offset, op, code.readUInt16BE());

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
                return new Instruction(offset, op, offset + code.readInt16BE());

            default:
                return new Instruction(offset, op, null);
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
        var methodType = JavaMethodType.demangle(this.methodTypeStr);
        console.log('JavaMethod.parse() -> ', this.name, this.methodTypeStr, methodType.mangled);
        this.info.attributes.forEach(function (attribute) {
            var attribute_name = _this.pool.getString(attribute.index);

            //console.log('attribute:', attribute_name);
            if (attribute_name == 'Code') {
                //console.log('Code!');
                var attr2 = new Stream(attribute.data);
                var max_stack = attr2.readInt16BE();
                var max_locals = attr2.readInt16BE();
                var code_length = attr2.readInt32BE();
                var code = new Stream(attr2.readBytes(code_length));
                console.log('max_stack_locals', max_stack, max_locals);

                var instructions = [];
                while (!code.eof) {
                    instructions.push(InstructionReader.read(code));
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

var StringReader = (function () {
    function StringReader(reference) {
        this.reference = reference;
        this.offset = 0;
    }
    Object.defineProperty(StringReader.prototype, "length", {
        get: function () {
            return this.reference.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StringReader.prototype, "available", {
        get: function () {
            return this.length - this.offset;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StringReader.prototype, "eof", {
        get: function () {
            return this.available <= 0;
        },
        enumerable: true,
        configurable: true
    });
    StringReader.prototype.read = function () {
        return this.reference.charAt(this.offset++);
    };
    return StringReader;
})();

var JavaType = (function () {
    function JavaType() {
        this.mangled = "";
    }
    JavaType.demangle = function (data) {
        return JavaType._demangle(new StringReader(data));
    };

    JavaType._demangle = function (data) {
        var type = data.read();
        switch (type) {
            case 'L':
                var out = '';
                while (!data.eof) {
                    var c = data.read();
                    if (c == ';')
                        break;
                    out += c;
                }
                return new JavaObject(out);
            case 'V':
                return new JavaVoid();
            case 'I':
                return new JavaInteger();
            case 'J':
                return new JavaLong();
            case 'F':
                return new JavaFloat();
            case 'B':
                return new JavaByte();
            case 'Z':
                return new JavaBoolean();
            case 'S':
                return new JavaShort();
            case 'C':
                return new JavaCharacter();
            case 'D':
                return new JavaDouble();
            case 'F':
                return new JavaFloat();
            case '[':
                return new JavaArray(JavaType._demangle(data));
            case ')':
                return null;

            default:
                throw (new Error("Unknown type " + type));
        }
    };
    return JavaType;
})();

var JavaRef = (function (_super) {
    __extends(JavaRef, _super);
    function JavaRef() {
        _super.apply(this, arguments);
        this.mangled = "";
    }
    return JavaRef;
})(JavaType);
var JavaVoid = (function (_super) {
    __extends(JavaVoid, _super);
    function JavaVoid() {
        _super.apply(this, arguments);
        this.mangled = "V";
    }
    return JavaVoid;
})(JavaType);
var JavaBoolean = (function (_super) {
    __extends(JavaBoolean, _super);
    function JavaBoolean() {
        _super.apply(this, arguments);
        this.mangled = "Z";
    }
    return JavaBoolean;
})(JavaType);
var JavaByte = (function (_super) {
    __extends(JavaByte, _super);
    function JavaByte() {
        _super.apply(this, arguments);
        this.mangled = "B";
    }
    return JavaByte;
})(JavaType);
var JavaShort = (function (_super) {
    __extends(JavaShort, _super);
    function JavaShort() {
        _super.apply(this, arguments);
        this.mangled = "S";
    }
    return JavaShort;
})(JavaType);
var JavaCharacter = (function (_super) {
    __extends(JavaCharacter, _super);
    function JavaCharacter() {
        _super.apply(this, arguments);
        this.mangled = "C";
        this.boxed_name = 'Ljava/lang/Character;';
    }
    return JavaCharacter;
})(JavaType);
var JavaInteger = (function (_super) {
    __extends(JavaInteger, _super);
    function JavaInteger() {
        _super.apply(this, arguments);
        this.mangled = "I";
    }
    return JavaInteger;
})(JavaType);
var JavaObject = (function (_super) {
    __extends(JavaObject, _super);
    function JavaObject(type) {
        _super.call(this);
        this.type = type;
        this.mangled = 'T' + type + ';';
    }
    return JavaObject;
})(JavaType);
var JavaFloat = (function (_super) {
    __extends(JavaFloat, _super);
    function JavaFloat() {
        _super.apply(this, arguments);
        this.mangled = "F";
    }
    return JavaFloat;
})(JavaType);
var JavaDouble = (function (_super) {
    __extends(JavaDouble, _super);
    function JavaDouble() {
        _super.apply(this, arguments);
        this.mangled = "D";
    }
    return JavaDouble;
})(JavaType);
var JavaLong = (function (_super) {
    __extends(JavaLong, _super);
    function JavaLong() {
        _super.apply(this, arguments);
        this.mangled = "J";
    }
    return JavaLong;
})(JavaType);
var JavaArray = (function (_super) {
    __extends(JavaArray, _super);
    function JavaArray(type) {
        _super.call(this);
        this.type = type;
        this.mangled = '[' + type.mangled;
    }
    return JavaArray;
})(JavaType);

var JavaMethodType = (function (_super) {
    __extends(JavaMethodType, _super);
    function JavaMethodType() {
        _super.apply(this, arguments);
        this.arguments = [];
        this.mangled = "";
    }
    JavaMethodType.demangle = function (data) {
        return JavaMethodType._demangle(new StringReader(data));
    };
    JavaMethodType._demangle = function (str) {
        var methodType = new JavaMethodType();
        if (str.read() != '(')
            throw (new Error("Not a method type"));
        while (!str.eof) {
            var type = JavaType._demangle(str);
            if (type === null)
                break;
            methodType.arguments.push(type);
        }
        methodType.rettype = JavaType._demangle(str);
        methodType.mangled = '(' + methodType.arguments.map(function (arg) {
            return arg.mangled;
        }).join('') + ')' + methodType.rettype.mangled;
        if (!str.eof)
            throw (new Error("Not loaded the entire string"));
        return methodType;
    };
    return JavaMethodType;
})(JavaType);

var Dynarec = (function () {
    function Dynarec() {
    }
    Dynarec.getFunctionCode = function (pool, methodName, methodType, max_stack, max_locals, is_static, instructions) {
        var dynarec = new Dynarec1(pool, methodName, methodType, max_stack, max_locals, is_static);
        dynarec.process(instructions);
        var func;

        console.log(dynarec.body);

        try  {
            func = Function.apply(null, range(methodType.arguments.length).map(function (index) {
                return 'arg' + index;
            }).concat([dynarec.body]));
        } catch (e) {
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
                return processor._load(new JavaRef, op - 42 /* aload_0 */);
            case 26 /* iload_0 */:
            case 27 /* iload_1 */:
            case 28 /* iload_2 */:
            case 29 /* iload_3 */:
                return processor._load(new JavaInteger, op - 26 /* iload_0 */);
            case 30 /* lload_0 */:
            case 31 /* lload_1 */:
            case 32 /* lload_2 */:
            case 33 /* lload_3 */:
                return processor._load(new JavaLong, op - 30 /* lload_0 */);
            case 34 /* fload_0 */:
            case 35 /* fload_1 */:
            case 36 /* fload_2 */:
            case 37 /* fload_3 */:
                return processor._load(new JavaFloat, op - 34 /* fload_0 */);
            case 38 /* dload_0 */:
            case 39 /* dload_1 */:
            case 40 /* dload_2 */:
            case 41 /* dload_3 */:
                return processor._load(new JavaDouble, op - 38 /* dload_0 */);

            case 25 /* aload */:
                return processor._load(new JavaRef, param);
            case 21 /* iload */:
                return processor._load(new JavaInteger, param);
            case 22 /* lload */:
                return processor._load(new JavaLong, param);
            case 23 /* fload */:
                return processor._load(new JavaFloat, param);
            case 24 /* dload */:
                return processor._load(new JavaDouble, param);

            case 50 /* aaload */:
                return processor.aaload();
            case 83 /* aastore */:
                return processor.aastore();

            case 75 /* astore_0 */:
            case 76 /* astore_1 */:
            case 77 /* astore_2 */:
            case 78 /* astore_3 */:
                return processor._store(new JavaRef, op - 75 /* astore_0 */);
            case 59 /* istore_0 */:
            case 60 /* istore_1 */:
            case 61 /* istore_2 */:
            case 62 /* istore_3 */:
                return processor._store(new JavaInteger, op - 59 /* istore_0 */);
            case 63 /* lstore_0 */:
            case 64 /* lstore_1 */:
            case 65 /* lstore_2 */:
            case 66 /* lstore_3 */:
                return processor._store(new JavaLong, op - 63 /* lstore_0 */);
            case 67 /* fstore_0 */:
            case 68 /* fstore_1 */:
            case 69 /* fstore_2 */:
            case 70 /* fstore_3 */:
                return processor._store(new JavaFloat, op - 67 /* fstore_0 */);
            case 71 /* dstore_0 */:
            case 72 /* dstore_1 */:
            case 73 /* dstore_2 */:
            case 74 /* dstore_3 */:
                return processor._store(new JavaDouble, op - 71 /* dstore_0 */);

            case 58 /* astore */:
                return processor._store(new JavaRef, param);
            case 54 /* istore */:
                return processor._store(new JavaInteger, param);
            case 55 /* lstore */:
                return processor._store(new JavaLong, param);
            case 56 /* fstore */:
                return processor._store(new JavaFloat, param);
            case 57 /* dstore */:
                return processor._store(new JavaDouble, param);

            case 2 /* iconst_m1 */:
            case 3 /* iconst_0 */:
            case 4 /* iconst_1 */:
            case 5 /* iconst_2 */:
            case 6 /* iconst_3 */:
            case 7 /* iconst_4 */:
            case 8 /* iconst_5 */:
                return processor._const(new JavaInteger, op - 3 /* iconst_0 */);
            case 9 /* lconst_0 */:
            case 10 /* lconst_1 */:
                return processor._const(new JavaLong, op - 3 /* iconst_0 */);
            case 17 /* sipush */:
                return processor._const(new JavaShort, param);
            case 16 /* bipush */:
                return processor._const(new JavaByte, param);

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
                return processor._return(new JavaVoid);
            case 172 /* ireturn */:
                return processor._return(new JavaInteger);
            case 174 /* freturn */:
                return processor._return(new JavaFloat);
            case 175 /* dreturn */:
                return processor._return(new JavaDouble);
            case 173 /* lreturn */:
                return processor._return(new JavaLong);

            case 132 /* iinc */:
                return processor.iinc(param, param2);

            case 96 /* iadd */:
                return processor._binop(new JavaInteger, '+');
            case 100 /* isub */:
                return processor._binop(new JavaInteger, '-');
            case 126 /* iand */:
                return processor._binop(new JavaInteger, '&');
            case 120 /* ishl */:
                return processor._binop(new JavaInteger, '<<');
            case 122 /* ishr */:
                return processor._binop(new JavaInteger, '>>');
            case 124 /* iushr */:
                return processor._binop(new JavaInteger, '>>>');

            case 97 /* ladd */:
                return processor._binop(new JavaLong, '+');
            case 101 /* lsub */:
                return processor._binop(new JavaLong, '+');
            case 127 /* land */:
                return processor._binop(new JavaLong, '&');
            case 121 /* lshl */:
                return processor._binop(new JavaLong, '<<');
            case 123 /* lshr */:
                return processor._binop(new JavaLong, '>>');
            case 125 /* lushr */:
                return processor._binop(new JavaLong, '>>>');

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
                return processor.convert(new JavaInteger, new JavaByte);
            case 146 /* i2c */:
                return processor.convert(new JavaInteger, new JavaCharacter);
            case 135 /* i2d */:
                return processor.convert(new JavaInteger, new JavaDouble);
            case 134 /* i2f */:
                return processor.convert(new JavaInteger, new JavaFloat);
            case 133 /* i2l */:
                return processor.convert(new JavaInteger, new JavaLong);
            case 147 /* i2s */:
                return processor.convert(new JavaInteger, new JavaShort);
            case 138 /* l2d */:
                return processor.convert(new JavaLong, new JavaDouble);
            case 137 /* l2f */:
                return processor.convert(new JavaLong, new JavaFloat);
            case 136 /* l2i */:
                return processor.convert(new JavaLong, new JavaInteger);

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
        if (type instanceof JavaRef) {
            this.writeSentence('stack.push(' + this.getref(index) + '); // aload');
        } else {
            this.writeSentence('stack.push(' + this.getref(index) + '.value); // _load');
        }
    };
    Dynarec0.prototype._return = function (type) {
        if (type instanceof JavaVoid) {
            this.writeSentence('return;');
        } else {
            this.writeSentence('return stack.pop(); // _return');
        }
    };

    Dynarec0.prototype.invoke = function (invokeType, methodInfo) {
        var className = methodInfo.className(this.pool);
        var name = methodInfo.name(this.pool);
        var type = methodInfo.type(this.pool);
        var demangledType = JavaMethodType.demangle(methodInfo.type(this.pool));
        var argCount = demangledType.arguments.length;

        //if (invoketype == 'static') argCount++;
        if (demangledType.rettype instanceof JavaVoid) {
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
        if (type instanceof JavaInteger) {
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
        console.log('-----------------------------', this.methodName);
        instructions.forEach(function (i) {
            _this.processOne(i);
        });
        console.log('///////////////////////////// ', this.stack.length);
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
        if (type instanceof JavaRef) {
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
        if (type instanceof JavaVoid) {
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
        var demangledType = JavaMethodType.demangle(methodInfo.type(this.pool));
        var argCount = demangledType.arguments.length;
        var args = [];

        for (var n = 0; n < argCount; n++) {
            args.push(this.stack.pop());
        }

        var call = new NodeCall(name, args);

        if (demangledType.rettype instanceof JavaVoid) {
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

        this.constantPool.dump();

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

        console.log(magic);
        console.log(minor_version);
        console.log(major_version, JavaClass.majorVersionMap[major_version]);
        console.log(contant_pool_count);
        console.log(interfaces);
        console.log(fields);
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
