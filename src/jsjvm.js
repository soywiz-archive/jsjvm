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
    Convert.ConvertIS = function (value) {
        return (value & 0xFFFF) | 0;
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

(function (ParamType) {
    ParamType[ParamType["Void"] = 0] = "Void";
    ParamType[ParamType["Special"] = 1] = "Special";
    ParamType[ParamType["U8"] = 2] = "U8";
    ParamType[ParamType["S8"] = 3] = "S8";
    ParamType[ParamType["U16"] = 4] = "U16";
    ParamType[ParamType["S16"] = 5] = "S16";
    ParamType[ParamType["U32"] = 6] = "U32";
    ParamType[ParamType["S32"] = 7] = "S32";
    ParamType[ParamType["U8_S8"] = 8] = "U8_S8";
    ParamType[ParamType["U16_U8"] = 9] = "U16_U8";
    ParamType[ParamType["TableSwitch"] = 10] = "TableSwitch";
    ParamType[ParamType["LookupSwitch"] = 11] = "LookupSwitch";
})(exports.ParamType || (exports.ParamType = {}));
var ParamType = exports.ParamType;

var OpcodeInfo = (function () {
    function OpcodeInfo(opcode, param, stackPop, stackPush, description) {
        this.opcode = opcode;
        this.param = param;
        this.stackPop = stackPop;
        this.stackPush = stackPush;
        this.description = description;
    }
    Object.defineProperty(OpcodeInfo.prototype, "deltaStack", {
        get: function () {
            return this.stackPush.length - this.stackPop.length;
        },
        enumerable: true,
        configurable: true
    });
    return OpcodeInfo;
})();
exports.OpcodeInfo = OpcodeInfo;

var opcodeInfoList = [
    new OpcodeInfo(0 /* nop */, 0 /* Void */, [], [], 'perform no operation'),
    new OpcodeInfo(1 /* aconst_null */, 0 /* Void */, [], ['null'], 'push a null reference onto the stack'),
    new OpcodeInfo(2 /* iconst_m1 */, 0 /* Void */, [], ['-1'], 'load the int value -1 onto the stack'),
    new OpcodeInfo(3 /* iconst_0 */, 0 /* Void */, [], ['0'], 'load the int value 0 onto the stack'),
    new OpcodeInfo(4 /* iconst_1 */, 0 /* Void */, [], ['1'], 'load the int value 1 onto the stack'),
    new OpcodeInfo(5 /* iconst_2 */, 0 /* Void */, [], ['2'], 'load the int value 2 onto the stack'),
    new OpcodeInfo(6 /* iconst_3 */, 0 /* Void */, [], ['3'], 'load the int value 3 onto the stack'),
    new OpcodeInfo(7 /* iconst_4 */, 0 /* Void */, [], ['4'], 'load the int value 4 onto the stack'),
    new OpcodeInfo(8 /* iconst_5 */, 0 /* Void */, [], ['5'], 'load the int value 5 onto the stack'),
    new OpcodeInfo(9 /* lconst_0 */, 0 /* Void */, [], ['0L'], 'push the long 0 onto the stack'),
    new OpcodeInfo(10 /* lconst_1 */, 0 /* Void */, [], ['1L'], 'push the long 1 onto the stack'),
    new OpcodeInfo(11 /* fconst_0 */, 0 /* Void */, [], ['0.0f'], 'push 0.0f on the stack'),
    new OpcodeInfo(12 /* fconst_1 */, 0 /* Void */, [], ['1.0f'], 'push 1.0f on the stack'),
    new OpcodeInfo(13 /* fconst_2 */, 0 /* Void */, [], ['2.0f'], 'push 2.0f on the stack'),
    new OpcodeInfo(14 /* dconst_0 */, 0 /* Void */, [], ['0.0'], 'push the constant 0.0 onto the stack'),
    new OpcodeInfo(15 /* dconst_1 */, 0 /* Void */, [], ['1.0'], 'push the constant 1.0 onto the stack'),
    new OpcodeInfo(16 /* bipush */, 3 /* S8 */, [], ['value'], 'push a byte onto the stack as an integer value'),
    new OpcodeInfo(17 /* sipush */, 5 /* S16 */, [], ['value'], 'push a short onto the stack'),
    new OpcodeInfo(18 /* ldc */, 2 /* U8 */, [], ['value'], 'push a constant #index from a constant pool (String, int or float) onto the stack'),
    new OpcodeInfo(19 /* ldc_w */, 4 /* U16 */, [], ['value'], 'push a constant #index from a constant pool (String, int or float) onto the stack (wide index is constructed as indexbyte1 << 8 + indexbyte2)'),
    new OpcodeInfo(20 /* ldc2_w */, 4 /* U16 */, [], ['value'], 'push a constant #index from a constant pool (double or long) onto the stack (wide index is constructed as indexbyte1 << 8 + indexbyte2)'),
    new OpcodeInfo(21 /* iload */, 2 /* U8 */, [], ['value'], 'load an int value from a local variable #index'),
    new OpcodeInfo(22 /* lload */, 2 /* U8 */, [], ['value'], 'load a long value from a local variable #index'),
    new OpcodeInfo(23 /* fload */, 2 /* U8 */, [], ['value'], 'load a float value from a local variable #index'),
    new OpcodeInfo(24 /* dload */, 2 /* U8 */, [], ['value'], 'load a double value from a local variable #index'),
    new OpcodeInfo(25 /* aload */, 2 /* U8 */, [], ['objectref'], 'load a reference onto the stack from a local variable #index'),
    new OpcodeInfo(26 /* iload_0 */, 0 /* Void */, [], ['value'], 'load an int value from local variable 0'),
    new OpcodeInfo(27 /* iload_1 */, 0 /* Void */, [], ['value'], 'load an int value from local variable 1'),
    new OpcodeInfo(28 /* iload_2 */, 0 /* Void */, [], ['value'], 'load an int value from local variable 2'),
    new OpcodeInfo(29 /* iload_3 */, 0 /* Void */, [], ['value'], 'load an int value from local variable 3'),
    new OpcodeInfo(30 /* lload_0 */, 0 /* Void */, [], ['value'], 'load a long value from local variable 0'),
    new OpcodeInfo(31 /* lload_1 */, 0 /* Void */, [], ['value'], 'load a long value from local variable 1'),
    new OpcodeInfo(32 /* lload_2 */, 0 /* Void */, [], ['value'], 'load a long value from local variable 2'),
    new OpcodeInfo(33 /* lload_3 */, 0 /* Void */, [], ['value'], 'load a long value from local variable 3'),
    new OpcodeInfo(34 /* fload_0 */, 0 /* Void */, [], ['value'], 'load a float value from local variable 0'),
    new OpcodeInfo(35 /* fload_1 */, 0 /* Void */, [], ['value'], 'load a float value from local variable 1'),
    new OpcodeInfo(36 /* fload_2 */, 0 /* Void */, [], ['value'], 'load a float value from local variable 2'),
    new OpcodeInfo(37 /* fload_3 */, 0 /* Void */, [], ['value'], 'load a float value from local variable 3'),
    new OpcodeInfo(38 /* dload_0 */, 0 /* Void */, [], ['value'], 'load a double value from local variable 0'),
    new OpcodeInfo(39 /* dload_1 */, 0 /* Void */, [], ['value'], 'load a double value from local variable 1'),
    new OpcodeInfo(40 /* dload_2 */, 0 /* Void */, [], ['value'], 'load a double value from local variable 2'),
    new OpcodeInfo(41 /* dload_3 */, 0 /* Void */, [], ['value'], 'load a double value from local variable 3'),
    new OpcodeInfo(42 /* aload_0 */, 0 /* Void */, [], ['objectref'], 'load a reference onto the stack from local variable 0'),
    new OpcodeInfo(43 /* aload_1 */, 0 /* Void */, [], ['objectref'], 'load a reference onto the stack from local variable 1'),
    new OpcodeInfo(44 /* aload_2 */, 0 /* Void */, [], ['objectref'], 'load a reference onto the stack from local variable 2'),
    new OpcodeInfo(45 /* aload_3 */, 0 /* Void */, [], ['objectref'], 'load a reference onto the stack from local variable 3'),
    new OpcodeInfo(46 /* iaload */, 0 /* Void */, ['arrayref', 'index'], ['value'], 'load an int from an array'),
    new OpcodeInfo(47 /* laload */, 0 /* Void */, ['arrayref', 'index'], ['value'], 'load a long from an array'),
    new OpcodeInfo(48 /* faload */, 0 /* Void */, ['arrayref', 'index'], ['value'], 'load a float from an array'),
    new OpcodeInfo(49 /* daload */, 0 /* Void */, ['arrayref', 'index'], ['value'], 'load a double from an array'),
    new OpcodeInfo(50 /* aaload */, 0 /* Void */, ['arrayref', 'index'], ['objectref'], 'load onto the stack a reference from an array'),
    new OpcodeInfo(51 /* baload */, 0 /* Void */, ['arrayref', 'index'], ['value'], 'load a byte or Boolean value from an array'),
    new OpcodeInfo(52 /* caload */, 0 /* Void */, ['arrayref', 'index'], ['value'], 'load a char from an array'),
    new OpcodeInfo(53 /* saload */, 0 /* Void */, ['arrayref', 'index'], ['value'], 'load short from array'),
    new OpcodeInfo(54 /* istore */, 2 /* U8 */, ['value'], [''], 'store int value into variable #index'),
    new OpcodeInfo(55 /* lstore */, 2 /* U8 */, ['value'], [''], 'store a long value in a local variable #index'),
    new OpcodeInfo(56 /* fstore */, 2 /* U8 */, ['value'], [''], 'store a float value in a local variable #index'),
    new OpcodeInfo(57 /* dstore */, 2 /* U8 */, ['value'], [''], 'store a double value in a local variable #index'),
    new OpcodeInfo(58 /* astore */, 2 /* U8 */, ['objectref'], [''], 'store a reference in a local variable #index'),
    new OpcodeInfo(59 /* istore_0 */, 0 /* Void */, ['value'], [''], 'store int value into variable 0'),
    new OpcodeInfo(60 /* istore_1 */, 0 /* Void */, ['value'], [''], 'store int value into variable 1'),
    new OpcodeInfo(61 /* istore_2 */, 0 /* Void */, ['value'], [''], 'store int value into variable 2'),
    new OpcodeInfo(62 /* istore_3 */, 0 /* Void */, ['value'], [''], 'store int value into variable 3'),
    new OpcodeInfo(63 /* lstore_0 */, 0 /* Void */, ['value'], [''], 'store long value into variable 0'),
    new OpcodeInfo(64 /* lstore_1 */, 0 /* Void */, ['value'], [''], 'store long value into variable 1'),
    new OpcodeInfo(65 /* lstore_2 */, 0 /* Void */, ['value'], [''], 'store long value into variable 2'),
    new OpcodeInfo(66 /* lstore_3 */, 0 /* Void */, ['value'], [''], 'store long value into variable 3'),
    new OpcodeInfo(67 /* fstore_0 */, 0 /* Void */, ['value'], [''], 'store float value into variable 0'),
    new OpcodeInfo(68 /* fstore_1 */, 0 /* Void */, ['value'], [''], 'store float value into variable 1'),
    new OpcodeInfo(69 /* fstore_2 */, 0 /* Void */, ['value'], [''], 'store float value into variable 2'),
    new OpcodeInfo(70 /* fstore_3 */, 0 /* Void */, ['value'], [''], 'store float value into variable 3'),
    new OpcodeInfo(71 /* dstore_0 */, 0 /* Void */, ['value'], [''], 'store double value into variable 0'),
    new OpcodeInfo(72 /* dstore_1 */, 0 /* Void */, ['value'], [''], 'store double value into variable 1'),
    new OpcodeInfo(73 /* dstore_2 */, 0 /* Void */, ['value'], [''], 'store double value into variable 2'),
    new OpcodeInfo(74 /* dstore_3 */, 0 /* Void */, ['value'], [''], 'store double value into variable 3'),
    new OpcodeInfo(75 /* astore_0 */, 0 /* Void */, ['objectref'], [''], 'store reference into variable 0'),
    new OpcodeInfo(76 /* astore_1 */, 0 /* Void */, ['objectref'], [''], 'store reference into variable 1'),
    new OpcodeInfo(77 /* astore_2 */, 0 /* Void */, ['objectref'], [''], 'store reference into variable 2'),
    new OpcodeInfo(78 /* astore_3 */, 0 /* Void */, ['objectref'], [''], 'store reference into variable 3'),
    new OpcodeInfo(79 /* iastore */, 0 /* Void */, ['arrayref', 'index', 'value'], [''], 'store an int into an array'),
    new OpcodeInfo(80 /* lastore */, 0 /* Void */, ['arrayref', 'index', 'value'], [''], 'store a long into an array'),
    new OpcodeInfo(81 /* fastore */, 0 /* Void */, ['arrayref', 'index', 'value'], [''], 'store a float into an array'),
    new OpcodeInfo(82 /* dastore */, 0 /* Void */, ['arrayref', 'index', 'value'], [''], 'store a double into an array'),
    new OpcodeInfo(83 /* aastore */, 0 /* Void */, ['arrayref', 'index', 'value'], [''], 'store a reference in an array'),
    new OpcodeInfo(84 /* bastore */, 0 /* Void */, ['arrayref', 'index', 'value'], [''], 'store a byte or Boolean value into an array'),
    new OpcodeInfo(85 /* castore */, 0 /* Void */, ['arrayref', 'index', 'value'], [''], 'store a char value into an array'),
    new OpcodeInfo(86 /* sastore */, 0 /* Void */, ['arrayref', 'index', 'value'], [''], 'store a short value into an array'),
    new OpcodeInfo(87 /* pop */, 0 /* Void */, ['value'], [''], 'discard the top value on the stack'),
    new OpcodeInfo(88 /* pop2 */, 0 /* Void */, ['value2', 'value1'], [''], 'discard the top two values on the stack (or one value, if it is a double or long)'),
    new OpcodeInfo(89 /* dup */, 0 /* Void */, ['value'], ['value', 'value'], 'duplicate the value on top of the stack'),
    new OpcodeInfo(90 /* dup_x1 */, 0 /* Void */, ['value2', 'value1'], ['value1', 'value2', 'value1'], 'insert a copy of the top value into the stack two values from the top. value1 and value2 must not be of the type double or long.'),
    new OpcodeInfo(91 /* dup_x2 */, 0 /* Void */, ['value3', 'value2', 'value1'], ['value1', 'value3', 'value2', 'value1'], 'insert a copy of the top value into the stack two values from the top. value1 and value2 must not be of the type double or long.'),
    new OpcodeInfo(92 /* dup2 */, 0 /* Void */, ['value2', 'value1'], ['value2', 'value1', 'value2', 'value1'], 'duplicate top two stack words (two values, if value1 is not double nor long; a single value, if value1 is double or long)'),
    new OpcodeInfo(93 /* dup2_x1 */, 0 /* Void */, ['value3', 'value2', 'value1'], ['value2', 'value1', 'value3', 'value2', 'value1'], 'duplicate two words and insert beneath third word (see explanation above)'),
    new OpcodeInfo(94 /* dup2_x2 */, 0 /* Void */, ['value4', 'value3', 'value2', 'value1'], ['value2', 'value1', 'value4', 'value3', 'value2', 'value1'], 'duplicate two words and insert beneath fourth word'),
    new OpcodeInfo(95 /* swap */, 0 /* Void */, ['value2', 'value1'], ['value1', 'value2'], 'swaps two top words on the stack (note that value1 and value2 must not be double or long)'),
    new OpcodeInfo(96 /* iadd */, 0 /* Void */, ['value1', 'value2'], ['result'], 'add two ints'),
    new OpcodeInfo(97 /* ladd */, 0 /* Void */, ['value1', 'value2'], ['result'], 'add two longs'),
    new OpcodeInfo(98 /* fadd */, 0 /* Void */, ['value1', 'value2'], ['result'], 'add two floats'),
    new OpcodeInfo(99 /* dadd */, 0 /* Void */, ['value1', 'value2'], ['result'], 'add two doubles'),
    new OpcodeInfo(100 /* isub */, 0 /* Void */, ['value1', 'value2'], ['result'], 'subtract two ints'),
    new OpcodeInfo(101 /* lsub */, 0 /* Void */, ['value1', 'value2'], ['result'], 'subtract two longs'),
    new OpcodeInfo(102 /* fsub */, 0 /* Void */, ['value1', 'value2'], ['result'], 'subtract two floats'),
    new OpcodeInfo(103 /* dsub */, 0 /* Void */, ['value1', 'value2'], ['result'], 'subtract two doubles'),
    new OpcodeInfo(104 /* imul */, 0 /* Void */, ['value1', 'value2'], ['result'], 'multiply two ints'),
    new OpcodeInfo(105 /* lmul */, 0 /* Void */, ['value1', 'value2'], ['result'], 'multiply two longs'),
    new OpcodeInfo(106 /* fmul */, 0 /* Void */, ['value1', 'value2'], ['result'], 'multiply two floats'),
    new OpcodeInfo(107 /* dmul */, 0 /* Void */, ['value1', 'value2'], ['result'], 'multiply two doubles'),
    new OpcodeInfo(108 /* idiv */, 0 /* Void */, ['value1', 'value2'], ['result'], 'divide two ints'),
    new OpcodeInfo(109 /* ldiv */, 0 /* Void */, ['value1', 'value2'], ['result'], 'divide two longs'),
    new OpcodeInfo(110 /* fdiv */, 0 /* Void */, ['value1', 'value2'], ['result'], 'divide two floats'),
    new OpcodeInfo(111 /* ddiv */, 0 /* Void */, ['value1', 'value2'], ['result'], 'divide two doubles'),
    new OpcodeInfo(112 /* irem */, 0 /* Void */, ['value1', 'value2'], ['result'], 'remainder of two ints'),
    new OpcodeInfo(113 /* lrem */, 0 /* Void */, ['value1', 'value2'], ['result'], 'remainder of two longs'),
    new OpcodeInfo(114 /* frem */, 0 /* Void */, ['value1', 'value2'], ['result'], 'remainder of two floats'),
    new OpcodeInfo(115 /* drem */, 0 /* Void */, ['value1', 'value2'], ['result'], 'remainder of two doubles'),
    new OpcodeInfo(116 /* ineg */, 0 /* Void */, ['value'], ['result'], 'negate ints'),
    new OpcodeInfo(116 /* ineg */, 0 /* Void */, ['value'], ['result'], 'negate longs'),
    new OpcodeInfo(116 /* ineg */, 0 /* Void */, ['value'], ['result'], 'negate floats'),
    new OpcodeInfo(116 /* ineg */, 0 /* Void */, ['value'], ['result'], 'negate doubles'),
    new OpcodeInfo(120 /* ishl */, 0 /* Void */, ['value1', 'value2'], ['result'], 'int shift left'),
    new OpcodeInfo(121 /* lshl */, 0 /* Void */, ['value1', 'value2'], ['result'], 'bitwise shift left of a long value1 by int value2 positions'),
    new OpcodeInfo(122 /* ishr */, 0 /* Void */, ['value1', 'value2'], ['result'], 'int arithmetic shift right'),
    new OpcodeInfo(123 /* lshr */, 0 /* Void */, ['value1', 'value2'], ['result'], 'bitwise arithmetic shift right of a long value1 by int value2 positions'),
    new OpcodeInfo(124 /* iushr */, 0 /* Void */, ['value1', 'value2'], ['result'], 'int logical shift right'),
    new OpcodeInfo(125 /* lushr */, 0 /* Void */, ['value1', 'value2'], ['result'], 'bitwise logical shift right of a long value1 by int value2 positions'),
    new OpcodeInfo(126 /* iand */, 0 /* Void */, ['value1', 'value2'], ['result'], 'bitwise and of two ints'),
    new OpcodeInfo(127 /* land */, 0 /* Void */, ['value1', 'value2'], ['result'], 'bitwise and of two longs'),
    new OpcodeInfo(128 /* ior */, 0 /* Void */, ['value1', 'value2'], ['result'], 'bitwise or of two ints'),
    new OpcodeInfo(129 /* lor */, 0 /* Void */, ['value1', 'value2'], ['result'], 'bitwise or of two longs'),
    new OpcodeInfo(130 /* ixor */, 0 /* Void */, ['value1', 'value2'], ['result'], 'bitwise xor of two ints'),
    new OpcodeInfo(131 /* lxor */, 0 /* Void */, ['value1', 'value2'], ['result'], 'bitwise xor of two longs'),
    new OpcodeInfo(132 /* iinc */, 8 /* U8_S8 */, [], [], 'increment local variable #index by signed byte const'),
    new OpcodeInfo(133 /* i2l */, 0 /* Void */, ['value'], ['result'], 'convert an int into a long'),
    new OpcodeInfo(134 /* i2f */, 0 /* Void */, ['value'], ['result'], 'convert an int into a float'),
    new OpcodeInfo(135 /* i2d */, 0 /* Void */, ['value'], ['result'], 'convert an int into a double'),
    new OpcodeInfo(136 /* l2i */, 0 /* Void */, ['value'], ['result'], 'convert a long to a int'),
    new OpcodeInfo(137 /* l2f */, 0 /* Void */, ['value'], ['result'], 'convert a long to a float'),
    new OpcodeInfo(138 /* l2d */, 0 /* Void */, ['value'], ['result'], 'convert a long to a double'),
    new OpcodeInfo(139 /* f2i */, 0 /* Void */, ['value'], ['result'], 'convert a float to a int'),
    new OpcodeInfo(140 /* f2l */, 0 /* Void */, ['value'], ['result'], 'convert a float to a long'),
    new OpcodeInfo(141 /* f2d */, 0 /* Void */, ['value'], ['result'], 'convert a float to a double'),
    new OpcodeInfo(142 /* d2i */, 0 /* Void */, ['value'], ['result'], 'convert a double to a int'),
    new OpcodeInfo(143 /* d2l */, 0 /* Void */, ['value'], ['result'], 'convert a double to a long'),
    new OpcodeInfo(144 /* d2f */, 0 /* Void */, ['value'], ['result'], 'convert a double to a float'),
    new OpcodeInfo(145 /* i2b */, 0 /* Void */, ['value'], ['result'], 'convert an int into a byte'),
    new OpcodeInfo(146 /* i2c */, 0 /* Void */, ['value'], ['result'], 'convert an int into a character'),
    new OpcodeInfo(147 /* i2s */, 0 /* Void */, ['value'], ['result'], 'convert an int into a short'),
    new OpcodeInfo(148 /* lcmp */, 0 /* Void */, ['value1', 'value2'], ['result'], 'compare two longs values'),
    new OpcodeInfo(149 /* fcmpl */, 0 /* Void */, ['value1', 'value2'], ['result'], 'compare two floats less'),
    new OpcodeInfo(150 /* fcmpg */, 0 /* Void */, ['value1', 'value2'], ['result'], 'compare two floats greater'),
    new OpcodeInfo(151 /* dcmpl */, 0 /* Void */, ['value1', 'value2'], ['result'], 'compare two doubles less'),
    new OpcodeInfo(152 /* dcmpg */, 0 /* Void */, ['value1', 'value2'], ['result'], 'compare two doubles greater'),
    new OpcodeInfo(153 /* ifeq */, 5 /* S16 */, ['value'], [], 'if value is 0, branch to instruction at branchoffset (signed short constructed from unsigned bytes branchbyte1 << 8 + branchbyte2)'),
    new OpcodeInfo(154 /* ifne */, 5 /* S16 */, ['value'], [], 'if value is not 0, branch to instruction at branchoffset (signed short constructed from unsigned bytes branchbyte1 << 8 + branchbyte2)'),
    new OpcodeInfo(155 /* iflt */, 5 /* S16 */, ['value'], [], 'if value is less than 0, branch to instruction at branchoffset (signed short constructed from unsigned bytes branchbyte1 << 8 + branchbyte2)'),
    new OpcodeInfo(156 /* ifge */, 5 /* S16 */, ['value'], [], 'if value is greater than or equal to 0, branch to instruction at branchoffset (signed short constructed from unsigned bytes branchbyte1 << 8 + branchbyte2)'),
    new OpcodeInfo(157 /* ifgt */, 5 /* S16 */, ['value'], [], 'if value is greater than 0, branch to instruction at branchoffset (signed short constructed from unsigned bytes branchbyte1 << 8 + branchbyte2)'),
    new OpcodeInfo(158 /* ifle */, 5 /* S16 */, ['value'], [], 'if value is less than or equal to 0, branch to instruction at branchoffset (signed short constructed from unsigned bytes branchbyte1 << 8 + branchbyte2)'),
    new OpcodeInfo(159 /* if_icmpeq */, 5 /* S16 */, ['value1', 'value2'], [], 'if ints are equal, branch to instruction at branchoffset (signed short constructed from unsigned bytes branchbyte1 << 8 + branchbyte2)'),
    new OpcodeInfo(160 /* if_icmpne */, 5 /* S16 */, ['value1', 'value2'], [], 'ifif ints are not equal, branch to instruction at branchoffset (signed short constructed from unsigned bytes branchbyte1 << 8 + branchbyte2)'),
    new OpcodeInfo(161 /* if_icmplt */, 5 /* S16 */, ['value1', 'value2'], [], 'if value1 is less than value2, branch to instruction at branchoffset (signed short constructed from unsigned bytes branchbyte1 << 8 + branchbyte2)'),
    new OpcodeInfo(162 /* if_icmpge */, 5 /* S16 */, ['value1', 'value2'], [], 'if value1 is greater than or equal to value2, branch to instruction at branchoffset (signed short constructed from unsigned bytes branchbyte1 << 8 + branchbyte2)'),
    new OpcodeInfo(163 /* if_icmpgt */, 5 /* S16 */, ['value1', 'value2'], [], 'if value1 is greater than value2, branch to instruction at branchoffset (signed short constructed from unsigned bytes branchbyte1 << 8 + branchbyte2)'),
    new OpcodeInfo(164 /* if_icmple */, 5 /* S16 */, ['value1', 'value2'], [], 'if value1 is less than or equal to value2, branch to instruction at branchoffset (signed short constructed from unsigned bytes branchbyte1 << 8 + branchbyte2)'),
    new OpcodeInfo(165 /* if_acmpeq */, 5 /* S16 */, ['value1', 'value2'], [], 'if references are equal, branch to instruction at branchoffset (signed short constructed from unsigned bytes branchbyte1 << 8 + branchbyte2)'),
    new OpcodeInfo(166 /* if_acmpne */, 5 /* S16 */, ['value1', 'value2'], [], 'if references are not equal, branch to instruction at branchoffset (signed short constructed from unsigned bytes branchbyte1 << 8 + branchbyte2)'),
    new OpcodeInfo(167 /* goto */, 5 /* S16 */, [], [], 'goes to another instruction at branchoffset (signed short constructed from unsigned bytes branchbyte1 << 8 + branchbyte2)'),
    new OpcodeInfo(168 /* jsr */, 5 /* S16 */, [], ['address'], 'jump to subroutine at branchoffset (signed short constructed from unsigned bytes branchbyte1 << 8 + branchbyte2) and place the return address on the stack'),
    new OpcodeInfo(169 /* ret */, 2 /* U8 */, [], [], 'continue execution from address taken from a local variable #index (the asymmetry with jsr is intentional)'),
    new OpcodeInfo(170 /* tableswitch */, 10 /* TableSwitch */, ['index'], [], 'continue execution from an address in the table at offset index'),
    new OpcodeInfo(171 /* lookupswitch */, 11 /* LookupSwitch */, ['key'], [], 'a target address is looked up from a table using a key and execution continues from the instruction at that address'),
    new OpcodeInfo(172 /* ireturn */, 0 /* Void */, ['value'], null, 'return an integer from a method'),
    new OpcodeInfo(173 /* lreturn */, 0 /* Void */, ['value'], null, 'return a long value'),
    new OpcodeInfo(174 /* freturn */, 0 /* Void */, ['value'], null, 'return a float value'),
    new OpcodeInfo(175 /* dreturn */, 0 /* Void */, ['value'], null, 'return a double value'),
    new OpcodeInfo(176 /* areturn */, 0 /* Void */, ['objectref'], null, 'return a reference'),
    new OpcodeInfo(177 /* Return */, 0 /* Void */, [], null, 'return void from method'),
    new OpcodeInfo(178 /* getstatic */, 4 /* U16 */, [], ['value'], 'get a static field value of a class, where the field is identified by field reference in the constant pool index (index1 << 8 + index2)'),
    new OpcodeInfo(179 /* putstatic */, 4 /* U16 */, ['value'], [], 'set static field to value in a class, where the field is identified by a field reference index in constant pool (indexbyte1 << 8 + indexbyte2'),
    new OpcodeInfo(180 /* getfield */, 4 /* U16 */, ['objectref'], ['value'], 'get a field value of an object objectref, where the field is identified by field reference in the constant pool index (index1 << 8 + index2)'),
    new OpcodeInfo(181 /* putfield */, 4 /* U16 */, ['objectref', 'value'], [], 'set field to value in an object objectref, where the field is identified by a field reference index in constant pool (indexbyte1 << 8 + indexbyte2)'),
    new OpcodeInfo(182 /* invokevirtual */, 4 /* U16 */, null, null, 'invoke virtual method on object objectref, where the method is identified by method reference index in constant pool (indexbyte1 << 8 + indexbyte2)'),
    new OpcodeInfo(183 /* invokespecial */, 4 /* U16 */, null, null, 'invoke instance method on object objectref, where the method is identified by method reference index in constant pool (indexbyte1 << 8 + indexbyte2)'),
    new OpcodeInfo(184 /* invokestatic */, 4 /* U16 */, null, null, 'invoke a static method, where the method is identified by method reference index in constant pool (indexbyte1 << 8 + indexbyte2)'),
    new OpcodeInfo(185 /* invokeinterface */, 4 /* U16 */, null, null, 'invokes an interface method on object objectref, where the interface method is identified by method reference index in constant pool (indexbyte1 << 8 + indexbyte2)'),
    new OpcodeInfo(186 /* invokedynamic */, 4 /* U16 */, null, null, 'invokes a dynamic method identified by method reference index in constant pool (indexbyte1 << 8 + indexbyte2)'),
    new OpcodeInfo(187 /* new */, 4 /* U16 */, [], ['objectref'], 'create new object of type identified by class reference in constant pool index (indexbyte1 << 8 + indexbyte2)'),
    new OpcodeInfo(188 /* newarray */, 2 /* U8 */, ['count'], ['arrayref'], 'create new array with count elements of primitive type identified by atype'),
    new OpcodeInfo(189 /* anewarray */, 4 /* U16 */, ['count'], ['arrayref'], 'create a new array of references of length count and component type identified by the class reference index (indexbyte1 << 8 + indexbyte2) in the constant pool'),
    new OpcodeInfo(190 /* arraylength */, 0 /* Void */, ['arrayref'], ['length'], 'get the length of an array'),
    new OpcodeInfo(191 /* athrow */, 0 /* Void */, ['objectref'], null, 'throws an error or exception (notice that the rest of the stack is cleared, leaving only a reference to the Throwable)'),
    new OpcodeInfo(192 /* checkcast */, 4 /* U16 */, ['objectref'], ['objectref'], 'checks whether an objectref is of a certain type, the class reference of which is in the constant pool at index (indexbyte1 << 8 + indexbyte2)'),
    new OpcodeInfo(193 /* instanceof */, 4 /* U16 */, ['objectref'], ['result'], 'determines if an object objectref is of a given type, identified by class reference index in constant pool (indexbyte1 << 8 + indexbyte2)'),
    new OpcodeInfo(194 /* monitorenter */, 0 /* Void */, ['objectref'], [], 'enter monitor for object ("grab the lock" - start of synchronized() section)'),
    new OpcodeInfo(195 /* monitorexit */, 0 /* Void */, ['objectref'], [], 'exit monitor for object ("release the lock" - end of synchronized() section)'),
    new OpcodeInfo(196 /* wide */, 1 /* Special */, null, null, 'execute opcode, where opcode is either iload, fload, aload, lload, dload, istore, fstore, astore, lstore, dstore, or ret, but assume the index is 16 bit; or execute iinc, where the index is 16 bits and the constant to increment by is a signed 16 bit short'),
    new OpcodeInfo(197 /* multianewarray */, 9 /* U16_U8 */, null, ['arrayref'], 'create a new array of dimensions dimensions with elements of type identified by class reference in constant pool index (indexbyte1 << 8 + indexbyte2); the sizes of each dimension is identified by count1, [count2, etc.]'),
    new OpcodeInfo(198 /* ifnull */, 5 /* S16 */, ['value'], [], 'if value is null, branch to instruction at branchoffset (signed short constructed from unsigned bytes branchbyte1 << 8 + branchbyte2)'),
    new OpcodeInfo(199 /* ifnonnull */, 5 /* S16 */, ['value'], [], 'if value is not null, branch to instruction at branchoffset (signed short constructed from unsigned bytes branchbyte1 << 8 + branchbyte2)'),
    new OpcodeInfo(200 /* goto_w */, 7 /* S32 */, [], [], 'goes to another instruction at branchoffset (signed int constructed from unsigned bytes branchbyte1 << 24 + branchbyte2 << 16 + branchbyte3 << 8 + branchbyte4)'),
    new OpcodeInfo(201 /* jsr_w */, 7 /* S32 */, [], [], 'jump to subroutine at branchoffset (signed int constructed from unsigned bytes branchbyte1 << 24 + branchbyte2 << 16 + branchbyte3 << 8 + branchbyte4) and place the return address on the stack'),
    new OpcodeInfo(202 /* breakpoint */, 0 /* Void */, [], [], 'reserved for breakpoints in Java debuggers; should not appear in any class file'),
    new OpcodeInfo(254 /* impdep1 */, 0 /* Void */, [], [], 'reserved for implementation-dependent operations within debuggers; should not appear in any class file'),
    new OpcodeInfo(255 /* impdep2 */, 0 /* Void */, [], [], 'reserved for implementation-dependent operations within debuggers; should not appear in any class file')
];

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
    InstructionReader.read = function (code) {
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
        var methodType = JavaTypeMethod.demangle(this.methodTypeStr);

        //console.log('JavaMethod.parse() -> ', this.name, this.methodTypeStr, methodType.mangled);
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

                //console.log('max_stack_locals', max_stack, max_locals);
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
                return new JavaTypeObject(out);
            case 'V':
                return new JavaTypeVoid();
            case 'I':
                return new JavaTypeInteger();
            case 'J':
                return new JavaTypeLong();
            case 'F':
                return new JavaTypeFloat();
            case 'B':
                return new JavaTypeByte();
            case 'Z':
                return new JavaTypeBoolean();
            case 'S':
                return new JavaTypeShort();
            case 'C':
                return new JavaTypeCharacter();
            case 'D':
                return new JavaTypeDouble();
            case 'F':
                return new JavaTypeFloat();
            case '[':
                return new JavaTypeArray(JavaType._demangle(data));
            case ')':
                return null;

            default:
                throw (new Error("Unknown type " + type));
        }
    };
    return JavaType;
})();

