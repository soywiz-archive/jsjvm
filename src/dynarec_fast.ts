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
	toString() { return 'Convert.Cast' + this.type.mangled + '(' + this.node.toString() + '|0' + ')'; }
}

class NodeBinop extends Node {
	constructor(public type: types.Any, public left: Node, public op: string, public right: Node) { super(); }
	toString() { return '(' + this.left.toString() + ' ' + this.op + ' ' + this.right.toString() + ')'; }
}

class NodeTernary extends Node {
	constructor(public cond: Node, public nodeIf: Node, public nodeElse: Node) { super(); }
	toString() { return '((' + this.cond.toString() + ') ? (' + this.nodeIf.toString() + ') : (' + this.nodeElse.toString() + '))'; }
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

	static processMethod(info: dynarec_common.DynarecInfo, block: InstructionBlock): dynarec_common.DynarecOuput {
		var output = Dynarec._processBlock(info, block);
		//console.log('///////////////////////////// ', this.stack.length);
		if (output.stack.length) console.warn('stack length not zero at the end of the function! Probably a bug! ' + info.methodName + ' : stack: ' + JSON.stringify(output.stack));

		var header = '';
		header += '"use strict";\n';
		for (var n = 0; n < info.max_locals - info.methodType.arguments.length; n++) header += 'var local_' + n + ' = 0;\n';
		output.code = header + output.code;

		//console.log(info.methodName + ': ' + output.code);

		return output;
	}

	private static _processBlock(info: dynarec_common.DynarecInfo, block: InstructionBlock) {
		if (block == null) return null;

		var dynarec = new Dynarec(info);

		dynarec.processFlow(block);

		return { code: dynarec.body, stack: dynarec.stack };
	}

	private stack = <Node[]>[];
	private sentences = <Node[]>[];
	body = '';

	writeSentence(text: string) {
		this.body += text + "\n";
	}

	processFlow(block: InstructionBlock) {
		var instructions = block.instructions;
		var startIndex = block.firstIndex(i => i.opcodeInfo.type == OpcodeType.Jump);
		if (startIndex < 0) {
			return this.processBasicBlock(block);
		}

		// Process basic block until this point
		//this.processBasicBlock(instructionBlock.take(startIndex));
		var i = instructions[startIndex];
		var startOffset = i.offset;
		var jumpOffset = i.param;

		if (jumpOffset > startOffset) { // if/ternary/while
			var firstBlock = block.sliceOffsets(startOffset, jumpOffset);

			// Has goto at the end of the block.
			if (firstBlock.last.op == Opcode.goto) {
				var secondJumpOffset = firstBlock.last.param;
				//firstBlock = firstBlock.rstrip(1);

				// Possible while?
				if (secondJumpOffset < jumpOffset) {
					return this.processFlowWhile(block, secondJumpOffset, startOffset, jumpOffset);
				} else {
					return this.processFlowIfElseTernary(block, startOffset, jumpOffset, secondJumpOffset);
				}
			} else {
				return this.processFlowIf(block, startOffset, jumpOffset);
			}
		} else { // possible do...while?
			throw (new Error("while not implemented!"));
		}

	}

	processFlowIf(block: InstructionBlock, startOffset: number, jumpOffset: number) {
		var startIndex = block.getIndexByOffset(startOffset) + 1;
		var endIndex = block.getIndexByOffset(jumpOffset);

		var beforeBlock = block.take(startIndex);
		var ifBlock = block.slice(startIndex, endIndex);
		var afterBlock = block.skip(endIndex);

		this.processBasicBlock(beforeBlock);
		var jumpCondition = new NodeUnop(new types.Any, this.stack.pop(), '!', '');
		var blockIfResult = Dynarec._processBlock(this.info, ifBlock);
		this.writeSentence('if (' + jumpCondition + ') { ' + blockIfResult.code + ' }');
		this.processFlow(afterBlock);
	}

