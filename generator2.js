/// <reference path="node.d.ts" />
var fs = require('fs');

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

var Opcode;
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
})(Opcode || (Opcode = {}));

var OpcodesArgs = {};

var ACC_CLASS;
(function (ACC_CLASS) {
    ACC_CLASS[ACC_CLASS["PUBLIC"] = 0x0001] = "PUBLIC";
    ACC_CLASS[ACC_CLASS["FINAL"] = 0x0010] = "FINAL";
    ACC_CLASS[ACC_CLASS["SUPER"] = 0x0020] = "SUPER";
    ACC_CLASS[ACC_CLASS["INTERFACE"] = 0x0200] = "INTERFACE";
    ACC_CLASS[ACC_CLASS["ABSTRACT"] = 0x0400] = "ABSTRACT";
})(ACC_CLASS || (ACC_CLASS = {}));
var ACC_FIELD;
(function (ACC_FIELD) {
    ACC_FIELD[ACC_FIELD["PUBLIC"] = 0x0001] = "PUBLIC";
    ACC_FIELD[ACC_FIELD["PRIVATE"] = 0x0002] = "PRIVATE";
    ACC_FIELD[ACC_FIELD["PROTECTED"] = 0x0004] = "PROTECTED";
    ACC_FIELD[ACC_FIELD["STATIC"] = 0x0008] = "STATIC";
    ACC_FIELD[ACC_FIELD["FINAL"] = 0x0010] = "FINAL";
    ACC_FIELD[ACC_FIELD["VOLATILE"] = 0x0040] = "VOLATILE";
    ACC_FIELD[ACC_FIELD["TRANSIENT"] = 0x0080] = "TRANSIENT";
})(ACC_FIELD || (ACC_FIELD = {}));
var ACC_METHOD;
(function (ACC_METHOD) {
    ACC_METHOD[ACC_METHOD["PUBLIC"] = 0x0001] = "PUBLIC";
    ACC_METHOD[ACC_METHOD["PRIVATE"] = 0x0002] = "PRIVATE";
    ACC_METHOD[ACC_METHOD["PROTECTED"] = 0x0004] = "PROTECTED";
    ACC_METHOD[ACC_METHOD["STATIC"] = 0x0008] = "STATIC";
    ACC_METHOD[ACC_METHOD["FINAL"] = 0x0010] = "FINAL";
    ACC_METHOD[ACC_METHOD["SYNCHRONIZED"] = 0x0020] = "SYNCHRONIZED";
    ACC_METHOD[ACC_METHOD["NATIVE"] = 0x0100] = "NATIVE";
    ACC_METHOD[ACC_METHOD["ABSTRACT"] = 0x0400] = "ABSTRACT";
    ACC_METHOD[ACC_METHOD["STRICT"] = 0x0800] = "STRICT";
})(ACC_METHOD || (ACC_METHOD = {}));
var CONSTANT;
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
})(CONSTANT || (CONSTANT = {}));

var JavaConstantUtf8 = (function () {
    function JavaConstantUtf8(data) {
        this.string = "";
        this.string = data.toString('utf-8');
    }
    return JavaConstantUtf8;
})();

var JavaConstantInt = (function () {
    function JavaConstantInt(value) {
        this.value = value;
    }
    return JavaConstantInt;
})();
var JavaConstantLong = (function () {
    function JavaConstantLong(low, high) {
        this.low = low;
        this.high = high;
    }
    return JavaConstantLong;
})();
var JavaConstantClassReference = (function () {
    function JavaConstantClassReference(index) {
        this.index = index;
    }
    return JavaConstantClassReference;
})();
var JavaConstantStringReference = (function () {
    function JavaConstantStringReference(index) {
        this.index = index;
    }
    return JavaConstantStringReference;
})();
var JavaConstantFieldReference = (function () {
    function JavaConstantFieldReference(index1, index2) {
        this.index1 = index1;
        this.index2 = index2;
    }
    return JavaConstantFieldReference;
})();
var JavaConstantMethodReference = (function () {
    function JavaConstantMethodReference(index1, index2) {
        this.index1 = index1;
        this.index2 = index2;
    }
    return JavaConstantMethodReference;
})();
var JavaConstantInterfaceMethodReference = (function () {
    function JavaConstantInterfaceMethodReference(index1, index2) {
        this.index1 = index1;
        this.index2 = index2;
    }
    return JavaConstantInterfaceMethodReference;
})();
var JavaConstantNameTypeDescriptor = (function () {
    function JavaConstantNameTypeDescriptor(index1, index2) {
        this.index1 = index1;
        this.index2 = index2;
    }
    return JavaConstantNameTypeDescriptor;
})();

var JavaMemberInfo = (function () {
    function JavaMemberInfo(access_flags, name_index, descriptor_index, attributes) {
        this.access_flags = access_flags;
        this.name_index = name_index;
        this.descriptor_index = descriptor_index;
        this.attributes = attributes;
    }
    return JavaMemberInfo;
})();

var JavaAttributeInfo = (function () {
    function JavaAttributeInfo(index, data) {
        this.index = index;
        this.data = data;
    }
    return JavaAttributeInfo;
})();

