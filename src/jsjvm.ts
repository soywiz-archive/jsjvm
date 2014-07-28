import fs = require('fs');

function range(count: number): number[] { return Array.apply(null, { length: count }).map(Number.call, Number); }

export class Stream {
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

export class Convert {
	static CastI(value: number) { return value | 0; }
	static ConvertIC(value: number) { return (value & 0xFFFF) >>> 0; }
}

global['Convert'] = Convert;

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

export enum ACC_CLASS { PUBLIC = 0x0001, FINAL = 0x0010, SUPER = 0x0020, INTERFACE = 0x0200, ABSTRACT = 0x0400 }
export enum ACC_MEMBER { PUBLIC = 0x0001, PRIVATE = 0x0002, PROTECTED = 0x0004, STATIC = 0x0008, FINAL = 0x0010, SYNCHRONIZED = 0x0020, VOLATILE = 0x0040, TRANSIENT = 0x0080, NATIVE = 0x0100, ABSTRACT = 0x0400, STRICT = 0x0800 }
export enum CONSTANT { Utf8 = 1, Integer = 3, Float = 4, Long = 5, Double = 6, Class = 7, String = 8, Fieldref = 9, Methodref = 10, InterfaceMethodref = 11, NameAndType = 12 }

export class ConstantPool {
	public items = <JavaConstant[]>[];

	get<T>(index: number) { return <T><any>this.items[index]; }
	getValue(index: number) { return (<any>this.items[index]).value; }
	getString(index: number) { return this.get<JavaConstantUtf8>(index).string; }
	getClassName(index: number) { return this.getString(this.get<JavaConstantClassReference>(index).indexName); }

	getMethodName(index: number) {
		var mr = this.getMethodReference(index);
		var className = this.getString(this.get<JavaConstantClassReference>(mr.indexClassReference).indexName);
		var methodName = this.getString(this.get<JavaConstantNameTypeDescriptor>(mr.indexNameType).indexName);
		var typeName = this.getString(this.get<JavaConstantNameTypeDescriptor>(mr.indexNameType).indexType);
		return className + '.' + methodName + typeName;
	}

	getType(index: number) { return this.items[index].constructor; }
	getFieldReference(index: number) { return this.get<JavaConstantFieldReference>(index); }
	getMethodReference(index: number) { return this.get<JavaConstantMethodReference>(index); }
	getMethodType(index: number) { return this.getMethodReference(index).type(this); }
	dump() { this.items.forEach((item, index) => { console.log(index, item.constructor, item); }); }
}

export interface JavaConstant { }
export class JavaConstantUtf8 implements JavaConstant { string = ""; constructor(pool: ConstantPool, data: NodeBuffer) { this.string = data.toString('utf-8'); } }
export class JavaConstantInt implements JavaConstant { constructor(pool: ConstantPool, public value: number) { } }
export class JavaConstantLong implements JavaConstant { constructor(pool: ConstantPool, public low: number, public high: number) { } }
export class JavaConstantDouble implements JavaConstant { constructor(pool: ConstantPool, public value: number) { } }
export class JavaConstantClassReference implements JavaConstant {
	constructor(pool: ConstantPool, public indexName: number) { }
	name(pool: ConstantPool) { return pool.getString(this.indexName) }
}
export class JavaConstantStringReference implements JavaConstant { constructor(pool: ConstantPool, public index: number) { } }

export class JavaConstantFieldMethodReference implements JavaConstant {
	constructor(pool: ConstantPool, public indexClassReference: number, public indexNameType: number) { }
	classReference(pool: ConstantPool) { return pool.get<JavaConstantClassReference>(this.indexClassReference); }
	className(pool: ConstantPool) { return pool.getString(this.classReference(pool).indexName); }
	nameTypeDescriptor(pool: ConstantPool) { return pool.get<JavaConstantNameTypeDescriptor>(this.indexNameType); }
	name(pool: ConstantPool) { return this.nameTypeDescriptor(pool).name(pool); }
	type(pool: ConstantPool) { return this.nameTypeDescriptor(pool).type(pool); }
}

export class JavaConstantFieldReference extends JavaConstantFieldMethodReference {
	constructor(pool: ConstantPool, public indexClassReference: number, public indexNameType: number) { super(pool, indexClassReference, indexNameType); }
}
export class JavaConstantMethodReference extends JavaConstantFieldMethodReference {
	constructor(pool: ConstantPool, public indexClassReference: number, public indexNameType: number) { super(pool, indexClassReference, indexNameType); }
}
export class JavaConstantInterfaceMethodReference implements JavaConstant { constructor(pool: ConstantPool, public index1: number, public index2: number) { } }
export class JavaConstantNameTypeDescriptor implements JavaConstant {
	constructor(pool: ConstantPool, public indexName: number, public indexType: number) { }
	name(pool: ConstantPool) { return pool.getString(this.indexName); }
	type(pool: ConstantPool) { return pool.getString(this.indexType); }
}

export class JavaMemberInfo {
	constructor(public access_flags: number, public name_index: number, public descriptor_index: number, public attributes: JavaAttributeInfo[]) { }
}

export class JavaAttributeInfo { constructor(public index: number, public data: NodeBuffer) { } }

export class Instruction {
	public name: string;

