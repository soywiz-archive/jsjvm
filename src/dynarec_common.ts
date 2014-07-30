import types = require('./types');
import constantpool = require('./constantpool');
import opcodes = require('./opcodes');
import instructions = require('./instructions');

import Instruction = instructions.Instruction;
import Opcode = opcodes.Opcode;

export enum InvokeType { special, static, virtual }

export interface Processor {
	_load(type: types.Any, index: number);
	_store(type: types.Any, index: number);
	_return(type: types.Any);
	convert(from: types.Any, to: types.Any);
	_const(type: types.Any, value: number);

	aaload();
	aastore();

	ldc(index: number, wide: boolean);

	invoke(type: InvokeType, ref: constantpool.JavaConstantMethodReference);

	getstatic(ref: constantpool.JavaConstantFieldReference);

	_binop(type: types.Any, op: string);

	ifcond(op: string, offset: number);
	ifcond2(op: string, offset: number);
	goto(offset: any);

	iinc(index: number, offset: number);
	_aload(type: types.Any);
	_astore(type: types.Any);

	arraylength();
	_new(clazz: constantpool.JavaConstantClassReference);
	dup();
}

export class InstructionBlock {
	private indicesByOffset = null;

	constructor(public instructions: instructions.Instruction[]) {
	}

	get length() {
		return this.instructions.length;
	}

	get first() {
		return this.instructions[0];
	}

	get last() {
		return this.instructions[this.length - 1];
	}

	rstrip(count: number) {
		return this.take(this.length - count);
	}

	skip(count: number) {
		return new InstructionBlock(this.instructions.slice(count));
	}

	take(count: number) {
		return new InstructionBlock(this.instructions.slice(0, count));
	}

	takeOffset(offset: number) {
		return this.take(this.getIndexByOffset(offset));
	}

	skipOffset(offset: number) {
		return this.skip(this.getIndexByOffset(offset));
	}

	slice(startIndex: number, endIndex: number) {
		return new InstructionBlock(this.instructions.slice(startIndex, endIndex));
	}

	sliceOffsets(startOffset: number, endOffset: number) {
		return this.slice(this.getIndexByOffset(startOffset), this.getIndexByOffset(endOffset));
	}

	firstIndex(filter: (i: Instruction) => boolean) {
		for (var n = 0; n < this.instructions.length; n++) {
			if (filter(this.instructions[n])) return n;
		}
		return -1;
	}

	getIndexByOffset(offset: number) {
		if (!this.indicesByOffset) {
			this.indicesByOffset = {};
			for (var n = 0; n < this.instructions.length; n++) {
				this.indicesByOffset[this.instructions[n].offset] = n;
			}
		}

		var index = this.indicesByOffset[offset];
		if (index === undefined) {
			console.warn(this.indicesByOffset);
			throw (new Error("Can't find offset " + offset));
		}
		return index;
	}

	forEach(callbackfn: (value: Instruction, index: number, array: Instruction[]) => void): void {
		this.instructions.forEach(callbackfn);
	}
}

export class DynarecProcessor {
	/*
	static process(processor: Processor, pool: constantpool.ConstantPool, instructions: InstructionBlock): any {
		instructions.instructions.forEach(i => {
			DynarecProcessor.processOne(processor, pool, i);
		});
	}
	*/

	static processOne(processor: Processor, pool: constantpool.ConstantPool, i: Instruction): any {
		//console.log('stackOffset:', i.stackOffset);

		var op = i.op, param = i.param, param2 = i.param2;
		//console.log(JSON.stringify(i));
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
			case Opcode.getstatic: return processor.getstatic(pool.getFieldReference(param));

			case Opcode.Return: return processor._return(new types.Void);
			case Opcode.ireturn: return processor._return(new types.Integer);
			case Opcode.freturn: return processor._return(new types.Float);
			case Opcode.dreturn: return processor._return(new types.Double);
			case Opcode.lreturn: return processor._return(new types.Long);

			case Opcode.iinc: return processor.iinc(param, param2);

			case Opcode.iadd: return processor._binop(new types.Integer, '+');
			case Opcode.isub: return processor._binop(new types.Integer, '-');
			case Opcode.idiv: return processor._binop(new types.Integer, '/');
			case Opcode.irem: return processor._binop(new types.Integer, '%');
			case Opcode.imul: return processor._binop(new types.Integer, '*');
			case Opcode.iand: return processor._binop(new types.Integer, '&');
			case Opcode.ishl: return processor._binop(new types.Integer, '<<');
			case Opcode.ishr: return processor._binop(new types.Integer, '>>');
			case Opcode.iushr: return processor._binop(new types.Integer, '>>>');

			case Opcode.ladd: return processor._binop(new types.Long, '+');
			case Opcode.lsub: return processor._binop(new types.Long, '-');
			case Opcode.ldiv: return processor._binop(new types.Long, '/');
			case Opcode.lrem: return processor._binop(new types.Long, '%');
			case Opcode.lmul: return processor._binop(new types.Long, '*');
			case Opcode.land: return processor._binop(new types.Long, '&');
			case Opcode.lshl: return processor._binop(new types.Long, '<<');
			case Opcode.lshr: return processor._binop(new types.Long, '>>');
			case Opcode.lushr: return processor._binop(new types.Long, '>>>');

			case Opcode.iaload: return processor._aload(new types.Integer);
			case Opcode.baload: return processor._aload(new types.Byte);

			case Opcode.iastore: return processor._astore(new types.Integer);
			case Opcode.bastore: return processor._astore(new types.Byte);

			case Opcode.arraylength: return processor.arraylength();
			case Opcode.new: return processor._new(pool.getClassReference(param));

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

export class DynarecInfo {
	constructor(public pool: constantpool.ConstantPool, public methodName: string, public methodType: types.Method, public max_stack: number, public max_locals: number, public is_static: boolean) {
	}
}

export interface DynarecOuput {
	code: string;
}