import utils = require('./utils');
import types = require('./types');
import constantpool = require('./constantpool');
import instructions = require('./instructions');
import dynarec_common = require('./dynarec_common');
import opcodes = require('./opcodes');

import Instruction = instructions.Instruction;
import InstructionBlock = dynarec_common.InstructionBlock;
import ConstantPool = constantpool.ConstantPool;
import OpcodeType = opcodes.OpcodeType;
import Opcode = opcodes.Opcode;

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

class NodeTernary extends Node {
	constructor(public cond: Node, public nodeIf: Node, public nodeElse: Node) { super(); }
	toString() {
		return '((' + this.cond.toString() + ') ? (' + this.nodeIf.toString() + ') : (' + this.nodeElse.toString() + '))';
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

export class Dynarec implements dynarec_common.Processor {
	constructor(private info: dynarec_common.DynarecInfo) {
	}

	static processMethod(info: dynarec_common.DynarecInfo, instructionBlock: InstructionBlock): dynarec_common.DynarecOuput {
		var output = Dynarec._processBlock(info, instructionBlock);
		//console.log('///////////////////////////// ', this.stack.length);
		if (output.stack.length) console.warn('stack length not zero at the end of the function! Probably a bug! ' + info.methodName + ' : stack: ' + JSON.stringify(output.stack));
		return output;
	}

	private static _processBlock(info: dynarec_common.DynarecInfo, instructionBlock: InstructionBlock) {
		if (instructionBlock == null) return null;

		var dynarec = new Dynarec(info);
		dynarec.process(instructionBlock);

		return { code: dynarec.body, stack: dynarec.stack };
	}

	private stack = <Node[]>[];
	private sentences = <Node[]>[];
	body = '"use strict";\n';

	writeSentence(text: string) {
		this.body += text + "\n";
	}

	process(instructionBlock: InstructionBlock) {
		var instructions = instructionBlock.instructions;
		//console.log('-----------------------------', this.methodName);
		for (var n = 0; n < instructions.length; n++) {
			var i = instructions[n];
			if (i.opcodeInfo.type == OpcodeType.Jump) {
				var jumpCondition = new NodeUnop(types.Any, <Node>this.processOne(i), '!', '');

				if (i.param > i.offset) { // if
					var blockIfStart = i.offset;
					var blockElseStart = i.param;
					var blockEndStart = -1;

					var blockIf = instructionBlock.sliceOffsets(blockIfStart, blockElseStart).skip(1);
					var blockElse = null;

					// Has goto at the end of the block.
					if (blockIf.last.op == Opcode.goto) {
						blockEndStart = blockIf.last.param;
						blockIf = blockIf.rstrip(1);
						blockElse = instructionBlock.sliceOffsets(blockElseStart, blockEndStart);
					} else {
						blockEndStart = blockElseStart;
						//blockElse = new Block
					}

					var blockIfResult = Dynarec._processBlock(this.info, blockIf);
					var blockElseResult = Dynarec._processBlock(this.info, blockElse);

					//console.log('if:' + blockIfResult.stack.length);
					//console.log('else:' + blockElseResult.stack.length);

					// Ternary operator
					if ((blockIfResult) && (blockElseResult) && (blockIfResult.stack.length == 1) && (blockElseResult.stack.length == 1)) {
						this.stack.push(new NodeTernary(jumpCondition, blockIfResult.stack[0], blockElseResult.stack[0]));

						//console.log(this.stack);

						n = instructionBlock.getIndexByOffset(blockEndStart) - 1;
					}
					// Normal if.
					else {
						if (blockIfResult && blockIfResult.stack.length) throw (new Error("if with stack mismatch! : " + blockIfResult.stack.join(',')));
						if (blockElseResult && blockElseResult.stack.length) throw (new Error("else with stack mismatch! : " + blockElseResult.stack.join(',')));
						throw (new Error("if not implemented! " + blockIf.instructions.length));
					}
				} else { // while
					throw (new Error("while not implemented!"));
				}
			} else {
				this.processOne(i);
			}
		}
	}

	private processOne(i: Instruction) {
		return dynarec_common.DynarecProcessor.processOne(this, this.info.pool, i);
	}

	private getref(index: number) {
		var argLength = this.info.methodType.arguments.length;
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
		throw (new Error("Not implemented"));
	}

	ldc(index: number, wide: boolean) {
		this.stack.push(new NodeValue(this.info.pool.getValue(index)));
	}

	invoke(invokeType: dynarec_common.InvokeType, methodInfo: constantpool.JavaConstantMethodReference) {
		var className = methodInfo.className(this.info.pool);
		var name = methodInfo.name(this.info.pool);
		var type = methodInfo.type(this.info.pool)
		var demangledType = types.demangleMethod(methodInfo.type(this.info.pool));
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

	getstatic(methodInfo: constantpool.JavaConstantFieldReference) { this.stack.push(new NodeRef(methodInfo.name(this.info.pool))); }

	_binop(type: types.Any, op: string) {
		var right = this.stack.pop();
		var left = this.stack.pop();
		this.stack.push(new NodeBinop(type, left, op, right));
	}

	ifcond(op: string, offset: number) {
		this.stack.push(new NodeValue(0));
		return this.ifcond2(op, offset);
	}

	ifcond2(op: string, offset: number): any {
		var a2 = this.stack.pop();
		var a1 = this.stack.pop();
		return new NodeBinop(new types.Integer(), a1, op, a2);
	}

	goto(offset: any): any {
		return new NodeValue(1);
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

	_new(clazz: constantpool.JavaConstantClassReference) {
		this.call('new ' + clazz.name(this.info.pool), 0);
	}

	dup() {
		var node = this.stack.pop();
		this.stack.push(new NodeRaw('(var temp = ' + this.stack.push(node.toString()) + ', temp)'));
	}

	private call(method: string, count: number) {
		var args = <Node[]>[]; for (var n = 0; n < count; n++) args.push(this.stack.pop());
		this.stack.push(new NodeCall(method, args.reverse()));
	}
}