	constructor(public offset: number, public op: Opcode, public param: any, public param2: any = null) {
		this.name = Opcode[op];
	}
}

export class InstructionReader {
	static read(code: Stream): Instruction {
		var offset = code.position;
		var op = <Opcode>code.readUInt8();
		switch (op) {
			case Opcode.tableswitch: throw (new Error("Not implemented tableswitch"));
			case Opcode.lookupswitch: throw (new Error("Not implemented lookupswitch"));
			case Opcode.bipush: return new Instruction(offset, op, code.readUInt8());
			case Opcode.sipush: return new Instruction(offset, op, code.readUInt16BE());
			case Opcode.ldc: return new Instruction(offset, op, code.readUInt8());
			case Opcode.iinc: return new Instruction(offset, op, code.readUInt8(), code.readInt8());
			case Opcode.newarray: throw (new Error("Not implemented newarray"));
			case Opcode.wide: throw (new Error("Not implemented wide"));
			case Opcode.multianewarray: throw (new Error("Not implemented multianewarray"));
			case Opcode.invokeinterface: throw (new Error("Not implemented invokeinterface"));
			case Opcode.invokedynamic: throw (new Error("Not implemented invokedynamic"));
			case Opcode.goto_w: case Opcode.jsr_w: throw (new Error("Not implemented branchbyte1_4_body"));

			case Opcode.iload: case Opcode.lload: case Opcode.fload: case Opcode.dload: case Opcode.aload:
			case Opcode.istore: case Opcode.lstore: case Opcode.fstore: case Opcode.dstore: case Opcode.astore: case Opcode.ret:
				return new Instruction(offset, op, code.readUInt8());

			case Opcode.ldc_w: case Opcode.ldc2_w: case Opcode.getstatic: case Opcode.putstatic:
			case Opcode.getfield: case Opcode.putfield: case Opcode.new: case Opcode.invokevirtual: case Opcode.invokespecial:
			case Opcode.invokestatic: case Opcode.anewarray: case Opcode.checkcast: case Opcode.instanceof:
				return new Instruction(offset, op, code.readUInt16BE());

			case Opcode.ifeq: case Opcode.ifne: case Opcode.iflt: case Opcode.ifge: case Opcode.ifgt: case Opcode.ifle:
			case Opcode.if_icmpeq: case Opcode.if_icmpne: case Opcode.if_icmplt: case Opcode.if_icmpge: case Opcode.if_icmpgt: case Opcode.if_icmple:
			case Opcode.if_acmpeq: case Opcode.if_acmpne: case Opcode.goto: case Opcode.jsr: case Opcode.ifnull: case Opcode.ifnonnull:
				return new Instruction(offset, op, offset + code.readInt16BE());

			default: return new Instruction(offset, op, null);
		}
	}
}

export class JavaMethod {
	public name: string;
	public methodTypeStr: string;
	public func: Function;
	public body: string;

	constructor(private pool: ConstantPool, public info: JavaMemberInfo) {
		this.name = pool.getString(info.name_index);
		this.methodTypeStr = pool.getString(info.descriptor_index);
		this.parse();
	}

	parse() {
		var methodType = JavaMethodType.demangle(this.methodTypeStr);
		console.log('JavaMethod.parse() -> ', this.name, this.methodTypeStr, methodType.mangled);
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

				var instructions = <Instruction[]>[];
				while (!code.eof) {
					instructions.push(InstructionReader.read(code));
				}

				var info = Dynarec.getFunctionCode(this.pool, this.name, methodType, max_stack, max_locals, ((this.info.access_flags & ACC_MEMBER.STATIC) != 0), instructions);
				this.func = info.func;
				this.body = info.body;
			}
		});
	}
}

