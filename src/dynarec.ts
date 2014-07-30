import constantpool = require('./constantpool');
import instructions = require('./instructions');
import opcodes = require('./opcodes');
import utils = require('./utils');
import types = require('./types');
import dynarec_common = require('./dynarec_common');
import dynarec_simple = require('./dynarec_simple');
import dynarec_fast = require('./dynarec_fast');

import InvokeType = dynarec_common.InvokeType;
import Processor = dynarec_common.Processor;
import InstructionBlock = dynarec_common.InstructionBlock;
import Opcode = opcodes.Opcode;
import Instruction = instructions.Instruction;
import InstructionReader = instructions.InstructionReader;
import ConstantPool = constantpool.ConstantPool;

//class LocalReference {
//	constructor(public index: number) { }
//}

export function readInstructions(pool: ConstantPool,codeStream: utils.Stream) {
	var instructions = <Instruction[]>[];
	while (!codeStream.eof) {
		instructions.push(InstructionReader.read(pool, codeStream));
	}
	return instructions;
}

export function getFunctionCode(pool: ConstantPool, methodName: string, methodType: types.Method, max_stack: number, max_locals: number, is_static: boolean, instructions: Instruction[]) {
	var output = dynarec_fast.Dynarec.processMethod(new dynarec_common.DynarecInfo(pool, methodName, methodType, max_stack, max_locals, is_static), new InstructionBlock(instructions));

	var func;

	try {
		func = Function.apply(null, utils.range(methodType.arguments.length).map(index => 'arg' + index).concat([output.code]));
	} catch (e) {
		console.info(methodName + ':' + output.code);
		console.error(e);
		func = null;
	}

	//console.info('function ' + methodName + '() { ' + output.code + '}');
	return { func: func, body: output.code };
}
