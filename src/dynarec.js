var instructions = require('./instructions');

var utils = require('./utils');

var dynarec_fast = require('./dynarec_fast');

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
    var dynarec = new dynarec_fast.Dynarec(pool, methodName, methodType, max_stack, max_locals, is_static);
    dynarec.process(instructions);
    var func;

    try  {
        func = Function.apply(null, utils.range(methodType.arguments.length).map(function (index) {
            return 'arg' + index;
        }).concat([dynarec.body]));
    } catch (e) {
        console.info(dynarec.body);
        console.error(e);
        func = null;
    }
    return { func: func, body: dynarec.body };
}
exports.getFunctionCode = getFunctionCode;
//# sourceMappingURL=dynarec.js.map
