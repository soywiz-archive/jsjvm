import utils = require('./utils');
import types = require('./types');
import constantpool = require('./constantpool');
import instructions = require('./instructions');
import dynarec_common = require('./dynarec_common');

import Instruction = instructions.Instruction;
import ConstantPool = constantpool.ConstantPool;

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

export class Dynarec implements dynarec_common.Processor {
	constructor(public pool: ConstantPool, public methodName: string, public methodType: types.Method, public max_stack: number, public max_locals: number, public is_static: boolean) {
	}

	private stack = <Node[]>[];
	private sentences = <Node[]>[];
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

	private processOne(i: Instruction) {
		dynarec_common.DynarecProcessor.processOne(this, this.pool, i);
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
		throw (new Error("Not implemented"));
	}

	ldc(index: number, wide: boolean) {
		this.stack.push(new NodeValue(this.pool.getValue(index)));
	}

	invoke(invokeType: dynarec_common.InvokeType, methodInfo: constantpool.JavaConstantMethodReference) {
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

	getstatic(methodInfo: constantpool.JavaConstantFieldReference) { this.stack.push(new NodeRef(methodInfo.name(this.pool))); }

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

	_new(clazz: constantpool.JavaConstantClassReference) {
		this.call('new ' + clazz.name(this.pool), 0);
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