var JavaTypeRef = (function (_super) {
    __extends(JavaTypeRef, _super);
    function JavaTypeRef() {
        _super.apply(this, arguments);
        this.mangled = "";
    }
    return JavaTypeRef;
})(JavaType);
var JavaTypeVoid = (function (_super) {
    __extends(JavaTypeVoid, _super);
    function JavaTypeVoid() {
        _super.apply(this, arguments);
        this.mangled = "V";
    }
    return JavaTypeVoid;
})(JavaType);
var JavaTypeBoolean = (function (_super) {
    __extends(JavaTypeBoolean, _super);
    function JavaTypeBoolean() {
        _super.apply(this, arguments);
        this.mangled = "Z";
    }
    return JavaTypeBoolean;
})(JavaType);
var JavaTypeByte = (function (_super) {
    __extends(JavaTypeByte, _super);
    function JavaTypeByte() {
        _super.apply(this, arguments);
        this.mangled = "B";
    }
    return JavaTypeByte;
})(JavaType);
var JavaTypeShort = (function (_super) {
    __extends(JavaTypeShort, _super);
    function JavaTypeShort() {
        _super.apply(this, arguments);
        this.mangled = "S";
    }
    return JavaTypeShort;
})(JavaType);
var JavaTypeCharacter = (function (_super) {
    __extends(JavaTypeCharacter, _super);
    function JavaTypeCharacter() {
        _super.apply(this, arguments);
        this.mangled = "C";
        this.boxed_name = 'Ljava/lang/Character;';
    }
    return JavaTypeCharacter;
})(JavaType);
var JavaTypeInteger = (function (_super) {
    __extends(JavaTypeInteger, _super);
    function JavaTypeInteger() {
        _super.apply(this, arguments);
        this.mangled = "I";
    }
    return JavaTypeInteger;
})(JavaType);
var JavaTypeObject = (function (_super) {
    __extends(JavaTypeObject, _super);
    function JavaTypeObject(type) {
        _super.call(this);
        this.type = type;
        this.mangled = 'T' + type + ';';
    }
    return JavaTypeObject;
})(JavaType);
var JavaTypeFloat = (function (_super) {
    __extends(JavaTypeFloat, _super);
    function JavaTypeFloat() {
        _super.apply(this, arguments);
        this.mangled = "F";
    }
    return JavaTypeFloat;
})(JavaType);
var JavaTypeDouble = (function (_super) {
    __extends(JavaTypeDouble, _super);
    function JavaTypeDouble() {
        _super.apply(this, arguments);
        this.mangled = "D";
    }
    return JavaTypeDouble;
})(JavaType);
var JavaTypeLong = (function (_super) {
    __extends(JavaTypeLong, _super);
    function JavaTypeLong() {
        _super.apply(this, arguments);
        this.mangled = "J";
    }
    return JavaTypeLong;
})(JavaType);
var JavaTypeArray = (function (_super) {
    __extends(JavaTypeArray, _super);
    function JavaTypeArray(type) {
        _super.call(this);
        this.type = type;
        this.mangled = '[' + type.mangled;
    }
    return JavaTypeArray;
})(JavaType);