class Node { toString() { return ''; } }
class NodeRef extends Node { constructor(public name: string) { super(); } toString() { return this.name; } }
class NodeRaw extends Node { constructor(public name: string) { super(); } toString() { return this.name; } }
class NodeValue extends Node { constructor(public value: number) { super(); } toString() { return String(this.value); } }
class NodeArrayAccess extends Node {
	constructor(public array: Node, public index: Node) { super(); }
	toString() { return this.array.toString() + '[' + this.index.toString() + ']'; }
}

class NodeCast extends Node {
	constructor(public type: JavaType, public node: Node) { super(); }
	toString() {
		return 'Convert.Cast' + this.type.mangled + '(' + this.node.toString() + '|0' + ')';
	}
}

class NodeBinop extends Node {
	constructor(public type: JavaType, public left: Node, public op: string, public right: Node) { super(); }
	toString() {
		return '(' + this.left.toString() + ' ' + this.op + ' ' + this.right.toString() + ')';
	}
}

class NodeUnop extends Node {
	constructor(public type: JavaType, public left: Node, public l: string, public r: string) { super(); }
	toString() { return '(' + this.l + this.left.toString() + this.r + ')'; }
}

class NodeCall extends Node {
	constructor(public methodName: string, public args: Node[]) { super(); }
	toString() { return this.methodName + '(' + this.args.map(arg => arg.toString()).join(', ') + ')'; }
}

class StringReader {
	private offset = 0;
	constructor(private reference: string) {
	}
	get length() { return this.reference.length; }
	get available() { return this.length - this.offset; }
	get eof() { return this.available <= 0; }
	read() {
		return this.reference.charAt(this.offset++);
	}
}

class JavaType {
	mangled = "";

	static demangle(data: string) { return JavaType._demangle(new StringReader(data)); }

	static _demangle(data: StringReader) {
		var type = data.read();
		switch (type) {
			case 'L':
				var out = '';
				while (!data.eof) {
					var c = data.read();
					if (c == ';') break;
					out += c;
				}
				return new JavaObject(out);
			case 'V': return new JavaVoid();
			case 'I': return new JavaInteger();
			case 'J': return new JavaLong();
			case 'F': return new JavaFloat();
			case 'B': return new JavaByte();
			case 'Z': return new JavaBoolean();
			case 'S': return new JavaShort();
			case 'C': return new JavaCharacter();
			case 'D': return new JavaDouble();
			case 'F': return new JavaFloat();
			case '[': return new JavaArray(JavaType._demangle(data));
			case ')': return null;

			default: throw (new Error("Unknown type " + type));
		}
	}
}

class JavaRef extends JavaType { mangled = ""; }
class JavaVoid extends JavaType { mangled = "V"; }
class JavaBoolean extends JavaType { mangled = "Z"; }
class JavaByte extends JavaType { mangled = "B"; }
class JavaShort extends JavaType { mangled = "S"; }
class JavaCharacter extends JavaType { mangled = "C"; public boxed_name: String = 'Ljava/lang/Character;'; }
class JavaInteger extends JavaType { mangled = "I"; }
class JavaObject extends JavaType { constructor(public type: string) { super(); this.mangled = 'T' + type + ';' } }
class JavaFloat extends JavaType { mangled = "F"; }
class JavaDouble extends JavaType { mangled = "D"; }
class JavaLong extends JavaType { mangled = "J"; }
class JavaArray extends JavaType { constructor(public type: JavaType) { super(); this.mangled = '[' + type.mangled; } }

class JavaMethodType extends JavaType {
	arguments = <JavaType[]>[];
	rettype: JavaType;
	mangled = "";

	static demangle(data: string) { return JavaMethodType._demangle(new StringReader(data)); }
	static _demangle(str: StringReader) {
		var methodType = new JavaMethodType();
		if (str.read() != '(') throw (new Error("Not a method type"));
		while (!str.eof) {
			var type: JavaType = JavaType._demangle(str);
			if (type === null) break;
			methodType.arguments.push(type);
		}
		methodType.rettype = JavaType._demangle(str);
		methodType.mangled = '(' + methodType.arguments.map(arg => arg.mangled).join('') + ')' + methodType.rettype.mangled;
		if (!str.eof) throw (new Error("Not loaded the entire string"));
		return methodType;
	}
}

