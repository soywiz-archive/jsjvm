
// http://en.wikipedia.org/wiki/Java_bytecode_instruction_listings
export enum Opcode {
	nop = 0x00, aconst_null = 0x01, iconst_m1 = 0x02, iconst_0 = 0x03, iconst_1 = 0x04, iconst_2 = 0x05, iconst_3 = 0x06, iconst_4 = 0x07, iconst_5 = 0x08, lconst_0 = 0x09,
	lconst_1 = 0x0a, fconst_0 = 0x0b, fconst_1 = 0x0c, fconst_2 = 0x0d, dconst_0 = 0x0e, dconst_1 = 0x0f, bipush = 0x10, sipush = 0x11, ldc = 0x12, ldc_w = 0x13, ldc2_w = 0x14,
	iload = 0x15, lload = 0x16, fload = 0x17, dload = 0x18, aload = 0x19, iload_0 = 0x1a, iload_1 = 0x1b, iload_2 = 0x1c, iload_3 = 0x1d, lload_0 = 0x1e, lload_1 = 0x1f,
	lload_2 = 0x20, lload_3 = 0x21, fload_0 = 0x22, fload_1 = 0x23, fload_2 = 0x24, fload_3 = 0x25, dload_0 = 0x26, dload_1 = 0x27, dload_2 = 0x28, dload_3 = 0x29, aload_0 = 0x2a,
	aload_1 = 0x2b, aload_2 = 0x2c, aload_3 = 0x2d, iaload = 0x2e, laload = 0x2f, faload = 0x30, daload = 0x31, aaload = 0x32, baload = 0x33, caload = 0x34,
	saload = 0x35, istore = 0x36, lstore = 0x37, fstore = 0x38, dstore = 0x39, astore = 0x3a, istore_0 = 0x3b, istore_1 = 0x3c, istore_2 = 0x3d, istore_3 = 0x3e,
	lstore_0 = 0x3f, lstore_1 = 0x40, lstore_2 = 0x41, lstore_3 = 0x42, fstore_0 = 0x43, fstore_1 = 0x44, fstore_2 = 0x45, fstore_3 = 0x46, dstore_0 = 0x47,
	dstore_1 = 0x48, dstore_2 = 0x49, dstore_3 = 0x4a, astore_0 = 0x4b, astore_1 = 0x4c, astore_2 = 0x4d, astore_3 = 0x4e, iastore = 0x4f, lastore = 0x50, fastore = 0x51,
	dastore = 0x52, aastore = 0x53, bastore = 0x54, castore = 0x55, sastore = 0x56, pop = 0x57, pop2 = 0x58, dup = 0x59, dup_x1 = 0x5a, dup_x2 = 0x5b, dup2 = 0x5c,
	dup2_x1 = 0x5d, dup2_x2 = 0x5e, swap = 0x5f, iadd = 0x60, ladd = 0x61, fadd = 0x62, dadd = 0x63, isub = 0x64, lsub = 0x65, fsub = 0x66, dsub = 0x67, imul = 0x68,
	lmul = 0x69, fmul = 0x6a, dmul = 0x6b, idiv = 0x6c, ldiv = 0x6d, fdiv = 0x6e, ddiv = 0x6f, irem = 0x70, lrem = 0x71, frem = 0x72, drem = 0x73, ineg = 0x74,
	lneg = 0x75, fneg = 0x76, dneg = 0x77, ishl = 0x78, lshl = 0x79, ishr = 0x7a, lshr = 0x7b, iushr = 0x7c, lushr = 0x7d, iand = 0x7e, land = 0x7f, ior = 0x80,
	lor = 0x81, ixor = 0x82, lxor = 0x83, iinc = 0x84, i2l = 0x85, i2f = 0x86, i2d = 0x87, l2i = 0x88, l2f = 0x89, l2d = 0x8a, f2i = 0x8b, f2l = 0x8c, f2d = 0x8d,
	d2i = 0x8e, d2l = 0x8f, d2f = 0x90, i2b = 0x91, i2c = 0x92, i2s = 0x93, lcmp = 0x94, fcmpl = 0x95, fcmpg = 0x96, dcmpl = 0x97, dcmpg = 0x98, ifeq = 0x99,
	ifne = 0x9a, iflt = 0x9b, ifge = 0x9c, ifgt = 0x9d, ifle = 0x9e, if_icmpeq = 0x9f, if_icmpne = 0xa0, if_icmplt = 0xa1, if_icmpge = 0xa2, if_icmpgt = 0xa3,
	if_icmple = 0xa4, if_acmpeq = 0xa5, if_acmpne = 0xa6, goto = 0xa7, jsr = 0xa8, ret = 0xa9, tableswitch = 0xaa, lookupswitch = 0xab, ireturn = 0xac, lreturn = 0xad,
	freturn = 0xae, dreturn = 0xaf, areturn = 0xb0, Return = 0xb1, getstatic = 0xb2, putstatic = 0xb3, getfield = 0xb4, putfield = 0xb5, invokevirtual = 0xb6, invokespecial = 0xb7,
	invokestatic = 0xb8, invokeinterface = 0xb9, invokedynamic = 0xba, 'new' = 0xbb, newarray = 0xbc, anewarray = 0xbd, arraylength = 0xbe, athrow = 0xbf, checkcast = 0xc0,
	'instanceof' = 0xc1, monitorenter = 0xc2, monitorexit = 0xc3, wide = 0xc4, multianewarray = 0xc5, ifnull = 0xc6, ifnonnull = 0xc7, goto_w = 0xc8, jsr_w = 0xc9,
	breakpoint = 0xca, impdep1 = 0xfe, impdep2 = 0xff
}

