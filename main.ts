/// <reference path="node.d.ts" />

import fs = require('fs');

class Stream {
	position = 0;
	constructor(private buffer: NodeBuffer) { }
	get length() { return this.buffer.length; }
	get available() { return this.buffer.length - this.position; }
	get eof() { return this.available <= 0; }
	private _move<T>(value: T, offset: number) { this.position += offset; return value; }
	readUInt32BE() { return this._move(this.buffer.readUInt32BE(this.position), 4); }
	readUInt16BE() { return this._move(this.buffer.readUInt16BE(this.position), 2); }
	readInt32BE() { return this._move(this.buffer.readInt32BE(this.position), 4); }
	readInt16BE() { return this._move(this.buffer.readInt16BE(this.position), 2); }
	readInt8() { return this._move(this.buffer.readInt8(this.position), 1); }
	readUInt8() { return this._move(this.buffer.readUInt8(this.position), 1); }
	readBytes(count: number) { return this._move(this.buffer.slice(this.position, this.position + count), count); }
}

enum Opcode {
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

var OpcodesArgs = {
};

enum ACC_CLASS { PUBLIC = 0x0001, FINAL = 0x0010, SUPER = 0x0020, INTERFACE = 0x0200, ABSTRACT = 0x0400 }
enum ACC_FIELD { PUBLIC = 0x0001, PRIVATE = 0x0002, PROTECTED = 0x0004, STATIC = 0x0008, FINAL = 0x0010, VOLATILE = 0x0040, TRANSIENT = 0x0080 }
enum ACC_METHOD { PUBLIC = 0x0001, PRIVATE = 0x0002, PROTECTED = 0x0004, STATIC = 0x0008, FINAL = 0x0010, SYNCHRONIZED = 0x0020, NATIVE = 0x0100, ABSTRACT = 0x0400, STRICT = 0x0800 }
enum CONSTANT { Utf8 = 1, Integer = 3, Float = 4, Long = 5, Double = 6, Class = 7, String = 8, Fieldref = 9, Methodref = 10, InterfaceMethodref = 11, NameAndType = 12 }

class JavaConstantUtf8 {
	string = "";
	constructor(data: NodeBuffer) {
		this.string = data.toString('utf-8');
	}
}

interface JavaConstant { }
class JavaConstantInt { constructor(public value: number) { } }
class JavaConstantLong { constructor(public low: number, public high: number) { } }
class JavaConstantClassReference { constructor(public index: number) { } }
class JavaConstantStringReference { constructor(public index: number) { } }
class JavaConstantFieldReference { constructor(public index1: number, public index2: number) { } }
class JavaConstantMethodReference { constructor(public index1: number, public index2: number) { } }
class JavaConstantInterfaceMethodReference { constructor(public index1: number, public index2: number) { } }
class JavaConstantNameTypeDescriptor { constructor(public index1: number, public index2: number) { } }

class JavaMemberInfo {
	constructor(public access_flags: number, public name_index: number, public descriptor_index: number, public attributes: JavaAttributeInfo[]) { }
}

class JavaAttributeInfo { constructor(public index: number, public data: NodeBuffer) { } }

class OpcodeReader {
	static read(code: Stream) {
		var op = <Opcode>code.readUInt8();
		switch (op) {
			case Opcode.tableswitch: throw (new Error("Not implemented tableswitch"));
			case Opcode.lookupswitch: throw (new Error("Not implemented lookupswitch"));
			case Opcode.bipush: return { op: op, name: Opcode[op], param: code.readUInt8() };
			case Opcode.sipush: return { op: op, name: Opcode[op], param: code.readUInt16BE() };
			case Opcode.iload: case Opcode.lload: case Opcode.fload: case Opcode.dload: case Opcode.aload:
			case Opcode.istore: case Opcode.lstore: case Opcode.fstore: case Opcode.dstore: case Opcode.astore: case Opcode.ret:
				return { op: op, name: Opcode[op], param: code.readUInt8() };

			case Opcode.ldc: return { op: op, name: Opcode[op], param: code.readUInt8() };

			case Opcode.ldc_w: case Opcode.ldc2_w:  case Opcode.getstatic: case Opcode.putstatic: 
			case Opcode.getfield: case Opcode.putfield:  case Opcode.new: case Opcode.invokevirtual: case Opcode.invokespecial:
			case Opcode.invokestatic: case Opcode.anewarray: case Opcode.checkcast: case Opcode.instanceof:
				return { op: op, name: Opcode[op], param: code.readUInt16BE() };

			case Opcode.iinc:  throw (new Error("Not implemented index_const_body"));
			case Opcode.ifeq: case Opcode.ifne: case Opcode.iflt: case Opcode.ifge: case Opcode.ifgt: case Opcode.ifle: 
			case Opcode.if_icmpeq: case Opcode.if_icmpne: case Opcode.if_icmplt: case Opcode.if_icmpge: case Opcode.if_icmpgt: case Opcode.if_icmple: 
			case Opcode.if_acmpeq: case Opcode.if_acmpne:  case Opcode.goto: case Opcode.jsr:  case Opcode.ifnull: case Opcode.ifnonnull:
				return { op: op, name: Opcode[op], param: code.readInt16BE() };

			case Opcode.newarray: throw (new Error("Not implemented newarray"));
			case Opcode.wide: throw (new Error("Not implemented wide"));
			case Opcode.multianewarray: throw (new Error("Not implemented multianewarray"));
			case Opcode.invokeinterface: throw (new Error("Not implemented invokeinterface"));
			case Opcode.invokedynamic: throw (new Error("Not implemented invokedynamic"));
			case Opcode.goto_w: case Opcode.jsr_w: throw (new Error("Not implemented branchbyte1_4_body"));
			default: return { op: op, name: Opcode[op] };
		}
	}
}

class JavaMethod {
	public name: string;
	public descriptor: string;