var OpcodeReader = (function () {
    function OpcodeReader() {
    }
    OpcodeReader.read = function (code) {
        var op = code.readUInt8();
        switch (op) {
            case 170 /* tableswitch */:
                throw (new Error("Not implemented tableswitch"));
            case 171 /* lookupswitch */:
                throw (new Error("Not implemented lookupswitch"));
            case 16 /* bipush */:
                return { op: op, name: Opcode[op], param: code.readUInt8() };
            case 17 /* sipush */:
                return { op: op, name: Opcode[op], param: code.readUInt16BE() };
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
                return { op: op, name: Opcode[op], param: code.readUInt8() };

            case 18 /* ldc */:
                return { op: op, name: Opcode[op], param: code.readUInt8() };

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
                return { op: op, name: Opcode[op], param: code.readUInt16BE() };

            case 132 /* iinc */:
                throw (new Error("Not implemented index_const_body"));
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
                return { op: op, name: Opcode[op], param: code.readInt16BE() };

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
            default:
                return { op: op, name: Opcode[op] };
        }
    };
    return OpcodeReader;
})();

var JavaMethod = (function () {
    function JavaMethod(pool, info) {
        this.pool = pool;
        this.info = info;
        this.name = pool.getString(info.name_index);
        this.descriptor = pool.getString(info.descriptor_index);
        this.parse();
    }
    JavaMethod.prototype.parse = function () {
        var _this = this;
        console.log('JavaMethod.parse() -> ', this.name, this.descriptor);
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
                while (!code.eof) {
                    var op = OpcodeReader.read(code);
                    console.log('op', op);
                }
            }
        });
    };
    return JavaMethod;
})();

var ConstantPool = (function () {
    function ConstantPool() {
        this.items = [];
    }
    ConstantPool.prototype.get = function (index) {
        return this.items[index];
    };

    ConstantPool.prototype.getString = function (index) {
        return this.get(index).string;
    };

    ConstantPool.prototype.getClassName = function (index) {
        return this.getString(this.get(index).index);
    };
    return ConstantPool;
})();

var Dynarec = (function () {
    function Dynarec() {
    }
    return Dynarec;
})();

var JavaClass = (function () {
    function JavaClass() {
    }
    JavaClass.prototype.readData = function (stream) {
        var magic = stream.readUInt32BE();
        var minor_version = stream.readUInt16BE();
        var major_version = stream.readUInt16BE();
        var contant_pool_count = stream.readUInt16BE();

        if (magic != 3405691582)
            throw (new Error("Not a java class"));

        this.constantPool = new ConstantPool();
        var constants = [null, null];
        while (--contant_pool_count > 0) {
            var item = this.readConstantPoolInfo(stream);
            if (item instanceof JavaConstantLong)
                contant_pool_count--;
            console.log(constants.length, item.constructor, item);
            constants.push(item);
        }
        this.constantPool.items = constants;

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
        var methods = [];
        var attributes = [];

        for (var n = 0, count = stream.readUInt16BE(); n < count; n++)
            interfaces.push(stream.readUInt16BE());
        for (var n = 0, count = stream.readUInt16BE(); n < count; n++)
            fields.push(this.readFieldInfo(stream));
        for (var n = 0, count = stream.readUInt16BE(); n < count; n++)
            methods.push(new JavaMethod(this.constantPool, this.readMethodInfo(stream)));
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
        methods.forEach(function (method) {
            //console.log(method);
        });
    };

    JavaClass.prototype.readConstantPoolInfo = function (stream) {
        var offset = stream.position;
        var type = stream.readUInt8();

        switch (type) {
            case 1 /* Utf8 */:
                return new JavaConstantUtf8(stream.readBytes(stream.readUInt16BE()));
            case 3 /* Integer */:
                return new JavaConstantInt(stream.readInt32BE());
            case 4 /* Float */:
                throw (new Error("CONSTANT.Float"));
            case 5 /* Long */:
                return new JavaConstantLong(stream.readInt32BE(), stream.readInt32BE());
            case 6 /* Double */:
                throw (new Error("CONSTANT.Double"));
            case 7 /* Class */:
                return new JavaConstantClassReference(stream.readUInt16BE());
            case 8 /* String */:
                return new JavaConstantStringReference(stream.readUInt16BE());
            case 9 /* Fieldref */:
                return new JavaConstantFieldReference(stream.readUInt16BE(), stream.readUInt16BE());
            case 10 /* Methodref */:
                return new JavaConstantMethodReference(stream.readUInt16BE(), stream.readUInt16BE());
            case 11 /* InterfaceMethodref */:
                return new JavaConstantInterfaceMethodReference(stream.readUInt16BE(), stream.readUInt16BE());
            case 12 /* NameAndType */:
                return new JavaConstantNameTypeDescriptor(stream.readUInt16BE(), stream.readUInt16BE());
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

var javaClass = new JavaClass();

javaClass.readData(new Stream(fs.readFileSync(__dirname + '/../classes/java/io/Bits.class')));
//# sourceMappingURL=generator2.js.map
