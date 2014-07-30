import opcodes = require('./opcodes');
import types = require('./types');
import constantpool = require('./constantpool');
import utils = require('./utils');
import Opcode = opcodes.Opcode;
import OpcodeInfo = opcodes.OpcodeInfo;

export class Instruction {
	public name: string;

	constructor(public offset: number, public op: Opcode, public param: any, public param2: any = null) { this.name = Opcode[op]; }
	get opcodeInfo() { return opcodes.opcodeInfoListByOpcode[this.op]; }
	get type() { return this.opcodeInfo.type; }
}

export class InstructionReader {
	private static calculateStackOffset(pool: constantpool.ConstantPool, i: Instruction) {
		var op = i.op;
		var opcodeInfo = opcodes.opcodeInfoList[op];
		switch (op) {
			case Opcode.invokestatic:
			case Opcode.invokespecial:
				var method = types.demangleMethod(pool.getMethodType(i.param));
				return -method.arguments.length + ((method.rettype instanceof types.Void) ? 0 : 1);
		}

		if (!opcodeInfo.stackPush || !opcodeInfo.stackPop) throw (new Error("StackPush and/or StackPop is null. op: " + op + ',' + Opcode[op]));
		return opcodeInfo.deltaStack;
	}

	static read(pool: constantpool.ConstantPool, code: utils.Stream): Instruction {
		var offset = code.position;
		var op = <Opcode>code.readUInt8();

		switch (op) {
			case Opcode.tableswitch:
				/*
				local u4 len = 4 - (offsets + 1) % 4;
				if (len < 4)u1 byte_pad[len];
				i4 defaultbyte; //defaultbyte1,defaultbyte2,defaultbyte3,defaultbyte4
				i4 npairs; //npairs1,npairs2,npairs3,npairs4
				struct
				{
				i4 match;
				i4 offset;
				} match_offset[npairs];
*/

				throw (new Error("Not implemented tableswitch"));

			case Opcode.lookupswitch:
				code.pad(4);
				var defaultOffset = code.readUInt32BE() + offset;
				var numPairs = code.readUInt32BE();
				var pairs = {};
				for (var n = 0; n < numPairs; n++) {
					var key = code.readUInt32BE();
					var value = code.readUInt32BE();
					pairs[key] = value + offset;
				}
				pairs['default'] = defaultOffset;
				return new Instruction(offset, op, pairs);

			case Opcode.newarray: throw (new Error("Not implemented newarray"));
			case Opcode.wide: throw (new Error("Not implemented wide"));
			case Opcode.multianewarray: throw (new Error("Not implemented multianewarray"));
			case Opcode.invokeinterface: throw (new Error("Not implemented invokeinterface"));
			case Opcode.invokedynamic: throw (new Error("Not implemented invokedynamic"));
			case Opcode.goto_w: case Opcode.jsr_w: throw (new Error("Not implemented branchbyte1_4_body"));

			case Opcode.bipush: return new Instruction(offset, op, code.readInt8());
			case Opcode.sipush: return new Instruction(offset, op, code.readUInt16BE());
			case Opcode.ldc: return new Instruction(offset, op, code.readUInt8());
			case Opcode.iinc: return new Instruction(offset, op, code.readUInt8(), code.readInt8());

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