export enum ParamType { Void, Special, U8, S8, U16, S16, U32, S32, U8_S8, U16_U8, TableSwitch, LookupSwitch }

export class OpcodeInfo {
	constructor(public opcode: Opcode, public param: ParamType, public stackPop: string[], public stackPush: string[], public description: string) { }
	get deltaStack() { return this.stackPush.length - this.stackPop.length; }
}

var opcodeInfoList = [
	new OpcodeInfo(Opcode.nop, ParamType.Void, [], [], 'perform no operation'),
	new OpcodeInfo(Opcode.aconst_null, ParamType.Void, [], ['null'], 'push a null reference onto the stack'),
	new OpcodeInfo(Opcode.iconst_m1, ParamType.Void, [], ['-1'], 'load the int value -1 onto the stack'),
	new OpcodeInfo(Opcode.iconst_0, ParamType.Void, [], ['0'], 'load the int value 0 onto the stack'),
	new OpcodeInfo(Opcode.iconst_1, ParamType.Void, [], ['1'], 'load the int value 1 onto the stack'),
	new OpcodeInfo(Opcode.iconst_2, ParamType.Void, [], ['2'], 'load the int value 2 onto the stack'),
	new OpcodeInfo(Opcode.iconst_3, ParamType.Void, [], ['3'], 'load the int value 3 onto the stack'),
	new OpcodeInfo(Opcode.iconst_4, ParamType.Void, [], ['4'], 'load the int value 4 onto the stack'),
	new OpcodeInfo(Opcode.iconst_5, ParamType.Void, [], ['5'], 'load the int value 5 onto the stack'),
	new OpcodeInfo(Opcode.lconst_0, ParamType.Void, [], ['0L'], 'push the long 0 onto the stack'),
	new OpcodeInfo(Opcode.lconst_1, ParamType.Void, [], ['1L'], 'push the long 1 onto the stack'),
	new OpcodeInfo(Opcode.fconst_0, ParamType.Void, [], ['0.0f'], 'push 0.0f on the stack'),
	new OpcodeInfo(Opcode.fconst_1, ParamType.Void, [], ['1.0f'], 'push 1.0f on the stack'),
	new OpcodeInfo(Opcode.fconst_2, ParamType.Void, [], ['2.0f'], 'push 2.0f on the stack'),
	new OpcodeInfo(Opcode.dconst_0, ParamType.Void, [], ['0.0'], 'push the constant 0.0 onto the stack'),
	new OpcodeInfo(Opcode.dconst_1, ParamType.Void, [], ['1.0'], 'push the constant 1.0 onto the stack'),
	new OpcodeInfo(Opcode.bipush, ParamType.S8, [], ['value'], 'push a byte onto the stack as an integer value'),
	new OpcodeInfo(Opcode.sipush, ParamType.S16, [], ['value'], 'push a short onto the stack'),
	new OpcodeInfo(Opcode.ldc, ParamType.U8, [], ['value'], 'push a constant #index from a constant pool (String, int or float) onto the stack'),
	new OpcodeInfo(Opcode.ldc_w, ParamType.U16, [], ['value'], 'push a constant #index from a constant pool (String, int or float) onto the stack (wide index is constructed as indexbyte1 << 8 + indexbyte2)'),
	new OpcodeInfo(Opcode.ldc2_w, ParamType.U16, [], ['value'], 'push a constant #index from a constant pool (double or long) onto the stack (wide index is constructed as indexbyte1 << 8 + indexbyte2)'),

	new OpcodeInfo(Opcode.iload, ParamType.U8, [], ['value'], 'load an int value from a local variable #index'),
	new OpcodeInfo(Opcode.lload, ParamType.U8, [], ['value'], 'load a long value from a local variable #index'),
	new OpcodeInfo(Opcode.fload, ParamType.U8, [], ['value'], 'load a float value from a local variable #index'),
	new OpcodeInfo(Opcode.dload, ParamType.U8, [], ['value'], 'load a double value from a local variable #index'),
	new OpcodeInfo(Opcode.aload, ParamType.U8, [], ['objectref'], 'load a reference onto the stack from a local variable #index'),

	new OpcodeInfo(Opcode.iload_0, ParamType.Void, [], ['value'], 'load an int value from local variable 0'),
	new OpcodeInfo(Opcode.iload_1, ParamType.Void, [], ['value'], 'load an int value from local variable 1'),
	new OpcodeInfo(Opcode.iload_2, ParamType.Void, [], ['value'], 'load an int value from local variable 2'),
	new OpcodeInfo(Opcode.iload_3, ParamType.Void, [], ['value'], 'load an int value from local variable 3'),

	new OpcodeInfo(Opcode.lload_0, ParamType.Void, [], ['value'], 'load a long value from local variable 0'),
	new OpcodeInfo(Opcode.lload_1, ParamType.Void, [], ['value'], 'load a long value from local variable 1'),
	new OpcodeInfo(Opcode.lload_2, ParamType.Void, [], ['value'], 'load a long value from local variable 2'),
	new OpcodeInfo(Opcode.lload_3, ParamType.Void, [], ['value'], 'load a long value from local variable 3'),

	new OpcodeInfo(Opcode.fload_0, ParamType.Void, [], ['value'], 'load a float value from local variable 0'),
	new OpcodeInfo(Opcode.fload_1, ParamType.Void, [], ['value'], 'load a float value from local variable 1'),
	new OpcodeInfo(Opcode.fload_2, ParamType.Void, [], ['value'], 'load a float value from local variable 2'),
	new OpcodeInfo(Opcode.fload_3, ParamType.Void, [], ['value'], 'load a float value from local variable 3'),

	new OpcodeInfo(Opcode.dload_0, ParamType.Void, [], ['value'], 'load a double value from local variable 0'),
	new OpcodeInfo(Opcode.dload_1, ParamType.Void, [], ['value'], 'load a double value from local variable 1'),
	new OpcodeInfo(Opcode.dload_2, ParamType.Void, [], ['value'], 'load a double value from local variable 2'),
	new OpcodeInfo(Opcode.dload_3, ParamType.Void, [], ['value'], 'load a double value from local variable 3'),

	new OpcodeInfo(Opcode.aload_0, ParamType.Void, [], ['objectref'], 'load a reference onto the stack from local variable 0'),
	new OpcodeInfo(Opcode.aload_1, ParamType.Void, [], ['objectref'], 'load a reference onto the stack from local variable 1'),
	new OpcodeInfo(Opcode.aload_2, ParamType.Void, [], ['objectref'], 'load a reference onto the stack from local variable 2'),
	new OpcodeInfo(Opcode.aload_3, ParamType.Void, [], ['objectref'], 'load a reference onto the stack from local variable 3'),

	new OpcodeInfo(Opcode.iaload, ParamType.Void, ['arrayref', 'index'], ['value'], 'load an int from an array'),
	new OpcodeInfo(Opcode.laload, ParamType.Void, ['arrayref', 'index'], ['value'], 'load a long from an array'),
	new OpcodeInfo(Opcode.faload, ParamType.Void, ['arrayref', 'index'], ['value'], 'load a float from an array'),
	new OpcodeInfo(Opcode.daload, ParamType.Void, ['arrayref', 'index'], ['value'], 'load a double from an array'),
	new OpcodeInfo(Opcode.aaload, ParamType.Void, ['arrayref', 'index'], ['objectref'], 'load onto the stack a reference from an array'),
	new OpcodeInfo(Opcode.baload, ParamType.Void, ['arrayref', 'index'], ['value'], 'load a byte or Boolean value from an array'),
	new OpcodeInfo(Opcode.caload, ParamType.Void, ['arrayref', 'index'], ['value'], 'load a char from an array'),
	new OpcodeInfo(Opcode.saload, ParamType.Void, ['arrayref', 'index'], ['value'], 'load short from array'),

	new OpcodeInfo(Opcode.istore, ParamType.U8, ['value'], [''], 'store int value into variable #index'),
	new OpcodeInfo(Opcode.lstore, ParamType.U8, ['value'], [''], 'store a long value in a local variable #index'),
	new OpcodeInfo(Opcode.fstore, ParamType.U8, ['value'], [''], 'store a float value in a local variable #index'),
	new OpcodeInfo(Opcode.dstore, ParamType.U8, ['value'], [''], 'store a double value in a local variable #index'),
	new OpcodeInfo(Opcode.astore, ParamType.U8, ['objectref'], [''], 'store a reference in a local variable #index'),

	new OpcodeInfo(Opcode.istore_0, ParamType.Void, ['value'], [''], 'store int value into variable 0'),
	new OpcodeInfo(Opcode.istore_1, ParamType.Void, ['value'], [''], 'store int value into variable 1'),
	new OpcodeInfo(Opcode.istore_2, ParamType.Void, ['value'], [''], 'store int value into variable 2'),
	new OpcodeInfo(Opcode.istore_3, ParamType.Void, ['value'], [''], 'store int value into variable 3'),

	new OpcodeInfo(Opcode.lstore_0, ParamType.Void, ['value'], [''], 'store long value into variable 0'),
	new OpcodeInfo(Opcode.lstore_1, ParamType.Void, ['value'], [''], 'store long value into variable 1'),
	new OpcodeInfo(Opcode.lstore_2, ParamType.Void, ['value'], [''], 'store long value into variable 2'),
	new OpcodeInfo(Opcode.lstore_3, ParamType.Void, ['value'], [''], 'store long value into variable 3'),

	new OpcodeInfo(Opcode.fstore_0, ParamType.Void, ['value'], [''], 'store float value into variable 0'),
	new OpcodeInfo(Opcode.fstore_1, ParamType.Void, ['value'], [''], 'store float value into variable 1'),
	new OpcodeInfo(Opcode.fstore_2, ParamType.Void, ['value'], [''], 'store float value into variable 2'),
	new OpcodeInfo(Opcode.fstore_3, ParamType.Void, ['value'], [''], 'store float value into variable 3'),

	new OpcodeInfo(Opcode.dstore_0, ParamType.Void, ['value'], [''], 'store double value into variable 0'),
	new OpcodeInfo(Opcode.dstore_1, ParamType.Void, ['value'], [''], 'store double value into variable 1'),
	new OpcodeInfo(Opcode.dstore_2, ParamType.Void, ['value'], [''], 'store double value into variable 2'),
	new OpcodeInfo(Opcode.dstore_3, ParamType.Void, ['value'], [''], 'store double value into variable 3'),

	new OpcodeInfo(Opcode.astore_0, ParamType.Void, ['objectref'], [''], 'store reference into variable 0'),
	new OpcodeInfo(Opcode.astore_1, ParamType.Void, ['objectref'], [''], 'store reference into variable 1'),
	new OpcodeInfo(Opcode.astore_2, ParamType.Void, ['objectref'], [''], 'store reference into variable 2'),
	new OpcodeInfo(Opcode.astore_3, ParamType.Void, ['objectref'], [''], 'store reference into variable 3'),

	new OpcodeInfo(Opcode.iastore, ParamType.Void, ['arrayref', 'index', 'value'], [''], 'store an int into an array'),
	new OpcodeInfo(Opcode.lastore, ParamType.Void, ['arrayref', 'index', 'value'], [''], 'store a long into an array'),
	new OpcodeInfo(Opcode.fastore, ParamType.Void, ['arrayref', 'index', 'value'], [''], 'store a float into an array'),
	new OpcodeInfo(Opcode.dastore, ParamType.Void, ['arrayref', 'index', 'value'], [''], 'store a double into an array'),
	new OpcodeInfo(Opcode.aastore, ParamType.Void, ['arrayref', 'index', 'value'], [''], 'store a reference in an array'),
	new OpcodeInfo(Opcode.bastore, ParamType.Void, ['arrayref', 'index', 'value'], [''], 'store a byte or Boolean value into an array'),
	new OpcodeInfo(Opcode.castore, ParamType.Void, ['arrayref', 'index', 'value'], [''], 'store a char value into an array'),
	new OpcodeInfo(Opcode.sastore, ParamType.Void, ['arrayref', 'index', 'value'], [''], 'store a short value into an array'),

	new OpcodeInfo(Opcode.pop, ParamType.Void, ['value'], [''], 'discard the top value on the stack'),
	new OpcodeInfo(Opcode.pop2, ParamType.Void, ['value2', 'value1'], [''], 'discard the top two values on the stack (or one value, if it is a double or long)'),

	new OpcodeInfo(Opcode.dup, ParamType.Void, ['value'], ['value', 'value'], 'duplicate the value on top of the stack'),
	new OpcodeInfo(Opcode.dup_x1, ParamType.Void, ['value2', 'value1'], ['value1', 'value2', 'value1'], 'insert a copy of the top value into the stack two values from the top. value1 and value2 must not be of the type double or long.'),
	new OpcodeInfo(Opcode.dup_x2, ParamType.Void, ['value3', 'value2', 'value1'], ['value1', 'value3', 'value2', 'value1'], 'insert a copy of the top value into the stack two values from the top. value1 and value2 must not be of the type double or long.'),

	new OpcodeInfo(Opcode.dup2, ParamType.Void, ['value2', 'value1'], ['value2', 'value1', 'value2', 'value1'], 'duplicate top two stack words (two values, if value1 is not double nor long; a single value, if value1 is double or long)'),
	new OpcodeInfo(Opcode.dup2_x1, ParamType.Void, ['value3', 'value2', 'value1'], ['value2', 'value1', 'value3', 'value2', 'value1'], 'duplicate two words and insert beneath third word (see explanation above)'),
	new OpcodeInfo(Opcode.dup2_x2, ParamType.Void, ['value4', 'value3', 'value2', 'value1'], ['value2', 'value1', 'value4', 'value3', 'value2', 'value1'], 'duplicate two words and insert beneath fourth word'),

	new OpcodeInfo(Opcode.swap, ParamType.Void, ['value2', 'value1'], ['value1', 'value2'], 'swaps two top words on the stack (note that value1 and value2 must not be double or long)'),

	new OpcodeInfo(Opcode.iadd, ParamType.Void, ['value1', 'value2'], ['result'], 'add two ints'),
	new OpcodeInfo(Opcode.ladd, ParamType.Void, ['value1', 'value2'], ['result'], 'add two longs'),
	new OpcodeInfo(Opcode.fadd, ParamType.Void, ['value1', 'value2'], ['result'], 'add two floats'),
	new OpcodeInfo(Opcode.dadd, ParamType.Void, ['value1', 'value2'], ['result'], 'add two doubles'),

	new OpcodeInfo(Opcode.isub, ParamType.Void, ['value1', 'value2'], ['result'], 'subtract two ints'),
	new OpcodeInfo(Opcode.lsub, ParamType.Void, ['value1', 'value2'], ['result'], 'subtract two longs'),
	new OpcodeInfo(Opcode.fsub, ParamType.Void, ['value1', 'value2'], ['result'], 'subtract two floats'),
	new OpcodeInfo(Opcode.dsub, ParamType.Void, ['value1', 'value2'], ['result'], 'subtract two doubles'),

	new OpcodeInfo(Opcode.imul, ParamType.Void, ['value1', 'value2'], ['result'], 'multiply two ints'),
	new OpcodeInfo(Opcode.lmul, ParamType.Void, ['value1', 'value2'], ['result'], 'multiply two longs'),
	new OpcodeInfo(Opcode.fmul, ParamType.Void, ['value1', 'value2'], ['result'], 'multiply two floats'),
	new OpcodeInfo(Opcode.dmul, ParamType.Void, ['value1', 'value2'], ['result'], 'multiply two doubles'),

	new OpcodeInfo(Opcode.idiv, ParamType.Void, ['value1', 'value2'], ['result'], 'divide two ints'),
	new OpcodeInfo(Opcode.ldiv, ParamType.Void, ['value1', 'value2'], ['result'], 'divide two longs'),
	new OpcodeInfo(Opcode.fdiv, ParamType.Void, ['value1', 'value2'], ['result'], 'divide two floats'),
	new OpcodeInfo(Opcode.ddiv, ParamType.Void, ['value1', 'value2'], ['result'], 'divide two doubles'),

	new OpcodeInfo(Opcode.irem, ParamType.Void, ['value1', 'value2'], ['result'], 'remainder of two ints'),
	new OpcodeInfo(Opcode.lrem, ParamType.Void, ['value1', 'value2'], ['result'], 'remainder of two longs'),
	new OpcodeInfo(Opcode.frem, ParamType.Void, ['value1', 'value2'], ['result'], 'remainder of two floats'),
	new OpcodeInfo(Opcode.drem, ParamType.Void, ['value1', 'value2'], ['result'], 'remainder of two doubles'),

	new OpcodeInfo(Opcode.ineg, ParamType.Void, ['value'], ['result'], 'negate ints'),
	new OpcodeInfo(Opcode.ineg, ParamType.Void, ['value'], ['result'], 'negate longs'),
	new OpcodeInfo(Opcode.ineg, ParamType.Void, ['value'], ['result'], 'negate floats'),
	new OpcodeInfo(Opcode.ineg, ParamType.Void, ['value'], ['result'], 'negate doubles'),

	new OpcodeInfo(Opcode.ishl, ParamType.Void, ['value1', 'value2'], ['result'], 'int shift left'),
	new OpcodeInfo(Opcode.lshl, ParamType.Void, ['value1', 'value2'], ['result'], 'bitwise shift left of a long value1 by int value2 positions'),

	new OpcodeInfo(Opcode.ishr, ParamType.Void, ['value1', 'value2'], ['result'], 'int arithmetic shift right'),
	new OpcodeInfo(Opcode.lshr, ParamType.Void, ['value1', 'value2'], ['result'], 'bitwise arithmetic shift right of a long value1 by int value2 positions'),

	new OpcodeInfo(Opcode.iushr, ParamType.Void, ['value1', 'value2'], ['result'], 'int logical shift right'),
	new OpcodeInfo(Opcode.lushr, ParamType.Void, ['value1', 'value2'], ['result'], 'bitwise logical shift right of a long value1 by int value2 positions'),

	new OpcodeInfo(Opcode.iand, ParamType.Void, ['value1', 'value2'], ['result'], 'bitwise and of two ints'),
	new OpcodeInfo(Opcode.land, ParamType.Void, ['value1', 'value2'], ['result'], 'bitwise and of two longs'),

	new OpcodeInfo(Opcode.ior, ParamType.Void, ['value1', 'value2'], ['result'], 'bitwise or of two ints'),
	new OpcodeInfo(Opcode.lor, ParamType.Void, ['value1', 'value2'], ['result'], 'bitwise or of two longs'),

	new OpcodeInfo(Opcode.ixor, ParamType.Void, ['value1', 'value2'], ['result'], 'bitwise xor of two ints'),
	new OpcodeInfo(Opcode.lxor, ParamType.Void, ['value1', 'value2'], ['result'], 'bitwise xor of two longs'),

	new OpcodeInfo(Opcode.iinc, ParamType.U8_S8, [], [], 'increment local variable #index by signed byte const'),

	new OpcodeInfo(Opcode.i2l, ParamType.Void, ['value'], ['result'], 'convert an int into a long'),
	new OpcodeInfo(Opcode.i2f, ParamType.Void, ['value'], ['result'], 'convert an int into a float'),
	new OpcodeInfo(Opcode.i2d, ParamType.Void, ['value'], ['result'], 'convert an int into a double'),

	new OpcodeInfo(Opcode.l2i, ParamType.Void, ['value'], ['result'], 'convert a long to a int'),
	new OpcodeInfo(Opcode.l2f, ParamType.Void, ['value'], ['result'], 'convert a long to a float'),
	new OpcodeInfo(Opcode.l2d, ParamType.Void, ['value'], ['result'], 'convert a long to a double'),

	new OpcodeInfo(Opcode.f2i, ParamType.Void, ['value'], ['result'], 'convert a float to a int'),
	new OpcodeInfo(Opcode.f2l, ParamType.Void, ['value'], ['result'], 'convert a float to a long'),
	new OpcodeInfo(Opcode.f2d, ParamType.Void, ['value'], ['result'], 'convert a float to a double'),

	new OpcodeInfo(Opcode.d2i, ParamType.Void, ['value'], ['result'], 'convert a double to a int'),
	new OpcodeInfo(Opcode.d2l, ParamType.Void, ['value'], ['result'], 'convert a double to a long'),
	new OpcodeInfo(Opcode.d2f, ParamType.Void, ['value'], ['result'], 'convert a double to a float'),

	new OpcodeInfo(Opcode.i2b, ParamType.Void, ['value'], ['result'], 'convert an int into a byte'),
	new OpcodeInfo(Opcode.i2c, ParamType.Void, ['value'], ['result'], 'convert an int into a character'),
	new OpcodeInfo(Opcode.i2s, ParamType.Void, ['value'], ['result'], 'convert an int into a short'),

	new OpcodeInfo(Opcode.lcmp, ParamType.Void, ['value1', 'value2'], ['result'], 'compare two longs values'),
	new OpcodeInfo(Opcode.fcmpl, ParamType.Void, ['value1', 'value2'], ['result'], 'compare two floats less'),
	new OpcodeInfo(Opcode.fcmpg, ParamType.Void, ['value1', 'value2'], ['result'], 'compare two floats greater'),
	new OpcodeInfo(Opcode.dcmpl, ParamType.Void, ['value1', 'value2'], ['result'], 'compare two doubles less'),
	new OpcodeInfo(Opcode.dcmpg, ParamType.Void, ['value1', 'value2'], ['result'], 'compare two doubles greater'),

	new OpcodeInfo(Opcode.ifeq, ParamType.S16, ['value'], [], 'if value is 0, branch to instruction at branchoffset (signed short constructed from unsigned bytes branchbyte1 << 8 + branchbyte2)'),
	new OpcodeInfo(Opcode.ifne, ParamType.S16, ['value'], [], 'if value is not 0, branch to instruction at branchoffset (signed short constructed from unsigned bytes branchbyte1 << 8 + branchbyte2)'),
	new OpcodeInfo(Opcode.iflt, ParamType.S16, ['value'], [], 'if value is less than 0, branch to instruction at branchoffset (signed short constructed from unsigned bytes branchbyte1 << 8 + branchbyte2)'),
	new OpcodeInfo(Opcode.ifge, ParamType.S16, ['value'], [], 'if value is greater than or equal to 0, branch to instruction at branchoffset (signed short constructed from unsigned bytes branchbyte1 << 8 + branchbyte2)'),
	new OpcodeInfo(Opcode.ifgt, ParamType.S16, ['value'], [], 'if value is greater than 0, branch to instruction at branchoffset (signed short constructed from unsigned bytes branchbyte1 << 8 + branchbyte2)'),
	new OpcodeInfo(Opcode.ifle, ParamType.S16, ['value'], [], 'if value is less than or equal to 0, branch to instruction at branchoffset (signed short constructed from unsigned bytes branchbyte1 << 8 + branchbyte2)'),

	new OpcodeInfo(Opcode.if_icmpeq, ParamType.S16, ['value1', 'value2'], [], 'if ints are equal, branch to instruction at branchoffset (signed short constructed from unsigned bytes branchbyte1 << 8 + branchbyte2)'),
	new OpcodeInfo(Opcode.if_icmpne, ParamType.S16, ['value1', 'value2'], [], 'ifif ints are not equal, branch to instruction at branchoffset (signed short constructed from unsigned bytes branchbyte1 << 8 + branchbyte2)'),
	new OpcodeInfo(Opcode.if_icmplt, ParamType.S16, ['value1', 'value2'], [], 'if value1 is less than value2, branch to instruction at branchoffset (signed short constructed from unsigned bytes branchbyte1 << 8 + branchbyte2)'),
	new OpcodeInfo(Opcode.if_icmpge, ParamType.S16, ['value1', 'value2'], [], 'if value1 is greater than or equal to value2, branch to instruction at branchoffset (signed short constructed from unsigned bytes branchbyte1 << 8 + branchbyte2)'),
	new OpcodeInfo(Opcode.if_icmpgt, ParamType.S16, ['value1', 'value2'], [], 'if value1 is greater than value2, branch to instruction at branchoffset (signed short constructed from unsigned bytes branchbyte1 << 8 + branchbyte2)'),
	new OpcodeInfo(Opcode.if_icmple, ParamType.S16, ['value1', 'value2'], [], 'if value1 is less than or equal to value2, branch to instruction at branchoffset (signed short constructed from unsigned bytes branchbyte1 << 8 + branchbyte2)'),
	new OpcodeInfo(Opcode.if_acmpeq, ParamType.S16, ['value1', 'value2'], [], 'if references are equal, branch to instruction at branchoffset (signed short constructed from unsigned bytes branchbyte1 << 8 + branchbyte2)'),
	new OpcodeInfo(Opcode.if_acmpne, ParamType.S16, ['value1', 'value2'], [], 'if references are not equal, branch to instruction at branchoffset (signed short constructed from unsigned bytes branchbyte1 << 8 + branchbyte2)'),

	new OpcodeInfo(Opcode.goto, ParamType.S16, [], [], 'goes to another instruction at branchoffset (signed short constructed from unsigned bytes branchbyte1 << 8 + branchbyte2)'),
	new OpcodeInfo(Opcode.jsr, ParamType.S16, [], ['address'], 'jump to subroutine at branchoffset (signed short constructed from unsigned bytes branchbyte1 << 8 + branchbyte2) and place the return address on the stack'),
	new OpcodeInfo(Opcode.ret, ParamType.U8, [], [], 'continue execution from address taken from a local variable #index (the asymmetry with jsr is intentional)'),

	new OpcodeInfo(Opcode.tableswitch, ParamType.TableSwitch, ['index'], [], 'continue execution from an address in the table at offset index'),
	new OpcodeInfo(Opcode.lookupswitch, ParamType.LookupSwitch, ['key'], [], 'a target address is looked up from a table using a key and execution continues from the instruction at that address'),

	new OpcodeInfo(Opcode.ireturn, ParamType.Void, ['value'], null, 'return an integer from a method'),
	new OpcodeInfo(Opcode.lreturn, ParamType.Void, ['value'], null, 'return a long value'),
	new OpcodeInfo(Opcode.freturn, ParamType.Void, ['value'], null, 'return a float value'),
	new OpcodeInfo(Opcode.dreturn, ParamType.Void, ['value'], null, 'return a double value'),
	new OpcodeInfo(Opcode.areturn, ParamType.Void, ['objectref'], null, 'return a reference'),
	new OpcodeInfo(Opcode.Return, ParamType.Void, [], null, 'return void from method'),

	new OpcodeInfo(Opcode.getstatic, ParamType.U16, [], ['value'], 'get a static field value of a class, where the field is identified by field reference in the constant pool index (index1 << 8 + index2)'),
	new OpcodeInfo(Opcode.putstatic, ParamType.U16, ['value'], [], 'set static field to value in a class, where the field is identified by a field reference index in constant pool (indexbyte1 << 8 + indexbyte2'),

	new OpcodeInfo(Opcode.getfield, ParamType.U16, ['objectref'], ['value'], 'get a field value of an object objectref, where the field is identified by field reference in the constant pool index (index1 << 8 + index2)'),
	new OpcodeInfo(Opcode.putfield, ParamType.U16, ['objectref', 'value'], [], 'set field to value in an object objectref, where the field is identified by a field reference index in constant pool (indexbyte1 << 8 + indexbyte2)'),

	new OpcodeInfo(Opcode.invokevirtual, ParamType.U16, null, null, 'invoke virtual method on object objectref, where the method is identified by method reference index in constant pool (indexbyte1 << 8 + indexbyte2)'),
	new OpcodeInfo(Opcode.invokespecial, ParamType.U16, null, null, 'invoke instance method on object objectref, where the method is identified by method reference index in constant pool (indexbyte1 << 8 + indexbyte2)'),
	new OpcodeInfo(Opcode.invokestatic, ParamType.U16, null, null, 'invoke a static method, where the method is identified by method reference index in constant pool (indexbyte1 << 8 + indexbyte2)'),
	new OpcodeInfo(Opcode.invokeinterface, ParamType.U16, null, null, 'invokes an interface method on object objectref, where the interface method is identified by method reference index in constant pool (indexbyte1 << 8 + indexbyte2)'),
	new OpcodeInfo(Opcode.invokedynamic, ParamType.U16, null, null, 'invokes a dynamic method identified by method reference index in constant pool (indexbyte1 << 8 + indexbyte2)'),

	new OpcodeInfo(Opcode.new, ParamType.U16, [], ['objectref'], 'create new object of type identified by class reference in constant pool index (indexbyte1 << 8 + indexbyte2)'),
	new OpcodeInfo(Opcode.newarray, ParamType.U8, ['count'], ['arrayref'], 'create new array with count elements of primitive type identified by atype'),
	new OpcodeInfo(Opcode.anewarray, ParamType.U16, ['count'], ['arrayref'], 'create a new array of references of length count and component type identified by the class reference index (indexbyte1 << 8 + indexbyte2) in the constant pool'),

	new OpcodeInfo(Opcode.arraylength, ParamType.Void, ['arrayref'], ['length'], 'get the length of an array'),

	new OpcodeInfo(Opcode.athrow, ParamType.Void, ['objectref'], null, 'throws an error or exception (notice that the rest of the stack is cleared, leaving only a reference to the Throwable)'),

	new OpcodeInfo(Opcode.checkcast, ParamType.U16, ['objectref'], ['objectref'], 'checks whether an objectref is of a certain type, the class reference of which is in the constant pool at index (indexbyte1 << 8 + indexbyte2)'),
	new OpcodeInfo(Opcode.instanceof, ParamType.U16, ['objectref'], ['result'], 'determines if an object objectref is of a given type, identified by class reference index in constant pool (indexbyte1 << 8 + indexbyte2)'),

	new OpcodeInfo(Opcode.monitorenter, ParamType.Void, ['objectref'], [], 'enter monitor for object ("grab the lock" - start of synchronized() section)'),
	new OpcodeInfo(Opcode.monitorexit, ParamType.Void, ['objectref'], [], 'exit monitor for object ("release the lock" - end of synchronized() section)'),

	new OpcodeInfo(Opcode.wide, ParamType.Special, null, null, 'execute opcode, where opcode is either iload, fload, aload, lload, dload, istore, fstore, astore, lstore, dstore, or ret, but assume the index is 16 bit; or execute iinc, where the index is 16 bits and the constant to increment by is a signed 16 bit short'),

	new OpcodeInfo(Opcode.multianewarray, ParamType.U16_U8, null, ['arrayref'], 'create a new array of dimensions dimensions with elements of type identified by class reference in constant pool index (indexbyte1 << 8 + indexbyte2); the sizes of each dimension is identified by count1, [count2, etc.]'),

	new OpcodeInfo(Opcode.ifnull, ParamType.S16, ['value'], [], 'if value is null, branch to instruction at branchoffset (signed short constructed from unsigned bytes branchbyte1 << 8 + branchbyte2)'),
	new OpcodeInfo(Opcode.ifnonnull, ParamType.S16, ['value'], [], 'if value is not null, branch to instruction at branchoffset (signed short constructed from unsigned bytes branchbyte1 << 8 + branchbyte2)'),

	new OpcodeInfo(Opcode.goto_w, ParamType.S32, [], [], 'goes to another instruction at branchoffset (signed int constructed from unsigned bytes branchbyte1 << 24 + branchbyte2 << 16 + branchbyte3 << 8 + branchbyte4)'),
	new OpcodeInfo(Opcode.jsr_w, ParamType.S32, [], [], 'jump to subroutine at branchoffset (signed int constructed from unsigned bytes branchbyte1 << 24 + branchbyte2 << 16 + branchbyte3 << 8 + branchbyte4) and place the return address on the stack'),

	new OpcodeInfo(Opcode.breakpoint, ParamType.Void, [], [], 'reserved for breakpoints in Java debuggers; should not appear in any class file'),
	new OpcodeInfo(Opcode.impdep1, ParamType.Void, [], [], 'reserved for implementation-dependent operations within debuggers; should not appear in any class file'),
	new OpcodeInfo(Opcode.impdep2, ParamType.Void, [], [], 'reserved for implementation-dependent operations within debuggers; should not appear in any class file'),
];