class Dynarec {
	static getFunctionCode(pool: ConstantPool, methodName: string, methodType: JavaMethodType, max_stack: number, max_locals: number, is_static: boolean, instructions: Instruction[]) {
		var dynarec = new Dynarec1(pool, methodName, methodType, max_stack, max_locals, is_static);
		dynarec.process(instructions);
		var func;

		console.log(dynarec.body);

		try {
			func = Function.apply(null, range(methodType.arguments.length).map(index => 'arg' + index).concat([dynarec.body]));
		} catch (e) {
			console.error(e);
			func = null;
		}
		return { func: func, body: dynarec.body };
	}
}

enum InvokeType { special, static, virtual }

interface Processor {
	_load(type: JavaType, index: number);
	_store(type: JavaType, index: number);
	_return(type: JavaType);
	convert(from: JavaType, to: JavaType);
	_const(type: JavaType, value: number);

	aaload();
	aastore();

	ldc(index: number, wide: boolean);

	invoke(type: InvokeType, ref: JavaConstantMethodReference);

	getstatic(ref: JavaConstantFieldReference);

	_binop(type: JavaType, op: string);

	ifcond(op: string, offset: number);
	ifcond2(op: string, offset: number);
	goto(offset: any);

	iinc(index: number, offset: number);
	baload();
	bastore();

	arraylength();
	_new(clazz: JavaConstantClassReference);
	dup();
}

class LocalReference {
	constructor(public index: number) { }
}