	processFlowIfElseTernary(block: InstructionBlock, startOffset: number, elseOffset: number, endOffset: number) {
		var startIndex = block.getIndexByOffset(startOffset) + 1;
		var elseIndex = block.getIndexByOffset(elseOffset);
		var endIndex = block.getIndexByOffset(endOffset);

		var beforeBlock = block.take(startIndex);
		var ifBlock = block.slice(startIndex, elseIndex - 1); // goto to the end of the block
		var elseBlock = block.slice(elseIndex, endIndex);
		var afterBlock = block.skip(endIndex);

		this.processBasicBlock(beforeBlock);
		var jumpCondition = new NodeUnop(new types.Any, this.stack.pop(), '!', '');

		var ifResult = Dynarec._processBlock(this.info, ifBlock);
		var elseResult = Dynarec._processBlock(this.info, elseBlock);

		//console.log(ifBlock, ifResult); console.log('-'); console.log(elseBlock, elseResult);

		// Ternary operator
		if ((ifResult.stack.length == 1) || (elseResult.stack.length == 1)) {
			if (ifResult.stack.length != elseResult.stack.length) throw (new Error("if with stack mismatch! : " + ifResult.stack.join(',')));

			this.stack.push(new NodeTernary(jumpCondition, ifResult.stack[0], elseResult.stack[0]));
		}
		// Normal if.
		else {
			//this.writeSentence(new NodeIfElse(blockIfResult.code, blockElseResult.code));
			this.writeSentence('if (' + jumpCondition + ') { ' + ifResult.code + ' } else { ' + elseResult.code + ' }');
		}

		this.processFlow(afterBlock);
	}

	processFlowWhile(block: InstructionBlock, startOffset: number, conditionalJumpOffset: number, loopOffset: number) {

		var startIndex = block.getIndexByOffset(startOffset);
		var conditionalJumpIndex = block.getIndexByOffset(conditionalJumpOffset) + 1;
		var loopIndex = block.getIndexByOffset(loopOffset);

		var beforeBlock = block.take(startIndex);
		var conditionBlock = block.slice(startIndex, conditionalJumpIndex);
		var loopBlock = block.slice(conditionalJumpIndex, loopIndex - 1);
		var afterBlock = block.skip(loopIndex);

		//console.log('beforeBlock:', beforeBlock);
		//console.log('conditionBlock:', conditionBlock);
		//console.log('loopBlock:', loopBlock);

		this.processBasicBlock(beforeBlock);
		this.processBasicBlock(conditionBlock);
		var jumpCondition = new NodeUnop(new types.Any, this.stack.pop(), '!', '');
		//var jumpCondition = this.stack.pop();
		
		var loopResult = Dynarec._processBlock(this.info, loopBlock);

		this.writeSentence('while (' + jumpCondition + ') { ' + loopResult.code + ' }');

		this.processFlow(afterBlock);
	}

	processBasicBlock(block: InstructionBlock) {
		block.forEach(i => {
			//if (i.opcodeInfo.type == OpcodeType.Jump) throw (new Error("A basic block should no contain any jump instruction"));
		});
		block.forEach(i => {
			this.processOne(i);
		});
	}

	private processWhile(block: InstructionBlock, startWhileOffset: number, conditionalJumpOffset: number, afterWhileOffset: number) {
		if (!(startWhileOffset < conditionalJumpOffset)) throw (new Error("assertion failed!"));
		if (!(conditionalJumpOffset < afterWhileOffset)) throw (new Error("assertion failed!"));
		throw(new Error("Not implemented processWhile"));
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
		this.ifcond2(op, offset);
	}

	ifcond2(op: string, offset: number): any {
		var a2 = this.stack.pop();
		var a1 = this.stack.pop();
		this.stack.push(new NodeBinop(new types.Integer(), a1, op, a2));
	}

	goto(offset: any): any {
		this.stack.push(new NodeValue(1));
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
