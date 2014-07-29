var types = require('./types');

var opcodes = require('./opcodes');

var Opcode = opcodes.Opcode;

(function (InvokeType) {
    InvokeType[InvokeType["special"] = 0] = "special";
    InvokeType[InvokeType["static"] = 1] = "static";
    InvokeType[InvokeType["virtual"] = 2] = "virtual";
})(exports.InvokeType || (exports.InvokeType = {}));
var InvokeType = exports.InvokeType;

var InstructionBlock = (function () {
    function InstructionBlock(instructions) {
        this.instructions = instructions;
    }
    return InstructionBlock;
})();

var DynarecProcessor = (function () {
    function DynarecProcessor() {
    }
    /*
    static process(processor: Processor, pool: constantpool.ConstantPool, instructions: InstructionBlock): any {
    instructions.instructions.forEach(i => {
    DynarecProcessor.processOne(processor, pool, i);
    });
    }
    */
    DynarecProcessor.processOne = function (processor, pool, i) {
        //console.log('stackOffset:', i.stackOffset);
        var op = i.op, param = i.param, param2 = i.param2;

        switch (op) {
            case 42 /* aload_0 */:
            case 43 /* aload_1 */:
            case 44 /* aload_2 */:
            case 45 /* aload_3 */:
                return processor._load(new types.Ref, op - 42 /* aload_0 */);
            case 26 /* iload_0 */:
            case 27 /* iload_1 */:
            case 28 /* iload_2 */:
            case 29 /* iload_3 */:
                return processor._load(new types.Integer, op - 26 /* iload_0 */);
            case 30 /* lload_0 */:
            case 31 /* lload_1 */:
            case 32 /* lload_2 */:
            case 33 /* lload_3 */:
                return processor._load(new types.Long, op - 30 /* lload_0 */);
            case 34 /* fload_0 */:
            case 35 /* fload_1 */:
            case 36 /* fload_2 */:
            case 37 /* fload_3 */:
                return processor._load(new types.Float, op - 34 /* fload_0 */);
            case 38 /* dload_0 */:
            case 39 /* dload_1 */:
            case 40 /* dload_2 */:
            case 41 /* dload_3 */:
                return processor._load(new types.Double, op - 38 /* dload_0 */);

            case 25 /* aload */:
                return processor._load(new types.Ref, param);
            case 21 /* iload */:
                return processor._load(new types.Integer, param);
            case 22 /* lload */:
                return processor._load(new types.Long, param);
            case 23 /* fload */:
                return processor._load(new types.Float, param);
            case 24 /* dload */:
                return processor._load(new types.Double, param);

            case 50 /* aaload */:
                return processor.aaload();
            case 83 /* aastore */:
                return processor.aastore();

            case 75 /* astore_0 */:
            case 76 /* astore_1 */:
            case 77 /* astore_2 */:
            case 78 /* astore_3 */:
                return processor._store(new types.Ref, op - 75 /* astore_0 */);
            case 59 /* istore_0 */:
            case 60 /* istore_1 */:
            case 61 /* istore_2 */:
            case 62 /* istore_3 */:
                return processor._store(new types.Integer, op - 59 /* istore_0 */);
            case 63 /* lstore_0 */:
            case 64 /* lstore_1 */:
            case 65 /* lstore_2 */:
            case 66 /* lstore_3 */:
                return processor._store(new types.Long, op - 63 /* lstore_0 */);
            case 67 /* fstore_0 */:
            case 68 /* fstore_1 */:
            case 69 /* fstore_2 */:
            case 70 /* fstore_3 */:
                return processor._store(new types.Float, op - 67 /* fstore_0 */);
            case 71 /* dstore_0 */:
            case 72 /* dstore_1 */:
            case 73 /* dstore_2 */:
            case 74 /* dstore_3 */:
                return processor._store(new types.Double, op - 71 /* dstore_0 */);

            case 58 /* astore */:
                return processor._store(new types.Ref, param);
            case 54 /* istore */:
                return processor._store(new types.Integer, param);
            case 55 /* lstore */:
                return processor._store(new types.Long, param);
            case 56 /* fstore */:
                return processor._store(new types.Float, param);
            case 57 /* dstore */:
                return processor._store(new types.Double, param);

            case 2 /* iconst_m1 */:
            case 3 /* iconst_0 */:
            case 4 /* iconst_1 */:
            case 5 /* iconst_2 */:
            case 6 /* iconst_3 */:
            case 7 /* iconst_4 */:
            case 8 /* iconst_5 */:
                return processor._const(new types.Integer, op - 3 /* iconst_0 */);
            case 9 /* lconst_0 */:
            case 10 /* lconst_1 */:
                return processor._const(new types.Long, op - 3 /* iconst_0 */);
            case 17 /* sipush */:
                return processor._const(new types.Short, param);
            case 16 /* bipush */:
                return processor._const(new types.Byte, param);

            case 20 /* ldc2_w */:
                return processor.ldc(param, true);
            case 18 /* ldc */:
                return processor.ldc(param, false);

            case 183 /* invokespecial */:
                return processor.invoke(0 /* special */, pool.getMethodReference(param));
            case 184 /* invokestatic */:
                return processor.invoke(1 /* static */, pool.getMethodReference(param));
            case 182 /* invokevirtual */:
                return processor.invoke(2 /* virtual */, pool.getMethodReference(param));
            case 178 /* getstatic */:
                return processor.getstatic(pool.getFieldReference(param));

            case 177 /* Return */:
                return processor._return(new types.Void);
            case 172 /* ireturn */:
                return processor._return(new types.Integer);
            case 174 /* freturn */:
                return processor._return(new types.Float);
            case 175 /* dreturn */:
                return processor._return(new types.Double);
            case 173 /* lreturn */:
                return processor._return(new types.Long);

            case 132 /* iinc */:
                return processor.iinc(param, param2);

            case 96 /* iadd */:
                return processor._binop(new types.Integer, '+');
            case 100 /* isub */:
                return processor._binop(new types.Integer, '-');
            case 126 /* iand */:
                return processor._binop(new types.Integer, '&');
            case 120 /* ishl */:
                return processor._binop(new types.Integer, '<<');
            case 122 /* ishr */:
                return processor._binop(new types.Integer, '>>');
            case 124 /* iushr */:
                return processor._binop(new types.Integer, '>>>');

            case 97 /* ladd */:
                return processor._binop(new types.Long, '+');
            case 101 /* lsub */:
                return processor._binop(new types.Long, '+');
            case 127 /* land */:
                return processor._binop(new types.Long, '&');
            case 121 /* lshl */:
                return processor._binop(new types.Long, '<<');
            case 123 /* lshr */:
                return processor._binop(new types.Long, '>>');
            case 125 /* lushr */:
                return processor._binop(new types.Long, '>>>');

            case 51 /* baload */:
                return processor.baload();
            case 84 /* bastore */:
                return processor.bastore();

            case 190 /* arraylength */:
                return processor.arraylength();
            case 187 /* new */:
                return processor._new(pool.getClassReference(param));

            case 89 /* dup */:
                return processor.dup();

            case 145 /* i2b */:
                return processor.convert(new types.Integer, new types.Byte);
            case 146 /* i2c */:
                return processor.convert(new types.Integer, new types.Character);
            case 135 /* i2d */:
                return processor.convert(new types.Integer, new types.Double);
            case 134 /* i2f */:
                return processor.convert(new types.Integer, new types.Float);
            case 133 /* i2l */:
                return processor.convert(new types.Integer, new types.Long);
            case 147 /* i2s */:
                return processor.convert(new types.Integer, new types.Short);
            case 138 /* l2d */:
                return processor.convert(new types.Long, new types.Double);
            case 137 /* l2f */:
                return processor.convert(new types.Long, new types.Float);
            case 136 /* l2i */:
                return processor.convert(new types.Long, new types.Integer);

            case 153 /* ifeq */:
                return processor.ifcond('==', param);
            case 154 /* ifne */:
                return processor.ifcond('!=', param);
            case 156 /* ifge */:
                return processor.ifcond('>=', param);
            case 157 /* ifgt */:
                return processor.ifcond('>', param);
            case 158 /* ifle */:
                return processor.ifcond('<=', param);
            case 155 /* iflt */:
                return processor.ifcond('<', param);

            case 159 /* if_icmpeq */:
                return processor.ifcond2('==', param);
            case 160 /* if_icmpne */:
                return processor.ifcond2('!=', param);
            case 162 /* if_icmpge */:
                return processor.ifcond2('>=', param);
            case 163 /* if_icmpgt */:
                return processor.ifcond2('>', param);
            case 164 /* if_icmple */:
                return processor.ifcond2('<=', param);
            case 161 /* if_icmplt */:
                return processor.ifcond2('<', param);

            case 167 /* goto */:
                return processor.goto(param);

            default:
                throw (new Error("Not implemented opcode " + i.name + '(' + i.op + ')' + "!"));
        }
    };
    return DynarecProcessor;
})();
exports.DynarecProcessor = DynarecProcessor;
//# sourceMappingURL=dynarec_common.js.map