class DynarecProcessor {
	static processOne(processor: Processor, pool:ConstantPool, i: Instruction): any {
		var op = i.op, param = i.param, param2 = i.param2;
		//console.log(i);
		switch (op) {
			case Opcode.aload_0: case Opcode.aload_1: case Opcode.aload_2: case Opcode.aload_3: return processor._load(new JavaRef, op - Opcode.aload_0);
			case Opcode.iload_0: case Opcode.iload_1: case Opcode.iload_2: case Opcode.iload_3: return processor._load(new JavaInteger, op - Opcode.iload_0);
			case Opcode.lload_0: case Opcode.lload_1: case Opcode.lload_2: case Opcode.lload_3: return processor._load(new JavaLong, op - Opcode.lload_0);
			case Opcode.fload_0: case Opcode.fload_1: case Opcode.fload_2: case Opcode.fload_3: return processor._load(new JavaFloat, op - Opcode.fload_0);
			case Opcode.dload_0: case Opcode.dload_1: case Opcode.dload_2: case Opcode.dload_3: return processor._load(new JavaDouble, op - Opcode.dload_0);

			case Opcode.aload: return processor._load(new JavaRef, param);
			case Opcode.iload: return processor._load(new JavaInteger, param);
			case Opcode.lload: return processor._load(new JavaLong, param);
			case Opcode.fload: return processor._load(new JavaFloat, param);
			case Opcode.dload: return processor._load(new JavaDouble, param);

			case Opcode.aaload: return processor.aaload();
			case Opcode.aastore: return processor.aastore();

			case Opcode.astore_0: case Opcode.astore_1: case Opcode.astore_2: case Opcode.astore_3: return processor._store(new JavaRef, op - Opcode.astore_0);
			case Opcode.istore_0: case Opcode.istore_1: case Opcode.istore_2: case Opcode.istore_3: return processor._store(new JavaInteger, op - Opcode.istore_0);
			case Opcode.lstore_0: case Opcode.lstore_1: case Opcode.lstore_2: case Opcode.lstore_3: return processor._store(new JavaLong, op - Opcode.lstore_0);
			case Opcode.fstore_0: case Opcode.fstore_1: case Opcode.fstore_2: case Opcode.fstore_3: return processor._store(new JavaFloat, op - Opcode.fstore_0);
			case Opcode.dstore_0: case Opcode.dstore_1: case Opcode.dstore_2: case Opcode.dstore_3: return processor._store(new JavaDouble, op - Opcode.dstore_0);

			case Opcode.astore: return processor._store(new JavaRef, param);
			case Opcode.istore: return processor._store(new JavaInteger, param);
			case Opcode.lstore: return processor._store(new JavaLong, param);
			case Opcode.fstore: return processor._store(new JavaFloat, param);
			case Opcode.dstore: return processor._store(new JavaDouble, param);

			case Opcode.iconst_m1: case Opcode.iconst_0: case Opcode.iconst_1: case Opcode.iconst_2: case Opcode.iconst_3: case Opcode.iconst_4: case Opcode.iconst_5: return processor._const(new JavaInteger, op - Opcode.iconst_0);
			case Opcode.lconst_0: case Opcode.lconst_1: return processor._const(new JavaLong, op - Opcode.iconst_0);
			case Opcode.sipush: return processor._const(new JavaShort, param);
			case Opcode.bipush: return processor._const(new JavaByte, param);

			case Opcode.ldc2_w: return processor.ldc(param, true);
			case Opcode.ldc: return processor.ldc(param, false);

			case Opcode.invokespecial: return processor.invoke(InvokeType.special, pool.getMethodReference(param));
			case Opcode.invokestatic: return processor.invoke(InvokeType.static, pool.getMethodReference(param));
			case Opcode.invokevirtual: return processor.invoke(InvokeType.virtual, pool.getMethodReference(param));
			case Opcode.getstatic: return processor.getstatic(pool.get<JavaConstantFieldReference>(param));

			case Opcode.Return: return processor._return(new JavaVoid);
			case Opcode.ireturn: return processor._return(new JavaInteger);
			case Opcode.freturn: return processor._return(new JavaFloat);
			case Opcode.dreturn: return processor._return(new JavaDouble);
			case Opcode.lreturn: return processor._return(new JavaLong);

			case Opcode.iinc: return processor.iinc(param, param2);

			case Opcode.iadd: return processor._binop(new JavaInteger, '+');
			case Opcode.isub: return processor._binop(new JavaInteger, '-');
			case Opcode.iand: return processor._binop(new JavaInteger, '&');
			case Opcode.ishl: return processor._binop(new JavaInteger, '<<');
			case Opcode.ishr: return processor._binop(new JavaInteger, '>>');
			case Opcode.iushr: return processor._binop(new JavaInteger, '>>>');

			case Opcode.ladd: return processor._binop(new JavaLong, '+');
			case Opcode.lsub: return processor._binop(new JavaLong, '+');
			case Opcode.land: return processor._binop(new JavaLong, '&');
			case Opcode.lshl: return processor._binop(new JavaLong, '<<');
			case Opcode.lshr: return processor._binop(new JavaLong, '>>');
			case Opcode.lushr: return processor._binop(new JavaLong, '>>>');

			case Opcode.baload: return processor.baload();
			case Opcode.bastore: return processor.bastore();

			case Opcode.arraylength: return processor.arraylength();
			case Opcode.new: return processor._new(pool.get<JavaConstantClassReference>(param));

			case Opcode.dup: return processor.dup();

			case Opcode.i2b: return processor.convert(new JavaInteger, new JavaByte);
			case Opcode.i2c: return processor.convert(new JavaInteger, new JavaCharacter);
			case Opcode.i2d: return processor.convert(new JavaInteger, new JavaDouble);
			case Opcode.i2f: return processor.convert(new JavaInteger, new JavaFloat);
			case Opcode.i2l: return processor.convert(new JavaInteger, new JavaLong);
			case Opcode.i2s: return processor.convert(new JavaInteger, new JavaShort);
			case Opcode.l2d: return processor.convert(new JavaLong, new JavaDouble);
			case Opcode.l2f: return processor.convert(new JavaLong, new JavaFloat);
			case Opcode.l2i: return processor.convert(new JavaLong, new JavaInteger);

			case Opcode.ifeq: return processor.ifcond('==', param);
			case Opcode.ifne: return processor.ifcond('!=', param);
			case Opcode.ifge: return processor.ifcond('>=', param);
			case Opcode.ifgt: return processor.ifcond('>', param);
			case Opcode.ifle: return processor.ifcond('<=', param);
			case Opcode.iflt: return processor.ifcond('<', param);

			case Opcode.if_icmpeq: return processor.ifcond2('==', param);
			case Opcode.if_icmpne: return processor.ifcond2('!=', param);
			case Opcode.if_icmpge: return processor.ifcond2('>=', param);
			case Opcode.if_icmpgt: return processor.ifcond2('>', param);
			case Opcode.if_icmple: return processor.ifcond2('<=', param);
			case Opcode.if_icmplt: return processor.ifcond2('<', param);

			case Opcode.goto: return processor.goto(param);

			default:
				throw (new Error("Not implemented opcode " + i.name + '(' + i.op + ')' + "!"));
		}
	}
}

class Dynarec0 implements Processor {
	constructor(private pool: ConstantPool, private methodName: string, private methodType: JavaMethodType, private max_stack: number, private max_locals: number, private is_static: boolean) {
	}

	body = '"use strict"; var stack = []; var locals = []; var label = 0;\n';

	writeSentence(text: string) {
		this.body += text + "\n";
	}

