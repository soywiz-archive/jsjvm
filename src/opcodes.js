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

(function (OpcodeType) {
    OpcodeType[OpcodeType["Normal"] = 0] = "Normal";
    OpcodeType[OpcodeType["Jump"] = 1] = "Jump";
    OpcodeType[OpcodeType["Return"] = 2] = "Return";
})(exports.OpcodeType || (exports.OpcodeType = {}));
var OpcodeType = exports.OpcodeType;

var OpcodeInfo = (function () {
    function OpcodeInfo(opcode, type, param, stackPop, stackPush, description) {
        this.opcode = opcode;
        this.type = type;
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

exports.opcodeInfoList = [
    new OpcodeInfo(0 /* nop */, 0 /* Normal */, 0 /* Void */, [], [], 'perform no operation'),
    new OpcodeInfo(1 /* aconst_null */, 0 /* Normal */, 0 /* Void */, [], ['null'], 'push a null reference onto the stack'),
    new OpcodeInfo(2 /* iconst_m1 */, 0 /* Normal */, 0 /* Void */, [], ['-1'], 'load the int value -1 onto the stack'),
    new OpcodeInfo(3 /* iconst_0 */, 0 /* Normal */, 0 /* Void */, [], ['0'], 'load the int value 0 onto the stack'),
    new OpcodeInfo(4 /* iconst_1 */, 0 /* Normal */, 0 /* Void */, [], ['1'], 'load the int value 1 onto the stack'),
    new OpcodeInfo(5 /* iconst_2 */, 0 /* Normal */, 0 /* Void */, [], ['2'], 'load the int value 2 onto the stack'),
    new OpcodeInfo(6 /* iconst_3 */, 0 /* Normal */, 0 /* Void */, [], ['3'], 'load the int value 3 onto the stack'),
    new OpcodeInfo(7 /* iconst_4 */, 0 /* Normal */, 0 /* Void */, [], ['4'], 'load the int value 4 onto the stack'),
    new OpcodeInfo(8 /* iconst_5 */, 0 /* Normal */, 0 /* Void */, [], ['5'], 'load the int value 5 onto the stack'),
    new OpcodeInfo(9 /* lconst_0 */, 0 /* Normal */, 0 /* Void */, [], ['0L'], 'push the long 0 onto the stack'),
    new OpcodeInfo(10 /* lconst_1 */, 0 /* Normal */, 0 /* Void */, [], ['1L'], 'push the long 1 onto the stack'),
    new OpcodeInfo(11 /* fconst_0 */, 0 /* Normal */, 0 /* Void */, [], ['0.0f'], 'push 0.0f on the stack'),
    new OpcodeInfo(12 /* fconst_1 */, 0 /* Normal */, 0 /* Void */, [], ['1.0f'], 'push 1.0f on the stack'),
    new OpcodeInfo(13 /* fconst_2 */, 0 /* Normal */, 0 /* Void */, [], ['2.0f'], 'push 2.0f on the stack'),
    new OpcodeInfo(14 /* dconst_0 */, 0 /* Normal */, 0 /* Void */, [], ['0.0'], 'push the constant 0.0 onto the stack'),
    new OpcodeInfo(15 /* dconst_1 */, 0 /* Normal */, 0 /* Void */, [], ['1.0'], 'push the constant 1.0 onto the stack'),
    new OpcodeInfo(16 /* bipush */, 0 /* Normal */, 3 /* S8 */, [], ['value'], 'push a byte onto the stack as an integer value'),
    new OpcodeInfo(17 /* sipush */, 0 /* Normal */, 5 /* S16 */, [], ['value'], 'push a short onto the stack'),
    new OpcodeInfo(18 /* ldc */, 0 /* Normal */, 2 /* U8 */, [], ['value'], 'push a constant #index from a constant pool (String, int or float) onto the stack'),
    new OpcodeInfo(19 /* ldc_w */, 0 /* Normal */, 4 /* U16 */, [], ['value'], 'push a constant #index from a constant pool (String, int or float) onto the stack (wide index is constructed as indexbyte1 << 8 + indexbyte2)'),
    new OpcodeInfo(20 /* ldc2_w */, 0 /* Normal */, 4 /* U16 */, [], ['value'], 'push a constant #index from a constant pool (double or long) onto the stack (wide index is constructed as indexbyte1 << 8 + indexbyte2)'),
    new OpcodeInfo(21 /* iload */, 0 /* Normal */, 2 /* U8 */, [], ['value'], 'load an int value from a local variable #index'),
    new OpcodeInfo(22 /* lload */, 0 /* Normal */, 2 /* U8 */, [], ['value'], 'load a long value from a local variable #index'),
    new OpcodeInfo(23 /* fload */, 0 /* Normal */, 2 /* U8 */, [], ['value'], 'load a float value from a local variable #index'),
    new OpcodeInfo(24 /* dload */, 0 /* Normal */, 2 /* U8 */, [], ['value'], 'load a double value from a local variable #index'),
    new OpcodeInfo(25 /* aload */, 0 /* Normal */, 2 /* U8 */, [], ['objectref'], 'load a reference onto the stack from a local variable #index'),
    new OpcodeInfo(26 /* iload_0 */, 0 /* Normal */, 0 /* Void */, [], ['value'], 'load an int value from local variable 0'),
    new OpcodeInfo(27 /* iload_1 */, 0 /* Normal */, 0 /* Void */, [], ['value'], 'load an int value from local variable 1'),
    new OpcodeInfo(28 /* iload_2 */, 0 /* Normal */, 0 /* Void */, [], ['value'], 'load an int value from local variable 2'),
    new OpcodeInfo(29 /* iload_3 */, 0 /* Normal */, 0 /* Void */, [], ['value'], 'load an int value from local variable 3'),
    new OpcodeInfo(30 /* lload_0 */, 0 /* Normal */, 0 /* Void */, [], ['value'], 'load a long value from local variable 0'),
    new OpcodeInfo(31 /* lload_1 */, 0 /* Normal */, 0 /* Void */, [], ['value'], 'load a long value from local variable 1'),
    new OpcodeInfo(32 /* lload_2 */, 0 /* Normal */, 0 /* Void */, [], ['value'], 'load a long value from local variable 2'),
    new OpcodeInfo(33 /* lload_3 */, 0 /* Normal */, 0 /* Void */, [], ['value'], 'load a long value from local variable 3'),
    new OpcodeInfo(34 /* fload_0 */, 0 /* Normal */, 0 /* Void */, [], ['value'], 'load a float value from local variable 0'),
    new OpcodeInfo(35 /* fload_1 */, 0 /* Normal */, 0 /* Void */, [], ['value'], 'load a float value from local variable 1'),
    new OpcodeInfo(36 /* fload_2 */, 0 /* Normal */, 0 /* Void */, [], ['value'], 'load a float value from local variable 2'),
    new OpcodeInfo(37 /* fload_3 */, 0 /* Normal */, 0 /* Void */, [], ['value'], 'load a float value from local variable 3'),
    new OpcodeInfo(38 /* dload_0 */, 0 /* Normal */, 0 /* Void */, [], ['value'], 'load a double value from local variable 0'),
    new OpcodeInfo(39 /* dload_1 */, 0 /* Normal */, 0 /* Void */, [], ['value'], 'load a double value from local variable 1'),
    new OpcodeInfo(40 /* dload_2 */, 0 /* Normal */, 0 /* Void */, [], ['value'], 'load a double value from local variable 2'),
    new OpcodeInfo(41 /* dload_3 */, 0 /* Normal */, 0 /* Void */, [], ['value'], 'load a double value from local variable 3'),
    new OpcodeInfo(42 /* aload_0 */, 0 /* Normal */, 0 /* Void */, [], ['objectref'], 'load a reference onto the stack from local variable 0'),
    new OpcodeInfo(43 /* aload_1 */, 0 /* Normal */, 0 /* Void */, [], ['objectref'], 'load a reference onto the stack from local variable 1'),
    new OpcodeInfo(44 /* aload_2 */, 0 /* Normal */, 0 /* Void */, [], ['objectref'], 'load a reference onto the stack from local variable 2'),
    new OpcodeInfo(45 /* aload_3 */, 0 /* Normal */, 0 /* Void */, [], ['objectref'], 'load a reference onto the stack from local variable 3'),
    new OpcodeInfo(46 /* iaload */, 0 /* Normal */, 0 /* Void */, ['arrayref', 'index'], ['value'], 'load an int from an array'),
    new OpcodeInfo(47 /* laload */, 0 /* Normal */, 0 /* Void */, ['arrayref', 'index'], ['value'], 'load a long from an array'),
    new OpcodeInfo(48 /* faload */, 0 /* Normal */, 0 /* Void */, ['arrayref', 'index'], ['value'], 'load a float from an array'),
    new OpcodeInfo(49 /* daload */, 0 /* Normal */, 0 /* Void */, ['arrayref', 'index'], ['value'], 'load a double from an array'),
    new OpcodeInfo(50 /* aaload */, 0 /* Normal */, 0 /* Void */, ['arrayref', 'index'], ['objectref'], 'load onto the stack a reference from an array'),
    new OpcodeInfo(51 /* baload */, 0 /* Normal */, 0 /* Void */, ['arrayref', 'index'], ['value'], 'load a byte or Boolean value from an array'),
    new OpcodeInfo(52 /* caload */, 0 /* Normal */, 0 /* Void */, ['arrayref', 'index'], ['value'], 'load a char from an array'),
    new OpcodeInfo(53 /* saload */, 0 /* Normal */, 0 /* Void */, ['arrayref', 'index'], ['value'], 'load short from array'),
    new OpcodeInfo(54 /* istore */, 0 /* Normal */, 2 /* U8 */, ['value'], [''], 'store int value into variable #index'),
    new OpcodeInfo(55 /* lstore */, 0 /* Normal */, 2 /* U8 */, ['value'], [''], 'store a long value in a local variable #index'),
    new OpcodeInfo(56 /* fstore */, 0 /* Normal */, 2 /* U8 */, ['value'], [''], 'store a float value in a local variable #index'),
    new OpcodeInfo(57 /* dstore */, 0 /* Normal */, 2 /* U8 */, ['value'], [''], 'store a double value in a local variable #index'),
    new OpcodeInfo(58 /* astore */, 0 /* Normal */, 2 /* U8 */, ['objectref'], [''], 'store a reference in a local variable #index'),
    new OpcodeInfo(59 /* istore_0 */, 0 /* Normal */, 0 /* Void */, ['value'], [''], 'store int value into variable 0'),
    new OpcodeInfo(60 /* istore_1 */, 0 /* Normal */, 0 /* Void */, ['value'], [''], 'store int value into variable 1'),
    new OpcodeInfo(61 /* istore_2 */, 0 /* Normal */, 0 /* Void */, ['value'], [''], 'store int value into variable 2'),
    new OpcodeInfo(62 /* istore_3 */, 0 /* Normal */, 0 /* Void */, ['value'], [''], 'store int value into variable 3'),
    new OpcodeInfo(63 /* lstore_0 */, 0 /* Normal */, 0 /* Void */, ['value'], [''], 'store long value into variable 0'),
    new OpcodeInfo(64 /* lstore_1 */, 0 /* Normal */, 0 /* Void */, ['value'], [''], 'store long value into variable 1'),
    new OpcodeInfo(65 /* lstore_2 */, 0 /* Normal */, 0 /* Void */, ['value'], [''], 'store long value into variable 2'),
    new OpcodeInfo(66 /* lstore_3 */, 0 /* Normal */, 0 /* Void */, ['value'], [''], 'store long value into variable 3'),
    new OpcodeInfo(67 /* fstore_0 */, 0 /* Normal */, 0 /* Void */, ['value'], [''], 'store float value into variable 0'),
    new OpcodeInfo(68 /* fstore_1 */, 0 /* Normal */, 0 /* Void */, ['value'], [''], 'store float value into variable 1'),
    new OpcodeInfo(69 /* fstore_2 */, 0 /* Normal */, 0 /* Void */, ['value'], [''], 'store float value into variable 2'),
    new OpcodeInfo(70 /* fstore_3 */, 0 /* Normal */, 0 /* Void */, ['value'], [''], 'store float value into variable 3'),
    new OpcodeInfo(71 /* dstore_0 */, 0 /* Normal */, 0 /* Void */, ['value'], [''], 'store double value into variable 0'),
    new OpcodeInfo(72 /* dstore_1 */, 0 /* Normal */, 0 /* Void */, ['value'], [''], 'store double value into variable 1'),
    new OpcodeInfo(73 /* dstore_2 */, 0 /* Normal */, 0 /* Void */, ['value'], [''], 'store double value into variable 2'),
    new OpcodeInfo(74 /* dstore_3 */, 0 /* Normal */, 0 /* Void */, ['value'], [''], 'store double value into variable 3'),
    new OpcodeInfo(75 /* astore_0 */, 0 /* Normal */, 0 /* Void */, ['objectref'], [''], 'store reference into variable 0'),
    new OpcodeInfo(76 /* astore_1 */, 0 /* Normal */, 0 /* Void */, ['objectref'], [''], 'store reference into variable 1'),
    new OpcodeInfo(77 /* astore_2 */, 0 /* Normal */, 0 /* Void */, ['objectref'], [''], 'store reference into variable 2'),
    new OpcodeInfo(78 /* astore_3 */, 0 /* Normal */, 0 /* Void */, ['objectref'], [''], 'store reference into variable 3'),
    new OpcodeInfo(79 /* iastore */, 0 /* Normal */, 0 /* Void */, ['arrayref', 'index', 'value'], [''], 'store an int into an array'),
    new OpcodeInfo(80 /* lastore */, 0 /* Normal */, 0 /* Void */, ['arrayref', 'index', 'value'], [''], 'store a long into an array'),
    new OpcodeInfo(81 /* fastore */, 0 /* Normal */, 0 /* Void */, ['arrayref', 'index', 'value'], [''], 'store a float into an array'),
    new OpcodeInfo(82 /* dastore */, 0 /* Normal */, 0 /* Void */, ['arrayref', 'index', 'value'], [''], 'store a double into an array'),
    new OpcodeInfo(83 /* aastore */, 0 /* Normal */, 0 /* Void */, ['arrayref', 'index', 'value'], [''], 'store a reference in an array'),
    new OpcodeInfo(84 /* bastore */, 0 /* Normal */, 0 /* Void */, ['arrayref', 'index', 'value'], [''], 'store a byte or Boolean value into an array'),
    new OpcodeInfo(85 /* castore */, 0 /* Normal */, 0 /* Void */, ['arrayref', 'index', 'value'], [''], 'store a char value into an array'),
    new OpcodeInfo(86 /* sastore */, 0 /* Normal */, 0 /* Void */, ['arrayref', 'index', 'value'], [''], 'store a short value into an array'),
    new OpcodeInfo(87 /* pop */, 0 /* Normal */, 0 /* Void */, ['value'], [''], 'discard the top value on the stack'),
    new OpcodeInfo(88 /* pop2 */, 0 /* Normal */, 0 /* Void */, ['value2', 'value1'], [''], 'discard the top two values on the stack (or one value, if it is a double or long)'),
    new OpcodeInfo(89 /* dup */, 0 /* Normal */, 0 /* Void */, ['value'], ['value', 'value'], 'duplicate the value on top of the stack'),
    new OpcodeInfo(90 /* dup_x1 */, 0 /* Normal */, 0 /* Void */, ['value2', 'value1'], ['value1', 'value2', 'value1'], 'insert a copy of the top value into the stack two values from the top. value1 and value2 must not be of the type double or long.'),
    new OpcodeInfo(91 /* dup_x2 */, 0 /* Normal */, 0 /* Void */, ['value3', 'value2', 'value1'], ['value1', 'value3', 'value2', 'value1'], 'insert a copy of the top value into the stack two values from the top. value1 and value2 must not be of the type double or long.'),
    new OpcodeInfo(92 /* dup2 */, 0 /* Normal */, 0 /* Void */, ['value2', 'value1'], ['value2', 'value1', 'value2', 'value1'], 'duplicate top two stack words (two values, if value1 is not double nor long; a single value, if value1 is double or long)'),
    new OpcodeInfo(93 /* dup2_x1 */, 0 /* Normal */, 0 /* Void */, ['value3', 'value2', 'value1'], ['value2', 'value1', 'value3', 'value2', 'value1'], 'duplicate two words and insert beneath third word (see explanation above)'),
    new OpcodeInfo(94 /* dup2_x2 */, 0 /* Normal */, 0 /* Void */, ['value4', 'value3', 'value2', 'value1'], ['value2', 'value1', 'value4', 'value3', 'value2', 'value1'], 'duplicate two words and insert beneath fourth word'),
    new OpcodeInfo(95 /* swap */, 0 /* Normal */, 0 /* Void */, ['value2', 'value1'], ['value1', 'value2'], 'swaps two top words on the stack (note that value1 and value2 must not be double or long)'),
    new OpcodeInfo(96 /* iadd */, 0 /* Normal */, 0 /* Void */, ['value1', 'value2'], ['result'], 'add two ints'),
    new OpcodeInfo(97 /* ladd */, 0 /* Normal */, 0 /* Void */, ['value1', 'value2'], ['result'], 'add two longs'),
    new OpcodeInfo(98 /* fadd */, 0 /* Normal */, 0 /* Void */, ['value1', 'value2'], ['result'], 'add two floats'),
    new OpcodeInfo(99 /* dadd */, 0 /* Normal */, 0 /* Void */, ['value1', 'value2'], ['result'], 'add two doubles'),
    new OpcodeInfo(100 /* isub */, 0 /* Normal */, 0 /* Void */, ['value1', 'value2'], ['result'], 'subtract two ints'),
    new OpcodeInfo(101 /* lsub */, 0 /* Normal */, 0 /* Void */, ['value1', 'value2'], ['result'], 'subtract two longs'),
    new OpcodeInfo(102 /* fsub */, 0 /* Normal */, 0 /* Void */, ['value1', 'value2'], ['result'], 'subtract two floats'),
    new OpcodeInfo(103 /* dsub */, 0 /* Normal */, 0 /* Void */, ['value1', 'value2'], ['result'], 'subtract two doubles'),
    new OpcodeInfo(104 /* imul */, 0 /* Normal */, 0 /* Void */, ['value1', 'value2'], ['result'], 'multiply two ints'),
    new OpcodeInfo(105 /* lmul */, 0 /* Normal */, 0 /* Void */, ['value1', 'value2'], ['result'], 'multiply two longs'),
    new OpcodeInfo(106 /* fmul */, 0 /* Normal */, 0 /* Void */, ['value1', 'value2'], ['result'], 'multiply two floats'),
    new OpcodeInfo(107 /* dmul */, 0 /* Normal */, 0 /* Void */, ['value1', 'value2'], ['result'], 'multiply two doubles'),
    new OpcodeInfo(108 /* idiv */, 0 /* Normal */, 0 /* Void */, ['value1', 'value2'], ['result'], 'divide two ints'),
    new OpcodeInfo(109 /* ldiv */, 0 /* Normal */, 0 /* Void */, ['value1', 'value2'], ['result'], 'divide two longs'),
    new OpcodeInfo(110 /* fdiv */, 0 /* Normal */, 0 /* Void */, ['value1', 'value2'], ['result'], 'divide two floats'),
    new OpcodeInfo(111 /* ddiv */, 0 /* Normal */, 0 /* Void */, ['value1', 'value2'], ['result'], 'divide two doubles'),
    new OpcodeInfo(112 /* irem */, 0 /* Normal */, 0 /* Void */, ['value1', 'value2'], ['result'], 'remainder of two ints'),
    new OpcodeInfo(113 /* lrem */, 0 /* Normal */, 0 /* Void */, ['value1', 'value2'], ['result'], 'remainder of two longs'),
    new OpcodeInfo(114 /* frem */, 0 /* Normal */, 0 /* Void */, ['value1', 'value2'], ['result'], 'remainder of two floats'),
    new OpcodeInfo(115 /* drem */, 0 /* Normal */, 0 /* Void */, ['value1', 'value2'], ['result'], 'remainder of two doubles'),
    new OpcodeInfo(116 /* ineg */, 0 /* Normal */, 0 /* Void */, ['value'], ['result'], 'negate ints'),
    new OpcodeInfo(116 /* ineg */, 0 /* Normal */, 0 /* Void */, ['value'], ['result'], 'negate longs'),
    new OpcodeInfo(116 /* ineg */, 0 /* Normal */, 0 /* Void */, ['value'], ['result'], 'negate floats'),
    new OpcodeInfo(116 /* ineg */, 0 /* Normal */, 0 /* Void */, ['value'], ['result'], 'negate doubles'),
    new OpcodeInfo(120 /* ishl */, 0 /* Normal */, 0 /* Void */, ['value1', 'value2'], ['result'], 'int shift left'),
    new OpcodeInfo(121 /* lshl */, 0 /* Normal */, 0 /* Void */, ['value1', 'value2'], ['result'], 'bitwise shift left of a long value1 by int value2 positions'),
    new OpcodeInfo(122 /* ishr */, 0 /* Normal */, 0 /* Void */, ['value1', 'value2'], ['result'], 'int arithmetic shift right'),
    new OpcodeInfo(123 /* lshr */, 0 /* Normal */, 0 /* Void */, ['value1', 'value2'], ['result'], 'bitwise arithmetic shift right of a long value1 by int value2 positions'),
    new OpcodeInfo(124 /* iushr */, 0 /* Normal */, 0 /* Void */, ['value1', 'value2'], ['result'], 'int logical shift right'),
    new OpcodeInfo(125 /* lushr */, 0 /* Normal */, 0 /* Void */, ['value1', 'value2'], ['result'], 'bitwise logical shift right of a long value1 by int value2 positions'),
    new OpcodeInfo(126 /* iand */, 0 /* Normal */, 0 /* Void */, ['value1', 'value2'], ['result'], 'bitwise and of two ints'),
    new OpcodeInfo(127 /* land */, 0 /* Normal */, 0 /* Void */, ['value1', 'value2'], ['result'], 'bitwise and of two longs'),
    new OpcodeInfo(128 /* ior */, 0 /* Normal */, 0 /* Void */, ['value1', 'value2'], ['result'], 'bitwise or of two ints'),
    new OpcodeInfo(129 /* lor */, 0 /* Normal */, 0 /* Void */, ['value1', 'value2'], ['result'], 'bitwise or of two longs'),
    new OpcodeInfo(130 /* ixor */, 0 /* Normal */, 0 /* Void */, ['value1', 'value2'], ['result'], 'bitwise xor of two ints'),
    new OpcodeInfo(131 /* lxor */, 0 /* Normal */, 0 /* Void */, ['value1', 'value2'], ['result'], 'bitwise xor of two longs'),
    new OpcodeInfo(132 /* iinc */, 0 /* Normal */, 8 /* U8_S8 */, [], [], 'increment local variable #index by signed byte const'),
    new OpcodeInfo(133 /* i2l */, 0 /* Normal */, 0 /* Void */, ['value'], ['result'], 'convert an int into a long'),
    new OpcodeInfo(134 /* i2f */, 0 /* Normal */, 0 /* Void */, ['value'], ['result'], 'convert an int into a float'),
    new OpcodeInfo(135 /* i2d */, 0 /* Normal */, 0 /* Void */, ['value'], ['result'], 'convert an int into a double'),
    new OpcodeInfo(136 /* l2i */, 0 /* Normal */, 0 /* Void */, ['value'], ['result'], 'convert a long to a int'),
    new OpcodeInfo(137 /* l2f */, 0 /* Normal */, 0 /* Void */, ['value'], ['result'], 'convert a long to a float'),
    new OpcodeInfo(138 /* l2d */, 0 /* Normal */, 0 /* Void */, ['value'], ['result'], 'convert a long to a double'),
    new OpcodeInfo(139 /* f2i */, 0 /* Normal */, 0 /* Void */, ['value'], ['result'], 'convert a float to a int'),
    new OpcodeInfo(140 /* f2l */, 0 /* Normal */, 0 /* Void */, ['value'], ['result'], 'convert a float to a long'),
    new OpcodeInfo(141 /* f2d */, 0 /* Normal */, 0 /* Void */, ['value'], ['result'], 'convert a float to a double'),
    new OpcodeInfo(142 /* d2i */, 0 /* Normal */, 0 /* Void */, ['value'], ['result'], 'convert a double to a int'),
    new OpcodeInfo(143 /* d2l */, 0 /* Normal */, 0 /* Void */, ['value'], ['result'], 'convert a double to a long'),
    new OpcodeInfo(144 /* d2f */, 0 /* Normal */, 0 /* Void */, ['value'], ['result'], 'convert a double to a float'),
    new OpcodeInfo(145 /* i2b */, 0 /* Normal */, 0 /* Void */, ['value'], ['result'], 'convert an int into a byte'),
    new OpcodeInfo(146 /* i2c */, 0 /* Normal */, 0 /* Void */, ['value'], ['result'], 'convert an int into a character'),
    new OpcodeInfo(147 /* i2s */, 0 /* Normal */, 0 /* Void */, ['value'], ['result'], 'convert an int into a short'),
    new OpcodeInfo(148 /* lcmp */, 0 /* Normal */, 0 /* Void */, ['value1', 'value2'], ['result'], 'compare two longs values'),
    new OpcodeInfo(149 /* fcmpl */, 0 /* Normal */, 0 /* Void */, ['value1', 'value2'], ['result'], 'compare two floats less'),
    new OpcodeInfo(150 /* fcmpg */, 0 /* Normal */, 0 /* Void */, ['value1', 'value2'], ['result'], 'compare two floats greater'),
    new OpcodeInfo(151 /* dcmpl */, 0 /* Normal */, 0 /* Void */, ['value1', 'value2'], ['result'], 'compare two doubles less'),
    new OpcodeInfo(152 /* dcmpg */, 0 /* Normal */, 0 /* Void */, ['value1', 'value2'], ['result'], 'compare two doubles greater'),
    new OpcodeInfo(153 /* ifeq */, 1 /* Jump */, 5 /* S16 */, ['value'], [], 'if value is 0, branch to instruction at branchoffset (signed short constructed from unsigned bytes branchbyte1 << 8 + branchbyte2)'),
    new OpcodeInfo(154 /* ifne */, 1 /* Jump */, 5 /* S16 */, ['value'], [], 'if value is not 0, branch to instruction at branchoffset (signed short constructed from unsigned bytes branchbyte1 << 8 + branchbyte2)'),
    new OpcodeInfo(155 /* iflt */, 1 /* Jump */, 5 /* S16 */, ['value'], [], 'if value is less than 0, branch to instruction at branchoffset (signed short constructed from unsigned bytes branchbyte1 << 8 + branchbyte2)'),
    new OpcodeInfo(156 /* ifge */, 1 /* Jump */, 5 /* S16 */, ['value'], [], 'if value is greater than or equal to 0, branch to instruction at branchoffset (signed short constructed from unsigned bytes branchbyte1 << 8 + branchbyte2)'),
    new OpcodeInfo(157 /* ifgt */, 1 /* Jump */, 5 /* S16 */, ['value'], [], 'if value is greater than 0, branch to instruction at branchoffset (signed short constructed from unsigned bytes branchbyte1 << 8 + branchbyte2)'),
    new OpcodeInfo(158 /* ifle */, 1 /* Jump */, 5 /* S16 */, ['value'], [], 'if value is less than or equal to 0, branch to instruction at branchoffset (signed short constructed from unsigned bytes branchbyte1 << 8 + branchbyte2)'),
    new OpcodeInfo(159 /* if_icmpeq */, 1 /* Jump */, 5 /* S16 */, ['value1', 'value2'], [], 'if ints are equal, branch to instruction at branchoffset (signed short constructed from unsigned bytes branchbyte1 << 8 + branchbyte2)'),
    new OpcodeInfo(160 /* if_icmpne */, 1 /* Jump */, 5 /* S16 */, ['value1', 'value2'], [], 'ifif ints are not equal, branch to instruction at branchoffset (signed short constructed from unsigned bytes branchbyte1 << 8 + branchbyte2)'),
    new OpcodeInfo(161 /* if_icmplt */, 1 /* Jump */, 5 /* S16 */, ['value1', 'value2'], [], 'if value1 is less than value2, branch to instruction at branchoffset (signed short constructed from unsigned bytes branchbyte1 << 8 + branchbyte2)'),
    new OpcodeInfo(162 /* if_icmpge */, 1 /* Jump */, 5 /* S16 */, ['value1', 'value2'], [], 'if value1 is greater than or equal to value2, branch to instruction at branchoffset (signed short constructed from unsigned bytes branchbyte1 << 8 + branchbyte2)'),
    new OpcodeInfo(163 /* if_icmpgt */, 1 /* Jump */, 5 /* S16 */, ['value1', 'value2'], [], 'if value1 is greater than value2, branch to instruction at branchoffset (signed short constructed from unsigned bytes branchbyte1 << 8 + branchbyte2)'),
    new OpcodeInfo(164 /* if_icmple */, 1 /* Jump */, 5 /* S16 */, ['value1', 'value2'], [], 'if value1 is less than or equal to value2, branch to instruction at branchoffset (signed short constructed from unsigned bytes branchbyte1 << 8 + branchbyte2)'),
    new OpcodeInfo(165 /* if_acmpeq */, 1 /* Jump */, 5 /* S16 */, ['value1', 'value2'], [], 'if references are equal, branch to instruction at branchoffset (signed short constructed from unsigned bytes branchbyte1 << 8 + branchbyte2)'),
    new OpcodeInfo(166 /* if_acmpne */, 1 /* Jump */, 5 /* S16 */, ['value1', 'value2'], [], 'if references are not equal, branch to instruction at branchoffset (signed short constructed from unsigned bytes branchbyte1 << 8 + branchbyte2)'),
    new OpcodeInfo(167 /* goto */, 1 /* Jump */, 5 /* S16 */, [], [], 'goes to another instruction at branchoffset (signed short constructed from unsigned bytes branchbyte1 << 8 + branchbyte2)'),
    new OpcodeInfo(168 /* jsr */, 1 /* Jump */, 5 /* S16 */, [], ['address'], 'jump to subroutine at branchoffset (signed short constructed from unsigned bytes branchbyte1 << 8 + branchbyte2) and place the return address on the stack'),
    new OpcodeInfo(169 /* ret */, 2 /* Return */, 2 /* U8 */, [], [], 'continue execution from address taken from a local variable #index (the asymmetry with jsr is intentional)'),
    new OpcodeInfo(170 /* tableswitch */, 1 /* Jump */, 10 /* TableSwitch */, ['index'], [], 'continue execution from an address in the table at offset index'),
    new OpcodeInfo(171 /* lookupswitch */, 1 /* Jump */, 11 /* LookupSwitch */, ['key'], [], 'a target address is looked up from a table using a key and execution continues from the instruction at that address'),
    new OpcodeInfo(172 /* ireturn */, 2 /* Return */, 0 /* Void */, ['value'], [], 'return an integer from a method'),
    new OpcodeInfo(173 /* lreturn */, 2 /* Return */, 0 /* Void */, ['value'], [], 'return a long value'),
    new OpcodeInfo(174 /* freturn */, 2 /* Return */, 0 /* Void */, ['value'], [], 'return a float value'),
    new OpcodeInfo(175 /* dreturn */, 2 /* Return */, 0 /* Void */, ['value'], [], 'return a double value'),
    new OpcodeInfo(176 /* areturn */, 2 /* Return */, 0 /* Void */, ['objectref'], [], 'return a reference'),
    new OpcodeInfo(177 /* Return */, 2 /* Return */, 0 /* Void */, [], [], 'return void from method'),
    new OpcodeInfo(178 /* getstatic */, 0 /* Normal */, 4 /* U16 */, [], ['value'], 'get a static field value of a class, where the field is identified by field reference in the constant pool index (index1 << 8 + index2)'),
    new OpcodeInfo(179 /* putstatic */, 0 /* Normal */, 4 /* U16 */, ['value'], [], 'set static field to value in a class, where the field is identified by a field reference index in constant pool (indexbyte1 << 8 + indexbyte2'),
    new OpcodeInfo(180 /* getfield */, 0 /* Normal */, 4 /* U16 */, ['objectref'], ['value'], 'get a field value of an object objectref, where the field is identified by field reference in the constant pool index (index1 << 8 + index2)'),
    new OpcodeInfo(181 /* putfield */, 0 /* Normal */, 4 /* U16 */, ['objectref', 'value'], [], 'set field to value in an object objectref, where the field is identified by a field reference index in constant pool (indexbyte1 << 8 + indexbyte2)'),
    new OpcodeInfo(182 /* invokevirtual */, 0 /* Normal */, 4 /* U16 */, null, null, 'invoke virtual method on object objectref, where the method is identified by method reference index in constant pool (indexbyte1 << 8 + indexbyte2)'),
    new OpcodeInfo(183 /* invokespecial */, 0 /* Normal */, 4 /* U16 */, null, null, 'invoke instance method on object objectref, where the method is identified by method reference index in constant pool (indexbyte1 << 8 + indexbyte2)'),
    new OpcodeInfo(184 /* invokestatic */, 0 /* Normal */, 4 /* U16 */, null, null, 'invoke a static method, where the method is identified by method reference index in constant pool (indexbyte1 << 8 + indexbyte2)'),
    new OpcodeInfo(185 /* invokeinterface */, 0 /* Normal */, 4 /* U16 */, null, null, 'invokes an interface method on object objectref, where the interface method is identified by method reference index in constant pool (indexbyte1 << 8 + indexbyte2)'),
    new OpcodeInfo(186 /* invokedynamic */, 0 /* Normal */, 4 /* U16 */, null, null, 'invokes a dynamic method identified by method reference index in constant pool (indexbyte1 << 8 + indexbyte2)'),
    new OpcodeInfo(187 /* new */, 0 /* Normal */, 4 /* U16 */, [], ['objectref'], 'create new object of type identified by class reference in constant pool index (indexbyte1 << 8 + indexbyte2)'),
    new OpcodeInfo(188 /* newarray */, 0 /* Normal */, 2 /* U8 */, ['count'], ['arrayref'], 'create new array with count elements of primitive type identified by atype'),
    new OpcodeInfo(189 /* anewarray */, 0 /* Normal */, 4 /* U16 */, ['count'], ['arrayref'], 'create a new array of references of length count and component type identified by the class reference index (indexbyte1 << 8 + indexbyte2) in the constant pool'),
    new OpcodeInfo(190 /* arraylength */, 0 /* Normal */, 0 /* Void */, ['arrayref'], ['length'], 'get the length of an array'),
    new OpcodeInfo(191 /* athrow */, 0 /* Normal */, 0 /* Void */, ['objectref'], null, 'throws an error or exception (notice that the rest of the stack is cleared, leaving only a reference to the Throwable)'),
    new OpcodeInfo(192 /* checkcast */, 0 /* Normal */, 4 /* U16 */, ['objectref'], ['objectref'], 'checks whether an objectref is of a certain type, the class reference of which is in the constant pool at index (indexbyte1 << 8 + indexbyte2)'),
    new OpcodeInfo(193 /* instanceof */, 0 /* Normal */, 4 /* U16 */, ['objectref'], ['result'], 'determines if an object objectref is of a given type, identified by class reference index in constant pool (indexbyte1 << 8 + indexbyte2)'),
    new OpcodeInfo(194 /* monitorenter */, 0 /* Normal */, 0 /* Void */, ['objectref'], [], 'enter monitor for object ("grab the lock" - start of synchronized() section)'),
    new OpcodeInfo(195 /* monitorexit */, 0 /* Normal */, 0 /* Void */, ['objectref'], [], 'exit monitor for object ("release the lock" - end of synchronized() section)'),
    new OpcodeInfo(196 /* wide */, 0 /* Normal */, 1 /* Special */, null, null, 'execute opcode, where opcode is either iload, fload, aload, lload, dload, istore, fstore, astore, lstore, dstore, or ret, but assume the index is 16 bit; or execute iinc, where the index is 16 bits and the constant to increment by is a signed 16 bit short'),
    new OpcodeInfo(197 /* multianewarray */, 0 /* Normal */, 9 /* U16_U8 */, null, ['arrayref'], 'create a new array of dimensions dimensions with elements of type identified by class reference in constant pool index (indexbyte1 << 8 + indexbyte2); the sizes of each dimension is identified by count1, [count2, etc.]'),
    new OpcodeInfo(198 /* ifnull */, 1 /* Jump */, 5 /* S16 */, ['value'], [], 'if value is null, branch to instruction at branchoffset (signed short constructed from unsigned bytes branchbyte1 << 8 + branchbyte2)'),
    new OpcodeInfo(199 /* ifnonnull */, 1 /* Jump */, 5 /* S16 */, ['value'], [], 'if value is not null, branch to instruction at branchoffset (signed short constructed from unsigned bytes branchbyte1 << 8 + branchbyte2)'),
    new OpcodeInfo(200 /* goto_w */, 1 /* Jump */, 7 /* S32 */, [], [], 'goes to another instruction at branchoffset (signed int constructed from unsigned bytes branchbyte1 << 24 + branchbyte2 << 16 + branchbyte3 << 8 + branchbyte4)'),
    new OpcodeInfo(201 /* jsr_w */, 1 /* Jump */, 7 /* S32 */, [], [], 'jump to subroutine at branchoffset (signed int constructed from unsigned bytes branchbyte1 << 24 + branchbyte2 << 16 + branchbyte3 << 8 + branchbyte4) and place the return address on the stack'),
    new OpcodeInfo(202 /* breakpoint */, 0 /* Normal */, 0 /* Void */, [], [], 'reserved for breakpoints in Java debuggers; should not appear in any class file'),
    new OpcodeInfo(254 /* impdep1 */, 0 /* Normal */, 0 /* Void */, [], [], 'reserved for implementation-dependent operations within debuggers; should not appear in any class file'),
    new OpcodeInfo(255 /* impdep2 */, 0 /* Normal */, 0 /* Void */, [], [], 'reserved for implementation-dependent operations within debuggers; should not appear in any class file')
];

exports.opcodeInfoListByOpcode = {};
exports.opcodeInfoList.forEach(function (opcodeInfo) {
    exports.opcodeInfoListByOpcode[opcodeInfo.opcode] = opcodeInfo;
});
//# sourceMappingURL=opcodes.js.map
