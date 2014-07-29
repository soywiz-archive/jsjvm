import fs = require('fs');

import opcodes = require('./opcodes');
import utils = require('./utils');
import types = require('./types');
export import Stream = utils.Stream;

require('./runtime');

import Opcode = opcodes.Opcode;
import OpcodeInfo = opcodes.OpcodeInfo;
import ParamType = opcodes.ParamType;

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

	constructor(public offset: number, public op: Opcode, public stackOffset: number, public param: any, public param2: any = null) {
		this.name = Opcode[op];
	}
}

export class InstructionReader {
	static read(pool:ConstantPool, code: Stream): Instruction {
		var offset = code.position;
		var op = <Opcode>code.readUInt8();
		var stackOffset = 0;
		switch (op) {
			case Opcode.tableswitch: throw (new Error("Not implemented tableswitch"));
			case Opcode.lookupswitch: throw (new Error("Not implemented lookupswitch"));
			case Opcode.bipush: return new Instruction(offset, op, stackOffset, code.readUInt8());
			case Opcode.sipush: return new Instruction(offset, op, stackOffset, code.readUInt16BE());
			case Opcode.ldc: return new Instruction(offset, op, stackOffset, code.readUInt8());
			case Opcode.iinc: return new Instruction(offset, op, stackOffset, code.readUInt8(), code.readInt8());
			case Opcode.newarray: throw (new Error("Not implemented newarray"));
			case Opcode.wide: throw (new Error("Not implemented wide"));
			case Opcode.multianewarray: throw (new Error("Not implemented multianewarray"));
			case Opcode.invokeinterface: throw (new Error("Not implemented invokeinterface"));
			case Opcode.invokedynamic: throw (new Error("Not implemented invokedynamic"));
			case Opcode.goto_w: case Opcode.jsr_w: throw (new Error("Not implemented branchbyte1_4_body"));

			case Opcode.iload: case Opcode.lload: case Opcode.fload: case Opcode.dload: case Opcode.aload:
			case Opcode.istore: case Opcode.lstore: case Opcode.fstore: case Opcode.dstore: case Opcode.astore: case Opcode.ret:
				return new Instruction(offset, op, stackOffset, code.readUInt8());

			case Opcode.ldc_w: case Opcode.ldc2_w: case Opcode.getstatic: case Opcode.putstatic:
			case Opcode.getfield: case Opcode.putfield: case Opcode.new: case Opcode.invokevirtual: case Opcode.invokespecial:
			case Opcode.invokestatic: case Opcode.anewarray: case Opcode.checkcast: case Opcode.instanceof:
				return new Instruction(offset, op, stackOffset, code.readUInt16BE());

			case Opcode.ifeq: case Opcode.ifne: case Opcode.iflt: case Opcode.ifge: case Opcode.ifgt: case Opcode.ifle:
			case Opcode.if_icmpeq: case Opcode.if_icmpne: case Opcode.if_icmplt: case Opcode.if_icmpge: case Opcode.if_icmpgt: case Opcode.if_icmple:
			case Opcode.if_acmpeq: case Opcode.if_acmpne: case Opcode.goto: case Opcode.jsr: case Opcode.ifnull: case Opcode.ifnonnull:
				return new Instruction(offset, op, stackOffset, offset + code.readInt16BE());

			default: return new Instruction(offset, op, stackOffset, null);
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
		var methodType = types.demangleMethod(this.methodTypeStr);
		//console.log('JavaMethod.parse() -> ', this.name, this.methodTypeStr, methodType.mangled);
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
				//console.log('max_stack_locals', max_stack, max_locals);

				var instructions = <Instruction[]>[];
				while (!code.eof) {
					instructions.push(InstructionReader.read(this.pool, code));
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
	constructor(public type: types.Any, public node: Node) { super(); }
	toString() {
		return 'Convert.Cast' + this.type.mangled + '(' + this.node.toString() + '|0' + ')';
	}
}

class NodeBinop extends Node {
	constructor(public type: types.Any, public left: Node, public op: string, public right: Node) { super(); }
	toString() {
		return '(' + this.left.toString() + ' ' + this.op + ' ' + this.right.toString() + ')';
	}
}

class NodeUnop extends Node {
	constructor(public type: types.Any, public left: Node, public l: string, public r: string) { super(); }
	toString() { return '(' + this.l + this.left.toString() + this.r + ')'; }
}

class NodeCall extends Node {
	constructor(public methodName: string, public args: Node[]) { super(); }
	toString() { return this.methodName + '(' + this.args.map(arg => arg.toString()).join(', ') + ')'; }
}


class Dynarec {
	static getFunctionCode(pool: ConstantPool, methodName: string, methodType: types.Method, max_stack: number, max_locals: number, is_static: boolean, instructions: Instruction[]) {
		var dynarec = new Dynarec1(pool, methodName, methodType, max_stack, max_locals, is_static);
		dynarec.process(instructions);
		var func;

		//console.log(dynarec.body);

		try {
			func = Function.apply(null, utils.range(methodType.arguments.length).map(index => 'arg' + index).concat([dynarec.body]));
		} catch (e) {
			console.info(dynarec.body);
			console.error(e);
			func = null;
		}
		return { func: func, body: dynarec.body };
	}
}

enum InvokeType { special, static, virtual }

interface Processor {
	_load(type: types.Any, index: number);
	_store(type: types.Any, index: number);
	_return(type: types.Any);
	convert(from: types.Any, to: types.Any);
	_const(type: types.Any, value: number);

	aaload();
	aastore();

	ldc(index: number, wide: boolean);

	invoke(type: InvokeType, ref: JavaConstantMethodReference);

	getstatic(ref: JavaConstantFieldReference);

	_binop(type: types.Any, op: string);

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
			case Opcode.aload_0: case Opcode.aload_1: case Opcode.aload_2: case Opcode.aload_3: return processor._load(new types.Ref, op - Opcode.aload_0);
			case Opcode.iload_0: case Opcode.iload_1: case Opcode.iload_2: case Opcode.iload_3: return processor._load(new types.Integer, op - Opcode.iload_0);
			case Opcode.lload_0: case Opcode.lload_1: case Opcode.lload_2: case Opcode.lload_3: return processor._load(new types.Long, op - Opcode.lload_0);
			case Opcode.fload_0: case Opcode.fload_1: case Opcode.fload_2: case Opcode.fload_3: return processor._load(new types.Float, op - Opcode.fload_0);
			case Opcode.dload_0: case Opcode.dload_1: case Opcode.dload_2: case Opcode.dload_3: return processor._load(new types.Double, op - Opcode.dload_0);

			case Opcode.aload: return processor._load(new types.Ref, param);
			case Opcode.iload: return processor._load(new types.Integer, param);
			case Opcode.lload: return processor._load(new types.Long, param);
			case Opcode.fload: return processor._load(new types.Float, param);
			case Opcode.dload: return processor._load(new types.Double, param);

			case Opcode.aaload: return processor.aaload();
			case Opcode.aastore: return processor.aastore();

			case Opcode.astore_0: case Opcode.astore_1: case Opcode.astore_2: case Opcode.astore_3: return processor._store(new types.Ref, op - Opcode.astore_0);
			case Opcode.istore_0: case Opcode.istore_1: case Opcode.istore_2: case Opcode.istore_3: return processor._store(new types.Integer, op - Opcode.istore_0);
			case Opcode.lstore_0: case Opcode.lstore_1: case Opcode.lstore_2: case Opcode.lstore_3: return processor._store(new types.Long, op - Opcode.lstore_0);
			case Opcode.fstore_0: case Opcode.fstore_1: case Opcode.fstore_2: case Opcode.fstore_3: return processor._store(new types.Float, op - Opcode.fstore_0);
			case Opcode.dstore_0: case Opcode.dstore_1: case Opcode.dstore_2: case Opcode.dstore_3: return processor._store(new types.Double, op - Opcode.dstore_0);

			case Opcode.astore: return processor._store(new types.Ref, param);
			case Opcode.istore: return processor._store(new types.Integer, param);
			case Opcode.lstore: return processor._store(new types.Long, param);
			case Opcode.fstore: return processor._store(new types.Float, param);
			case Opcode.dstore: return processor._store(new types.Double, param);

			case Opcode.iconst_m1: case Opcode.iconst_0: case Opcode.iconst_1: case Opcode.iconst_2: case Opcode.iconst_3: case Opcode.iconst_4: case Opcode.iconst_5: return processor._const(new types.Integer, op - Opcode.iconst_0);
			case Opcode.lconst_0: case Opcode.lconst_1: return processor._const(new types.Long, op - Opcode.iconst_0);
			case Opcode.sipush: return processor._const(new types.Short, param);
			case Opcode.bipush: return processor._const(new types.Byte, param);

			case Opcode.ldc2_w: return processor.ldc(param, true);
			case Opcode.ldc: return processor.ldc(param, false);

			case Opcode.invokespecial: return processor.invoke(InvokeType.special, pool.getMethodReference(param));
			case Opcode.invokestatic: return processor.invoke(InvokeType.static, pool.getMethodReference(param));
			case Opcode.invokevirtual: return processor.invoke(InvokeType.virtual, pool.getMethodReference(param));
			case Opcode.getstatic: return processor.getstatic(pool.get<JavaConstantFieldReference>(param));

			case Opcode.Return: return processor._return(new types.Void);
			case Opcode.ireturn: return processor._return(new types.Integer);
			case Opcode.freturn: return processor._return(new types.Float);
			case Opcode.dreturn: return processor._return(new types.Double);
			case Opcode.lreturn: return processor._return(new types.Long);

			case Opcode.iinc: return processor.iinc(param, param2);

			case Opcode.iadd: return processor._binop(new types.Integer, '+');
			case Opcode.isub: return processor._binop(new types.Integer, '-');
			case Opcode.iand: return processor._binop(new types.Integer, '&');
			case Opcode.ishl: return processor._binop(new types.Integer, '<<');
			case Opcode.ishr: return processor._binop(new types.Integer, '>>');
			case Opcode.iushr: return processor._binop(new types.Integer, '>>>');

			case Opcode.ladd: return processor._binop(new types.Long, '+');
			case Opcode.lsub: return processor._binop(new types.Long, '+');
			case Opcode.land: return processor._binop(new types.Long, '&');
			case Opcode.lshl: return processor._binop(new types.Long, '<<');
			case Opcode.lshr: return processor._binop(new types.Long, '>>');
			case Opcode.lushr: return processor._binop(new types.Long, '>>>');

			case Opcode.baload: return processor.baload();
			case Opcode.bastore: return processor.bastore();

			case Opcode.arraylength: return processor.arraylength();
			case Opcode.new: return processor._new(pool.get<JavaConstantClassReference>(param));

			case Opcode.dup: return processor.dup();

			case Opcode.i2b: return processor.convert(new types.Integer, new types.Byte);
			case Opcode.i2c: return processor.convert(new types.Integer, new types.Character);
			case Opcode.i2d: return processor.convert(new types.Integer, new types.Double);
			case Opcode.i2f: return processor.convert(new types.Integer, new types.Float);
			case Opcode.i2l: return processor.convert(new types.Integer, new types.Long);
			case Opcode.i2s: return processor.convert(new types.Integer, new types.Short);
			case Opcode.l2d: return processor.convert(new types.Long, new types.Double);
			case Opcode.l2f: return processor.convert(new types.Long, new types.Float);
			case Opcode.l2i: return processor.convert(new types.Long, new types.Integer);

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
	constructor(private pool: ConstantPool, private methodName: string, private methodType: types.Method, private max_stack: number, private max_locals: number, private is_static: boolean) {
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

	_load(type: types.Any, index: number) {
		if (type instanceof types.Ref) {
			this.writeSentence('stack.push(' + this.getref(index) + '); // aload');
		} else {
			this.writeSentence('stack.push(' + this.getref(index) + '.value); // _load');
		}
	}
	_return(type: types.Any) {
		if (type instanceof types.Void) {
			this.writeSentence('return;');
		} else {
			this.writeSentence('return stack.pop(); // _return');
		}
	}

	invoke(invokeType: InvokeType, methodInfo: JavaConstantMethodReference) {
		var className = methodInfo.className(this.pool);
		var name = methodInfo.name(this.pool);
		var type = methodInfo.type(this.pool)
		var demangledType = types.demangleMethod(methodInfo.type(this.pool));
		var argCount = demangledType.arguments.length;

		//if (invoketype == 'static') argCount++;

		if (demangledType.rettype instanceof types.Void) {
			this.call(name, argCount);
		} else {
			this.call_void(name, argCount);
		}
	}

	_store(type: types.Any, index: number) { this.writeSentence(this.getref(index) + '.value = stack.pop(); // _store'); }
	convert(from: types.Any, to: types.Any) { this.writeSentence('stack.push(Convert.Convert' + from.mangled + to.mangled + '(stack.pop())); // _const'); }
	_const(type: types.Any, value: number) { this.writeSentence('stack.push(' + value + '); // _const'); }
	aaload() { this.writeSentence('var i = stack.pop(), aref = stack.pop(); stack.push(aref.value[i]); // aaload'); }
	aastore() { throw (new Error("Not implemented!")); }
	ldc(index: number, wide: boolean) { this.writeSentence('stack.push(' + this.pool.getValue(index) + '); // ldc'); }
	getstatic(methodInfo: JavaConstantFieldReference) { this.writeSentence('stack.push(getstatic(' + methodInfo.name(this.pool) + ')); // getstatic'); }
	_binop(type: types.Any, op: string) {
		if (type instanceof types.Integer) {
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
	constructor(private pool: ConstantPool, private methodName: string, private methodType: types.Method, private max_stack: number, private max_locals: number, private is_static: boolean) {
	}

	stack = <Node[]>[];
	body = '"use strict";\n';

	writeSentence(text: string) {
		this.body += text + "\n";
	}

	process(instructions: Instruction[]) {
		//console.log('-----------------------------', this.methodName);
		instructions.forEach(i => {
			this.processOne(i);
		});
		//console.log('///////////////////////////// ', this.stack.length);
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

	_load(type: types.Any, index: number) {
		if (type instanceof types.Ref) {
			this.stack.push(this.getref(index));
		} else {
			this.stack.push(new NodeCast(type, this.getref(index)));
		}
	}

	_store(type: types.Any, index: number) {
		var ref = this.stack.pop(); this.writeSentence(this.getref(index).name + ' = ' + ref.toString() + ';');
	}

	_return(type: types.Any) {
		if (type instanceof types.Void) {
			this.writeSentence('return;');
		} else {
			this.writeSentence('return ' + this.stack.pop().toString() + ';');
		}
	}

	convert(from: types.Any, to: types.Any) {
		this.stack.push(new NodeCall('Convert.Convert' + from.mangled + to.mangled, [this.stack.pop()]));
	}

	_const(type: types.Any, value: number) {
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
		var demangledType = types.demangleMethod(methodInfo.type(this.pool));
		var argCount = demangledType.arguments.length;
		var args = <Node[]>[];

		//if (invoketype == 'static') argCount++;

		for (var n = 0; n < argCount; n++) {
			args.push(this.stack.pop());
		}

		var call = new NodeCall(name, args);

		if (demangledType.rettype instanceof types.Void) {
			this.writeSentence(call.toString() + ";");
		} else {
			this.stack.push(call);
		}
	}

	getstatic(methodInfo: JavaConstantFieldReference) { this.stack.push(new NodeRef(methodInfo.name(this.pool))); }

	_binop(type: types.Any, op: string) {
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

		//this.constantPool.dump();

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

		//console.log(magic);
		//console.log(minor_version);
		//console.log(major_version, JavaClass.majorVersionMap[major_version]);
		//console.log(contant_pool_count);
		//console.log(interfaces);
		//console.log(fields);
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