	process(instructions: Instruction[]) {
		for (var n = 0; n < this.max_locals; n++) {
			this.writeSentence("locals[" + n + "] = { value: null };");
		}
		for (var n = 0; n < this.methodType.arguments.length; n++) {
			this.writeSentence("arg" + n + " = { value: arg" + n + " };");
		}
		this.writeSentence('while (true) switch (label) {');
		instructions.forEach(i => {
			this.body += 'case ' + i.offset + ': ';
			this.processOne(i);
		});
		this.writeSentence('}');
	}

	processOne(i :Instruction) {
		DynarecProcessor.processOne(this, this.pool, i);
	}

	private call(method: string, count: number) {
		this.writeSentence('stack.push(' + method + '(stack.splice(stack.length - ' + count + '))); // call');
	}

	private call_void(method: string, count: number) {
		this.writeSentence('' + method + '(stack.splice(stack.length - ' + count + ')); // call_void');
	}

	private getref(index: number) {
		var argLength = this.methodType.arguments.length;
		if (index < argLength) {
			return 'arg' + (index);
		} else {
			return 'locals[' + (index - argLength) + ']';
		}
	}

	_load(type: JavaType, index: number) {
		if (type instanceof JavaRef) {
			this.writeSentence('stack.push(' + this.getref(index) + '); // aload');
		} else {
			this.writeSentence('stack.push(' + this.getref(index) + '.value); // _load');
		}
	}
	_return(type: JavaType) {
		if (type instanceof JavaVoid) {
			this.writeSentence('return;');
		} else {
			this.writeSentence('return stack.pop(); // _return');
		}
	}

	invoke(invokeType: InvokeType, methodInfo: JavaConstantMethodReference) {
		var className = methodInfo.className(this.pool);
		var name = methodInfo.name(this.pool);
		var type = methodInfo.type(this.pool)
		var demangledType = JavaMethodType.demangle(methodInfo.type(this.pool));
		var argCount = demangledType.arguments.length;

		//if (invoketype == 'static') argCount++;

		if (demangledType.rettype instanceof JavaVoid) {
			this.call(name, argCount);
		} else {
			this.call_void(name, argCount);
		}
	}

	_store(type: JavaType, index: number) { this.writeSentence(this.getref(index) + '.value = stack.pop(); // _store'); }
	convert(from: JavaType, to: JavaType) { this.writeSentence('stack.push(Convert.Convert' + from.mangled + to.mangled + '(stack.pop())); // _const'); }
	_const(type: JavaType, value: number) { this.writeSentence('stack.push(' + value + '); // _const'); }
	aaload() { this.writeSentence('var i = stack.pop(), aref = stack.pop(); stack.push(aref.value[i]); // aaload'); }
	aastore() { throw (new Error("Not implemented!")); }
	ldc(index: number, wide: boolean) { this.writeSentence('stack.push(' + this.pool.getValue(index) + '); // ldc'); }
	getstatic(methodInfo: JavaConstantFieldReference) { this.writeSentence('stack.push(getstatic(' + methodInfo.name(this.pool) + ')); // getstatic'); }
	_binop(type: JavaType, op: string) {
		if (type instanceof JavaInteger) {
			this.writeSentence('var r = stack.pop(), l = stack.pop(); stack.push(l ' + op + ' r); // ibinop(' + op + ')');
		} else {
			this.writeSentence('var r = stack.pop(), l = stack.pop(); stack.push(Long["' + op + '"](l, r)); // lbinop(' + op + ')');
		}
	}
	ifcond(op: string, offset: number) { this.writeSentence('if (stack.pop() ' + op + ' 0) { label = ' + offset + '; break; } // ifcond(' + op + ')'); }
	ifcond2(op: string, offset: number) { this.writeSentence('if (stack.pop() ' + op + ' stack.pop()) { label = ' + offset + '; break; } // ifcond2(' + op + ')'); }
	goto(offset: any) { this.writeSentence('{ label = ' + offset + '; break; }; // goto'); }
	iinc(local: number, increment: number) { this.writeSentence(this.getref(local) + ' = ' + this.getref(local) + ' + ' + increment + '; // iinc'); }
	baload() { this.writeSentence('var i = stack.pop(), aref = stack.pop(); stack.push(aref.value[i]); // baload'); }
	bastore() { this.writeSentence('var val = stack.pop(), i = stack.pop(), aref = stack.pop(); aref.value[i] = val; // bastore'); }
	arraylength() { this.writeSentence('stack.push(Convert.arraylength(stack.pop())); // arraylength'); }
	_new(clazz: JavaConstantClassReference) { this.writeSentence('stack.push(new ' + this.pool.getString(clazz.indexName) + '()); // new'); }
	dup() { this.writeSentence('stack.push(stack[stack.length - 1]); // dup'); }
}

