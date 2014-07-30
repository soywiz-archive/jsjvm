import utils = require('./utils');
import types = require('./types');
import constantpool = require('./constantpool');
import instructions = require('./instructions');
import dynarec_common = require('./dynarec_common');

import Instruction = instructions.Instruction;
import ConstantPool = constantpool.ConstantPool;

export class Dynarec0 implements dynarec_common.Processor {
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

	processOne(i: Instruction) {
		dynarec_common.DynarecProcessor.processOne(this, this.pool, i);
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

	invoke(invokeType: dynarec_common.InvokeType, methodInfo: constantpool.JavaConstantMethodReference) {
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
	convert(from: types.Any, to: types.Any) { this.writeSentence('stack.push(JavaRuntime.Convert' + from.mangled + to.mangled + '(stack.pop())); // _const'); }
	_const(type: types.Any, value: number) { this.writeSentence('stack.push(' + value + '); // _const'); }
	aaload() { this.writeSentence('var i = stack.pop(), aref = stack.pop(); stack.push(aref.value[i]); // aaload'); }
	aastore() { throw (new Error("Not implemented!")); }
	ldc(index: number, wide: boolean) { this.writeSentence('stack.push(' + this.pool.getValue(index) + '); // ldc'); }
	getstatic(methodInfo: constantpool.JavaConstantFieldReference) { this.writeSentence('stack.push(getstatic(' + methodInfo.name(this.pool) + ')); // getstatic'); }
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
	_aload(type: types.Any) {this.writeSentence('var i = stack.pop(), aref = stack.pop(); stack.push(aref.value[i]); // baload'); }
	_astore(type: types.Any) { this.writeSentence('var val = stack.pop(), i = stack.pop(), aref = stack.pop(); aref.value[i] = val; // bastore'); }
	arraylength() { this.writeSentence('stack.push(JavaRuntime.arraylength(stack.pop())); // arraylength'); }
	_new(clazz: constantpool.JavaConstantClassReference) { this.writeSentence('stack.push(new ' + this.pool.getString(clazz.indexName) + '()); // new'); }
	dup() { this.writeSentence('stack.push(stack[stack.length - 1]); // dup'); }
}