var JavaTypeMethod = (function (_super) {
    __extends(JavaTypeMethod, _super);
    function JavaTypeMethod() {
        _super.apply(this, arguments);
        this.arguments = [];
        this.mangled = "";
    }
    JavaTypeMethod.demangle = function (data) {
        return JavaTypeMethod._demangle(new StringReader(data));
    };
    JavaTypeMethod._demangle = function (str) {
        var methodType = new JavaTypeMethod();
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
    return JavaTypeMethod;
})(JavaType);

var Dynarec = (function () {
    function Dynarec() {
    }
    Dynarec.getFunctionCode = function (pool, methodName, methodType, max_stack, max_locals, is_static, instructions) {
        var dynarec = new Dynarec1(pool, methodName, methodType, max_stack, max_locals, is_static);
        dynarec.process(instructions);
        var func;

        try  {
            func = Function.apply(null, range(methodType.arguments.length).map(function (index) {
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
                return processor._load(new JavaTypeRef, op - 42 /* aload_0 */);
            case 26 /* iload_0 */:
            case 27 /* iload_1 */:
            case 28 /* iload_2 */:
            case 29 /* iload_3 */:
                return processor._load(new JavaTypeInteger, op - 26 /* iload_0 */);
            case 30 /* lload_0 */:
            case 31 /* lload_1 */:
            case 32 /* lload_2 */:
            case 33 /* lload_3 */:
                return processor._load(new JavaTypeLong, op - 30 /* lload_0 */);
            case 34 /* fload_0 */:
            case 35 /* fload_1 */:
            case 36 /* fload_2 */:
            case 37 /* fload_3 */:
                return processor._load(new JavaTypeFloat, op - 34 /* fload_0 */);
            case 38 /* dload_0 */:
            case 39 /* dload_1 */:
            case 40 /* dload_2 */:
            case 41 /* dload_3 */:
                return processor._load(new JavaTypeDouble, op - 38 /* dload_0 */);

            case 25 /* aload */:
                return processor._load(new JavaTypeRef, param);
            case 21 /* iload */:
                return processor._load(new JavaTypeInteger, param);
            case 22 /* lload */:
                return processor._load(new JavaTypeLong, param);
            case 23 /* fload */:
                return processor._load(new JavaTypeFloat, param);
            case 24 /* dload */:
                return processor._load(new JavaTypeDouble, param);

            case 50 /* aaload */:
                return processor.aaload();
            case 83 /* aastore */:
                return processor.aastore();

            case 75 /* astore_0 */:
            case 76 /* astore_1 */:
            case 77 /* astore_2 */:
            case 78 /* astore_3 */:
                return processor._store(new JavaTypeRef, op - 75 /* astore_0 */);
            case 59 /* istore_0 */:
            case 60 /* istore_1 */:
            case 61 /* istore_2 */:
            case 62 /* istore_3 */:
                return processor._store(new JavaTypeInteger, op - 59 /* istore_0 */);
            case 63 /* lstore_0 */:
            case 64 /* lstore_1 */:
            case 65 /* lstore_2 */:
            case 66 /* lstore_3 */:
                return processor._store(new JavaTypeLong, op - 63 /* lstore_0 */);
            case 67 /* fstore_0 */:
            case 68 /* fstore_1 */:
            case 69 /* fstore_2 */:
            case 70 /* fstore_3 */:
                return processor._store(new JavaTypeFloat, op - 67 /* fstore_0 */);
            case 71 /* dstore_0 */:
            case 72 /* dstore_1 */:
            case 73 /* dstore_2 */:
            case 74 /* dstore_3 */:
                return processor._store(new JavaTypeDouble, op - 71 /* dstore_0 */);

            case 58 /* astore */:
                return processor._store(new JavaTypeRef, param);
            case 54 /* istore */:
                return processor._store(new JavaTypeInteger, param);
            case 55 /* lstore */:
                return processor._store(new JavaTypeLong, param);
            case 56 /* fstore */:
                return processor._store(new JavaTypeFloat, param);
            case 57 /* dstore */:
                return processor._store(new JavaTypeDouble, param);

            case 2 /* iconst_m1 */:
            case 3 /* iconst_0 */:
            case 4 /* iconst_1 */:
            case 5 /* iconst_2 */:
            case 6 /* iconst_3 */:
            case 7 /* iconst_4 */:
            case 8 /* iconst_5 */:
                return processor._const(new JavaTypeInteger, op - 3 /* iconst_0 */);
            case 9 /* lconst_0 */:
            case 10 /* lconst_1 */:
                return processor._const(new JavaTypeLong, op - 3 /* iconst_0 */);
            case 17 /* sipush */:
                return processor._const(new JavaTypeShort, param);
            case 16 /* bipush */:
                return processor._const(new JavaTypeByte, param);

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
                return processor._return(new JavaTypeVoid);
            case 172 /* ireturn */:
                return processor._return(new JavaTypeInteger);
            case 174 /* freturn */:
                return processor._return(new JavaTypeFloat);
            case 175 /* dreturn */:
                return processor._return(new JavaTypeDouble);
            case 173 /* lreturn */:
                return processor._return(new JavaTypeLong);

            case 132 /* iinc */:
                return processor.iinc(param, param2);

            case 96 /* iadd */:
                return processor._binop(new JavaTypeInteger, '+');
            case 100 /* isub */:
                return processor._binop(new JavaTypeInteger, '-');
            case 126 /* iand */:
                return processor._binop(new JavaTypeInteger, '&');
            case 120 /* ishl */:
                return processor._binop(new JavaTypeInteger, '<<');
            case 122 /* ishr */:
                return processor._binop(new JavaTypeInteger, '>>');
            case 124 /* iushr */:
                return processor._binop(new JavaTypeInteger, '>>>');

            case 97 /* ladd */:
                return processor._binop(new JavaTypeLong, '+');
            case 101 /* lsub */:
                return processor._binop(new JavaTypeLong, '+');
            case 127 /* land */:
                return processor._binop(new JavaTypeLong, '&');
            case 121 /* lshl */:
                return processor._binop(new JavaTypeLong, '<<');
            case 123 /* lshr */:
                return processor._binop(new JavaTypeLong, '>>');
            case 125 /* lushr */:
                return processor._binop(new JavaTypeLong, '>>>');

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
                return processor.convert(new JavaTypeInteger, new JavaTypeByte);
            case 146 /* i2c */:
                return processor.convert(new JavaTypeInteger, new JavaTypeCharacter);
            case 135 /* i2d */:
                return processor.convert(new JavaTypeInteger, new JavaTypeDouble);
            case 134 /* i2f */:
                return processor.convert(new JavaTypeInteger, new JavaTypeFloat);
            case 133 /* i2l */:
                return processor.convert(new JavaTypeInteger, new JavaTypeLong);
            case 147 /* i2s */:
                return processor.convert(new JavaTypeInteger, new JavaTypeShort);
            case 138 /* l2d */:
                return processor.convert(new JavaTypeLong, new JavaTypeDouble);
            case 137 /* l2f */:
                return processor.convert(new JavaTypeLong, new JavaTypeFloat);
            case 136 /* l2i */:
                return processor.convert(new JavaTypeLong, new JavaTypeInteger);

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
        if (type instanceof JavaTypeRef) {
            this.writeSentence('stack.push(' + this.getref(index) + '); // aload');
        } else {
            this.writeSentence('stack.push(' + this.getref(index) + '.value); // _load');
        }
    };
    Dynarec0.prototype._return = function (type) {
        if (type instanceof JavaTypeVoid) {
            this.writeSentence('return;');
        } else {
            this.writeSentence('return stack.pop(); // _return');
        }
    };

    Dynarec0.prototype.invoke = function (invokeType, methodInfo) {
        var className = methodInfo.className(this.pool);
        var name = methodInfo.name(this.pool);
        var type = methodInfo.type(this.pool);
        var demangledType = JavaTypeMethod.demangle(methodInfo.type(this.pool));
        var argCount = demangledType.arguments.length;

        //if (invoketype == 'static') argCount++;
        if (demangledType.rettype instanceof JavaTypeVoid) {
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
        if (type instanceof JavaTypeInteger) {
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
        if (type instanceof JavaTypeRef) {
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
        if (type instanceof JavaTypeVoid) {
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
        var demangledType = JavaTypeMethod.demangle(methodInfo.type(this.pool));
        var argCount = demangledType.arguments.length;
        var args = [];

        for (var n = 0; n < argCount; n++) {
            args.push(this.stack.pop());
        }

        var call = new NodeCall(name, args);

        if (demangledType.rettype instanceof JavaTypeVoid) {
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