class Dynarec1 implements Processor {
	constructor(private pool: ConstantPool, private methodName: string, private methodType: JavaMethodType, private max_stack: number, private max_locals: number, private is_static: boolean) {
	}

	stack = <Node[]>[];
	body = '"use strict";\n';

	writeSentence(text: string) {
		this.body += text + "\n";
	}

	process(instructions: Instruction[]) {
		console.log('-----------------------------', this.methodName);
		instructions.forEach(i => {
			this.processOne(i);
		});
		console.log('///////////////////////////// ', this.stack.length);
		if (this.stack.length) console.warn('stack length not zero at the end of the function! Probably a bug!');
	}

	processOne(i: Instruction) {
		DynarecProcessor.processOne(this, this.pool, i);
	}

	private getref(index: number) {
		var argLength = this.methodType.arguments.length;
		if (index < argLength) {
			return new NodeRef('arg' + (index) + '');
		} else {
			return new NodeRef('local_' + (index - argLength));
		}
	}

	_load(type: JavaType, index: number) {
		if (type instanceof JavaRef) {
			this.stack.push(this.getref(index));
		} else {
			this.stack.push(new NodeCast(type, this.getref(index)));
		}
	}

	_store(type: JavaType, index: number) {
		var ref = this.stack.pop(); this.writeSentence(this.getref(index).name + ' = ' + ref.toString() + ';');
	}

	_return(type: JavaType) {
		if (type instanceof JavaVoid) {
			this.writeSentence('return;');
		} else {
			this.writeSentence('return ' + this.stack.pop().toString() + ';');
		}
	}

	convert(from: JavaType, to: JavaType) {
		this.stack.push(new NodeCall('Convert.Convert' + from.mangled + to.mangled, [this.stack.pop()]));
	}

	_const(type: JavaType, value: number) {
		this.stack.push(new NodeValue(value)); 
	}

	aaload() {
		var index = this.stack.pop();
		var arrayref = this.stack.pop();
		this.stack.push(new NodeArrayAccess(arrayref, index));
	}
	aastore() {
		throw(new Error("Not implemented"));
	}

	ldc(index: number, wide: boolean) {
		this.stack.push(new NodeValue(this.pool.getValue(index)));
	}

	invoke(invokeType: InvokeType, methodInfo: JavaConstantMethodReference) {
		var className = methodInfo.className(this.pool);
		var name = methodInfo.name(this.pool);
		var type = methodInfo.type(this.pool)
		var demangledType = JavaMethodType.demangle(methodInfo.type(this.pool));
		var argCount = demangledType.arguments.length;
		var args = <Node[]>[];

		//if (invoketype == 'static') argCount++;

		for (var n = 0; n < argCount; n++) {
			args.push(this.stack.pop());
		}

		var call = new NodeCall(name, args);

		if (demangledType.rettype instanceof JavaVoid) {
			this.writeSentence(call.toString() + ";");
		} else {
			this.stack.push(call);
		}
	}

	getstatic(methodInfo: JavaConstantFieldReference) { this.stack.push(new NodeRef(methodInfo.name(this.pool))); }

	_binop(type: JavaType, op: string) {
		var right = this.stack.pop();
		var left = this.stack.pop();
		this.stack.push(new NodeBinop(type, left, op, right));
	}

	ifcond(op: string, offset: number) {
		var a1 = this.stack.pop();
		//var a2 = this.stack.pop();
		this.writeSentence('if (' + a1.toString() + op + ' ' + 0 + ') goto ' + offset + ';');
	}

	ifcond2(op: string, offset: number) {
		var a2 = this.stack.pop();
		var a1 = this.stack.pop();
		this.writeSentence('if (' + a1.toString() + op + a2.toString() + ') goto ' + offset + ';');
	}

	goto(offset: any) {
		this.writeSentence('goto L_' + offset + ';');
	}

	iinc(local: number, increment: number) {
		this.writeSentence(this.getref(local).toString() + ' = ' + this.getref(local).toString() + ' + ' + increment);
	}

	baload() {
		var index = this.stack.pop();
		var ref = this.stack.pop();
		this.stack.push(new NodeArrayAccess(ref, index));
	}

	bastore() {
		var value = this.stack.pop();
		var index = this.stack.pop();
		var ref = this.stack.pop();
		this.writeSentence(ref.toString() + '[' + index.toString() + '] = ' + value.toString());
	}

