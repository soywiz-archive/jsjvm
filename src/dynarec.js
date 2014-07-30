var instructions = require('./instructions');

var utils = require('./utils');

var dynarec_common = require('./dynarec_common');

var dynarec_fast = require('./dynarec_fast');

var InstructionBlock = dynarec_common.InstructionBlock;

var InstructionReader = instructions.InstructionReader;

//class LocalReference {
//	constructor(public index: number) { }
//}
function readInstructions(pool, codeStream) {
    var instructions = [];
    while (!codeStream.eof) {
        instructions.push(InstructionReader.read(pool, codeStream));
    }
    return instructions;
}
exports.readInstructions = readInstructions;

function getFunctionCode(pool, methodName, methodType, max_stack, max_locals, is_static, instructions) {
    var output = dynarec_fast.Dynarec.processMethod(new dynarec_common.DynarecInfo(pool, methodName, methodType, max_stack, max_locals, is_static), new InstructionBlock(instructions));

    var func;

    try  {
        func = Function.apply(null, utils.range(methodType.arguments.length).map(function (index) {
            return 'arg' + index;
        }).concat([output.code]));
    } catch (e) {
        console.info(methodName + ':' + output.code);
        console.error(e);
        func = null;
    }

    //console.info('function ' + methodName + '() { ' + output.code + '}');
    return { func: func, body: output.code };
}
exports.getFunctionCode = getFunctionCode;
//# sourceMappingURL=dynarec.js.map