	constructor(private pool: ConstantPool, public info: JavaMemberInfo) {
		this.name = pool.getString(info.name_index);
		this.descriptor = pool.getString(info.descriptor_index);
		this.parse();
	}

	parse() {
		console.log('JavaMethod.parse() -> ', this.name, this.descriptor);
		this.info.attributes.forEach(attribute => {
			var attribute_name = this.pool.getString(attribute.index);
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
	}
}

class ConstantPool {
	public items = <JavaConstant[]>[];

	get<T>(index: number) {
		return <T>this.items[index];
	}

	getString(index: number) {
		return this.get<JavaConstantUtf8>(index).string;
	}

	getClassName(index: number) {
		return this.getString(this.get<JavaConstantClassReference>(index).index);
	}
}

class Dynarec {
}

class JavaClass {
	static majorVersionMap = { 45: 'JDK 1.1', 46: 'JDK 1.2', 47: 'JDK 1.3', 48: 'JDK 1.4', 49: 'J2SE 5.0', 50: 'J2SE 6.0', 51: 'J2SE 7', 52: 'J2SE 8' };

	public constantPool:ConstantPool;

	readData(stream: Stream) {
		var magic = stream.readUInt32BE();
		var minor_version = stream.readUInt16BE();
		var major_version = stream.readUInt16BE();
		var contant_pool_count = stream.readUInt16BE();

		if (magic != 3405691582) throw(new Error("Not a java class"));

		this.constantPool = new ConstantPool();
		var constants = [null, null];
		while (--contant_pool_count > 0) {
			var item = this.readConstantPoolInfo(stream);
			if (item instanceof JavaConstantLong) contant_pool_count--;
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

		var interfaces = <number[]>[];
		var fields = <JavaMemberInfo[]>[];
		var methods = <JavaMethod[]>[];
		var attributes = <JavaAttributeInfo[]>[];

		for (var n = 0, count = stream.readUInt16BE(); n < count; n++) interfaces.push(stream.readUInt16BE());
		for (var n = 0, count = stream.readUInt16BE(); n < count; n++) fields.push(this.readFieldInfo(stream));
		for (var n = 0, count = stream.readUInt16BE(); n < count; n++) methods.push(new JavaMethod(this.constantPool, this.readMethodInfo(stream)));
		for (var n = 0, count = stream.readUInt16BE(); n < count; n++) attributes.push(this.readAttributeInfo(stream));

		console.log(magic);
		console.log(minor_version);
		console.log(major_version, JavaClass.majorVersionMap[major_version]);
		console.log(contant_pool_count);
		console.log(interfaces);
		console.log(fields);
		//console.log(methods);
		//console.log(attributes);

		methods.forEach(method => {
			//console.log(method);
		});
	}

	private readConstantPoolInfo(stream: Stream): any {
		var offset = stream.position;
		var type = <CONSTANT>stream.readUInt8();

		switch (type) {
			case CONSTANT.Utf8: return new JavaConstantUtf8(stream.readBytes(stream.readUInt16BE()));
			case CONSTANT.Integer: return new JavaConstantInt(stream.readInt32BE());
			case CONSTANT.Float: throw (new Error("CONSTANT.Float"));
			case CONSTANT.Long: return new JavaConstantLong(stream.readInt32BE(), stream.readInt32BE());
			case CONSTANT.Double: throw (new Error("CONSTANT.Double"));
			case CONSTANT.Class: return new JavaConstantClassReference(stream.readUInt16BE());
			case CONSTANT.String: return new JavaConstantStringReference(stream.readUInt16BE());
			case CONSTANT.Fieldref: return new JavaConstantFieldReference(stream.readUInt16BE(), stream.readUInt16BE());
			case CONSTANT.Methodref: return new JavaConstantMethodReference(stream.readUInt16BE(), stream.readUInt16BE());
			case CONSTANT.InterfaceMethodref: return new JavaConstantInterfaceMethodReference(stream.readUInt16BE(), stream.readUInt16BE());
			case CONSTANT.NameAndType: return new JavaConstantNameTypeDescriptor(stream.readUInt16BE(), stream.readUInt16BE());
		}

		throw (new Error("Unknown type of constant pool info " + type + " at " + 'className' + ":" + offset + ":"));
	}

	private _readMemberInfo(stream: Stream) {
		var access_flags = stream.readUInt16BE(), name_index = stream.readUInt16BE(), descriptor_index = stream.readUInt16BE();
		var attributes = [];
		for (var n = 0, count = stream.readUInt16BE(); n < count; n++) attributes.push(this.readAttributeInfo(stream));
		return new JavaMemberInfo(access_flags, name_index, descriptor_index, attributes);
	}

	private readMethodInfo(stream: Stream) { return this._readMemberInfo(stream); }
	private readFieldInfo(stream: Stream) { return this._readMemberInfo(stream); }
	private readAttributeInfo(stream: Stream) { return new JavaAttributeInfo(stream.readUInt16BE(), stream.readBytes(stream.readUInt32BE())); }
}

var javaClass = new JavaClass();

javaClass.readData(new Stream(fs.readFileSync(__dirname + '/test/Bits.class')));
