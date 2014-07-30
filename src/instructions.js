var opcodes = require('./opcodes');
var types = require('./types');

var Opcode = opcodes.Opcode;

var Instruction = (function () {
    function Instruction(offset, op, stackOffset, param, param2) {
        if (typeof param2 === "undefined") { param2 = null; }
        this.offset = offset;
        this.op = op;
        this.stackOffset = stackOffset;
        this.param = param;
        this.param2 = param2;
        this.name = Opcode[op];
    }
    Object.defineProperty(Instruction.prototype, "opcodeInfo", {
        get: function () {
            return opcodes.opcodeInfoListByOpcode[this.op];
        },
        enumerable: true,
        configurable: true
    });
    return Instruction;
})();
exports.Instruction = Instruction;

var InstructionReader = (function () {
    function InstructionReader() {
    }
    InstructionReader.calculateStackOffset = function (pool, i) {
        var op = i.op;
        var opcodeInfo = opcodes.opcodeInfoList[op];
        switch (op) {
            case 184 /* invokestatic */:
            case 183 /* invokespecial */:
                var method = types.demangleMethod(pool.getMethodType(i.param));
                return -method.arguments.length + ((method.rettype instanceof types.Void) ? 0 : 1);
        }

        if (!opcodeInfo.stackPush || !opcodeInfo.stackPop)
            throw (new Error("StackPush and/or StackPop is null. op: " + op + ',' + Opcode[op]));
        return opcodeInfo.deltaStack;
    };

    InstructionReader.read = function (pool, code) {
        var offset = code.position;
        var op = code.readUInt8();
        var stackOffset = 0;

        function decorateWithStackOffset(i) {
            i.stackOffset = InstructionReader.calculateStackOffset(pool, i);
            return i;
        }

        switch (op) {
            case 170 /* tableswitch */:
                throw (new Error("Not implemented tableswitch"));
            case 171 /* lookupswitch */:
                throw (new Error("Not implemented lookupswitch"));
            case 188 /* newarray */:
                throw (new Error("Not implemented newarray"));
            case 196 /* wide */:
                throw (new Error("Not implemented wide"));
            case 197 /* multianewarray */:
                throw (new Error("Not implemented multianewarray"));
            case 185 /* invokeinterface */:
                throw (new Error("Not implemented invokeinterface"));
            case 186 /* invokedynamic */:
                throw (new Error("Not implemented invokedynamic"));
            case 200 /* goto_w */:
            case 201 /* jsr_w */:
                throw (new Error("Not implemented branchbyte1_4_body"));

            case 16 /* bipush */:
                return decorateWithStackOffset(new Instruction(offset, op, stackOffset, code.readUInt8()));
            case 17 /* sipush */:
                return decorateWithStackOffset(new Instruction(offset, op, stackOffset, code.readUInt16BE()));
            case 18 /* ldc */:
                return decorateWithStackOffset(new Instruction(offset, op, stackOffset, code.readUInt8()));
            case 132 /* iinc */:
                return decorateWithStackOffset(new Instruction(offset, op, stackOffset, code.readUInt8(), code.readInt8()));

            case 21 /* iload */:
            case 22 /* lload */:
            case 23 /* fload */:
            case 24 /* dload */:
            case 25 /* aload */:
            case 54 /* istore */:
            case 55 /* lstore */:
            case 56 /* fstore */:
            case 57 /* dstore */:
            case 58 /* astore */:
            case 169 /* ret */:
                return decorateWithStackOffset(new Instruction(offset, op, stackOffset, code.readUInt8()));

            case 19 /* ldc_w */:
            case 20 /* ldc2_w */:
            case 178 /* getstatic */:
            case 179 /* putstatic */:
            case 180 /* getfield */:
            case 181 /* putfield */:
            case 187 /* new */:
            case 182 /* invokevirtual */:
            case 183 /* invokespecial */:
            case 184 /* invokestatic */:
            case 189 /* anewarray */:
            case 192 /* checkcast */:
            case 193 /* instanceof */:
                return decorateWithStackOffset(new Instruction(offset, op, stackOffset, code.readUInt16BE()));

            case 153 /* ifeq */:
            case 154 /* ifne */:
            case 155 /* iflt */:
            case 156 /* ifge */:
            case 157 /* ifgt */:
            case 158 /* ifle */:
            case 159 /* if_icmpeq */:
            case 160 /* if_icmpne */:
            case 161 /* if_icmplt */:
            case 162 /* if_icmpge */:
            case 163 /* if_icmpgt */:
            case 164 /* if_icmple */:
            case 165 /* if_acmpeq */:
            case 166 /* if_acmpne */:
            case 167 /* goto */:
            case 168 /* jsr */:
            case 198 /* ifnull */:
            case 199 /* ifnonnull */:
                return decorateWithStackOffset(new Instruction(offset, op, stackOffset, offset + code.readInt16BE()));

            default:
                return decorateWithStackOffset(new Instruction(offset, op, stackOffset, null));
        }
    };
    return InstructionReader;
})();
exports.InstructionReader = InstructionReader;
//# sourceMappingURL=instructions.js.map