	arraylength() {
		this.stack.push(new NodeCall('Convert.arraylength', [this.stack.pop()]));
	}
	_new(clazz: JavaConstantClassReference) { this.call('new ' + clazz.name(this.pool), 0); }
	dup() {
		var node = this.stack.pop();
		this.stack.push(new NodeRaw('(var temp = ' + this.stack.push(node.toString()) + ', temp)'));
	}

	private call(method: string, count: number) {
		var args = <Node[]>[]; for (var n = 0; n < count; n++) args.push(this.stack.pop());
		this.stack.push(new NodeCall(method, args.reverse()));
	}
}

export class JavaClass {
	static majorVersionMap = { 45: 'JDK 1.1', 46: 'JDK 1.2', 47: 'JDK 1.3', 48: 'JDK 1.4', 49: 'J2SE 5.0', 50: 'J2SE 6.0', 51: 'J2SE 7', 52: 'J2SE 8' };

	public constantPool: ConstantPool;
	private methods = <JavaMethod[]>[];

	static fromStream(stream: Stream) {
		var javaClass = new JavaClass();
		javaClass.readData(stream);
		return javaClass;
	}

	readData(stream: Stream) {
		var magic = stream.readUInt32BE();
		if (magic != 3405691582) throw (new Error("Not a java class"));

		var minor_version = stream.readUInt16BE();
		var major_version = stream.readUInt16BE();
		var contant_pool_count = stream.readUInt16BE();

		this.constantPool = new ConstantPool();
		for (var index = 1; index < contant_pool_count; index++) {
			var item = this.constantPool.items[index] = JavaClass.readConstantPoolInfo(this.constantPool, stream);
			if (item instanceof JavaConstantLong || item instanceof JavaConstantDouble) index++;
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

		var interfaces = <number[]>[];
		var fields = <JavaMemberInfo[]>[];
		var attributes = <JavaAttributeInfo[]>[];

		for (var n = 0, count = stream.readUInt16BE(); n < count; n++) interfaces.push(stream.readUInt16BE());
		for (var n = 0, count = stream.readUInt16BE(); n < count; n++) fields.push(this.readFieldInfo(stream));
		for (var n = 0, count = stream.readUInt16BE(); n < count; n++) this.methods.push(new JavaMethod(this.constantPool, this.readMethodInfo(stream)));
		for (var n = 0, count = stream.readUInt16BE(); n < count; n++) attributes.push(this.readAttributeInfo(stream));

		console.log(magic);
		console.log(minor_version);
		console.log(major_version, JavaClass.majorVersionMap[major_version]);
		console.log(contant_pool_count);
		console.log(interfaces);
		console.log(fields);
		//console.log(methods);
		//console.log(attributes);
	}

	getMethod(name: string, type: string = '') {
		for (var n = 0; n < this.methods.length; n++) {
			var method = this.methods[n];
			if (method.name == name) return method;
		}
		return null;
	}

	private static readConstantPoolInfo(pool: ConstantPool, stream: Stream): any {
		var offset = stream.position;
		var type = <CONSTANT>stream.readUInt8();

		switch (type) {
			case CONSTANT.Utf8: return new JavaConstantUtf8(pool, stream.readBytes(stream.readUInt16BE()));
			case CONSTANT.Integer: return new JavaConstantInt(pool, stream.readInt32BE());
			case CONSTANT.Float: throw (new Error("CONSTANT.Float"));
			case CONSTANT.Long: return new JavaConstantLong(pool, stream.readInt32BE(), stream.readInt32BE());
			case CONSTANT.Double: throw (new Error("CONSTANT.Double"));
			case CONSTANT.Class: return new JavaConstantClassReference(pool, stream.readUInt16BE());
			case CONSTANT.String: return new JavaConstantStringReference(pool, stream.readUInt16BE());
			case CONSTANT.Fieldref: return new JavaConstantFieldReference(pool, stream.readUInt16BE(), stream.readUInt16BE());
			case CONSTANT.Methodref: return new JavaConstantMethodReference(pool, stream.readUInt16BE(), stream.readUInt16BE());
			case CONSTANT.InterfaceMethodref: return new JavaConstantInterfaceMethodReference(pool, stream.readUInt16BE(), stream.readUInt16BE());
			case CONSTANT.NameAndType: return new JavaConstantNameTypeDescriptor(pool, stream.readUInt16BE(), stream.readUInt16BE());
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
