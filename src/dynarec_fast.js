var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var types = require('./types');

var dynarec_common = require('./dynarec_common');
var opcodes = require('./opcodes');

var OpcodeType = opcodes.OpcodeType;
var Opcode = opcodes.Opcode;

var Node = (function () {
    function Node() {
    }
    Node.prototype.toString = function () {
        return '';
    };
    return Node;
})();
var NodeRef = (function (_super) {
    __extends(NodeRef, _super);
    function NodeRef(name) {
        _super.call(this);
        this.name = name;
    }
    NodeRef.prototype.toString = function () {
        return this.name;
    };
    return NodeRef;
})(Node);
var NodeRaw = (function (_super) {
    __extends(NodeRaw, _super);
    function NodeRaw(name) {
        _super.call(this);
        this.name = name;
    }
    NodeRaw.prototype.toString = function () {
        return this.name;
    };
    return NodeRaw;
})(Node);
var NodeValue = (function (_super) {
    __extends(NodeValue, _super);
    function NodeValue(value) {
        _super.call(this);
        this.value = value;
    }
    NodeValue.prototype.toString = function () {
        return String(this.value);
    };
    return NodeValue;
})(Node);
var NodeArrayAccess = (function (_super) {
    __extends(NodeArrayAccess, _super);
    function NodeArrayAccess(array, index) {
        _super.call(this);
        this.array = array;
        this.index = index;
    }
    NodeArrayAccess.prototype.toString = function () {
        return this.array.toString() + '[' + this.index.toString() + ']';
    };
    return NodeArrayAccess;
})(Node);

var NodeCast = (function (_super) {
    __extends(NodeCast, _super);
    function NodeCast(type, node) {
        _super.call(this);
        this.type = type;
        this.node = node;
    }
    NodeCast.prototype.toString = function () {
        return 'Convert.Cast' + this.type.mangled + '(' + this.node.toString() + '|0' + ')';
    };
    return NodeCast;
})(Node);

var NodeBinop = (function (_super) {
    __extends(NodeBinop, _super);
    function NodeBinop(type, left, op, right) {
        _super.call(this);
        this.type = type;
        this.left = left;
        this.op = op;
        this.right = right;
    }
    NodeBinop.prototype.toString = function () {
        return '(' + this.left.toString() + ' ' + this.op + ' ' + this.right.toString() + ')';
    };
    return NodeBinop;
})(Node);

var NodeTernary = (function (_super) {
    __extends(NodeTernary, _super);
    function NodeTernary(cond, nodeIf, nodeElse) {
        _super.call(this);
        this.cond = cond;
        this.nodeIf = nodeIf;
        this.nodeElse = nodeElse;
    }
    NodeTernary.prototype.toString = function () {
        return '((' + this.cond.toString() + ') ? (' + this.nodeIf.toString() + ') : (' + this.nodeElse.toString() + '))';
    };
    return NodeTernary;
})(Node);

var NodeUnop = (function (_super) {
    __extends(NodeUnop, _super);
    function NodeUnop(type, left, l, r) {
        _super.call(this);
        this.type = type;
        this.left = left;
        this.l = l;
        this.r = r;
    }
    NodeUnop.prototype.toString = function () {
        return '(' + this.l + this.left.toString() + this.r + ')';
    };
    return NodeUnop;
})(Node);

var NodeCall = (function (_super) {
    __extends(NodeCall, _super);
    function NodeCall(methodName, args) {
        _super.call(this);
        this.methodName = methodName;
        this.args = args;
    }
    NodeCall.prototype.toString = function () {
        return this.methodName + '(' + this.args.map(function (arg) {
            return arg.toString();
        }).join(', ') + ')';
    };
    return NodeCall;
})(Node);

var Dynarec = (function () {
    function Dynarec(info) {
        this.info = info;
        this.stack = [];
        this.sentences = [];
        this.body = '';
    }
    Dynarec.processMethod = function (info, block) {
        var output = Dynarec._processBlock(info, block);

        //console.log('///////////////////////////// ', this.stack.length);
        if (output.stack.length)
            console.warn('stack length not zero at the end of the function! Probably a bug! ' + info.methodName + ' : stack: ' + JSON.stringify(output.stack));

        var header = '';
        header += '"use strict";\n';
        for (var n = 0; n < info.max_locals - info.methodType.arguments.length; n++)
            header += 'var local_' + n + ' = 0;\n';
        output.code = header + output.code;

        //console.log(info.methodName + ': ' + output.code);
        return output;
    };

    Dynarec._processBlock = function (info, block) {
        if (block == null)
            return null;

        var dynarec = new Dynarec(info);

        dynarec.processFlow(block);

        return { code: dynarec.body, stack: dynarec.stack };
    };

    Dynarec.prototype.writeSentence = function (text) {
        this.body += text + "\n";
    };

    Dynarec.prototype.processFlow = function (block) {
        var instructions = block.instructions;
        var startIndex = block.firstIndex(function (i) {
            return i.opcodeInfo.type == 1 /* Jump */;
        });
        if (startIndex < 0) {
            return this.processBasicBlock(block);
        }

        // Process basic block until this point
        var i = instructions[startIndex];
        var startOffset = i.offset;
        var jumpOffset = i.param;

        if (jumpOffset > startOffset) {
            var firstBlock = block.sliceOffsets(startOffset, jumpOffset);

            // Has goto at the end of the block.
            if (firstBlock.last.op == 167 /* goto */) {
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
        } else {
            return this.processFlowDoWhile(block, jumpOffset, startOffset);
        }
    };

    Dynarec.prototype.processFlowDoWhile = function (block, startOffset, endOffset) {
        var startIndex = block.getIndexByOffset(startOffset);
        var endIndex = block.getIndexByOffset(endOffset);

        var beforeBlock = block.take(startIndex);
        var loopBlock = block.slice(startIndex, endIndex + 1);
        var afterBlock = block.skip(endIndex + 1);

        //console.log(beforeBlock);
        //console.log(loopBlock);
        //console.log(afterBlock);
        this.processBasicBlock(beforeBlock);
        this.writeSentence('do { ');

        var loopResult = Dynarec._processBlock(this.info, loopBlock.rstrip(1));

        //console.log(loopResult);
        this.stack = this.stack.concat(loopResult.stack);
        this.processOne(loopBlock.last);
        var jumpCondition = this.stack.pop();
        this.writeSentence(loopResult.code);

        this.writeSentence('} while ((' + jumpCondition + '));');
        this.processFlow(afterBlock);
    };

    Dynarec.prototype.processFlowIf = function (block, startOffset, endOffset) {
        var startIndex = block.getIndexByOffset(startOffset) + 1;
        var endIndex = block.getIndexByOffset(endOffset);

        var beforeBlock = block.take(startIndex);
        var ifBlock = block.slice(startIndex, endIndex);
        var afterBlock = block.skip(endIndex);

        this.processBasicBlock(beforeBlock);
        var jumpCondition = new NodeUnop(new types.Any, this.stack.pop(), '!', '');
        var blockIfResult = Dynarec._processBlock(this.info, ifBlock);
        this.writeSentence('if (' + jumpCondition + ') { ' + blockIfResult.code + ' }');
        this.processFlow(afterBlock);
    };

    Dynarec.prototype.processFlowIfElseTernary = function (block, startOffset, elseOffset, endOffset) {
        var startIndex = block.getIndexByOffset(startOffset) + 1;
        var elseIndex = block.getIndexByOffset(elseOffset);
        var endIndex = block.getIndexByOffset(endOffset);

        var beforeBlock = block.take(startIndex);
        var ifBlock = block.slice(startIndex, elseIndex - 1);
        var elseBlock = block.slice(elseIndex, endIndex);
        var afterBlock = block.skip(endIndex);

        this.processBasicBlock(beforeBlock);
        var jumpCondition = new NodeUnop(new types.Any, this.stack.pop(), '!', '');

        var ifResult = Dynarec._processBlock(this.info, ifBlock);
        var elseResult = Dynarec._processBlock(this.info, elseBlock);

        //console.log(ifBlock, ifResult); console.log('-'); console.log(elseBlock, elseResult);
        // Ternary operator
        if ((ifResult.stack.length == 1) || (elseResult.stack.length == 1)) {
            if (ifResult.stack.length != elseResult.stack.length)
                throw (new Error("if with stack mismatch! : " + ifResult.stack.join(',')));

            this.stack.push(new NodeTernary(jumpCondition, ifResult.stack[0], elseResult.stack[0]));
        } else {
            //this.writeSentence(new NodeIfElse(blockIfResult.code, blockElseResult.code));
            this.writeSentence('if (' + jumpCondition + ') { ' + ifResult.code + ' } else { ' + elseResult.code + ' }');
        }

        this.processFlow(afterBlock);
    };

    Dynarec.prototype.processFlowWhile = function (block, startOffset, conditionalJumpOffset, loopOffset) {
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

        this.writeSentence('while (true) {');

        this.processBasicBlock(conditionBlock);
        var breakCondition = this.stack.pop();
        this.writeSentence('if (' + breakCondition + ') break;');

        //var jumpCondition = this.stack.pop();
        var loopResult = Dynarec._processBlock(this.info, loopBlock);

        this.writeSentence(loopResult.code);
        this.writeSentence('}');

        this.processFlow(afterBlock);
    };

    Dynarec.prototype.processBasicBlock = function (block) {
        var _this = this;
        block.forEach(function (i) {
            //if (i.opcodeInfo.type == OpcodeType.Jump) throw (new Error("A basic block should no contain any jump instruction"));
        });
        block.forEach(function (i) {
            _this.processOne(i);
        });
    };

    Dynarec.prototype.processOne = function (i) {
        return dynarec_common.DynarecProcessor.processOne(this, this.info.pool, i);
    };

    Dynarec.prototype.getref = function (index) {
        var argLength = this.info.methodType.arguments.length;
        if (index < argLength) {
            return new NodeRef('arg' + (index) + '');
        } else {
            return new NodeRef('local_' + (index - argLength));
        }
    };

    Dynarec.prototype._load = function (type, index) {
        if (type instanceof types.Ref) {
            this.stack.push(this.getref(index));
        } else {
            this.stack.push(new NodeCast(type, this.getref(index)));
        }
    };

    Dynarec.prototype._store = function (type, index) {
        var ref = this.stack.pop();
        this.writeSentence(this.getref(index).name + ' = ' + ref.toString() + ';');
    };

    Dynarec.prototype._return = function (type) {
        if (type instanceof types.Void) {
            this.writeSentence('return;');
        } else {
            this.writeSentence('return ' + this.stack.pop().toString() + ';');
        }
    };

    Dynarec.prototype.convert = function (from, to) {
        this.stack.push(new NodeCall('Convert.Convert' + from.mangled + to.mangled, [this.stack.pop()]));
    };

    Dynarec.prototype._const = function (type, value) {
        this.stack.push(new NodeValue(value));
    };

    Dynarec.prototype.aaload = function () {
        var index = this.stack.pop();
        var arrayref = this.stack.pop();
        this.stack.push(new NodeArrayAccess(arrayref, index));
    };
    Dynarec.prototype.aastore = function () {
        throw (new Error("Not implemented"));
    };

    Dynarec.prototype.ldc = function (index, wide) {
        this.stack.push(new NodeValue(this.info.pool.getValue(index)));
    };

    Dynarec.prototype.invoke = function (invokeType, methodInfo) {
        var className = methodInfo.className(this.info.pool);
        var name = methodInfo.name(this.info.pool);
        var type = methodInfo.type(this.info.pool);
        var demangledType = types.demangleMethod(methodInfo.type(this.info.pool));
        var argCount = demangledType.arguments.length;
        var args = [];

        for (var n = 0; n < argCount; n++) {
            args.push(this.stack.pop());
        }

        var call = new NodeCall(name, args);

        if (demangledType.rettype instanceof types.Void) {
            this.writeSentence(call.toString() + ";");
        } else {
            this.stack.push(call);
        }
    };

    Dynarec.prototype.getstatic = function (methodInfo) {
        this.stack.push(new NodeRef(methodInfo.name(this.info.pool)));
    };

    Dynarec.prototype._binop = function (type, op) {
        var right = this.stack.pop();
        var left = this.stack.pop();
        this.stack.push(new NodeBinop(type, left, op, right));
    };

    Dynarec.prototype.ifcond = function (op, offset) {
        this.stack.push(new NodeValue(0));
        this.ifcond2(op, offset);
    };

    Dynarec.prototype.ifcond2 = function (op, offset) {
        var a2 = this.stack.pop();
        var a1 = this.stack.pop();
        this.stack.push(new NodeBinop(new types.Integer(), a1, op, a2));
    };

    Dynarec.prototype.goto = function (offset) {
        this.stack.push(new NodeValue(1));
    };

    Dynarec.prototype.iinc = function (local, increment) {
        this.writeSentence(this.getref(local).toString() + ' = ' + this.getref(local).toString() + ' + ' + increment);
    };

    Dynarec.prototype.baload = function () {
        var index = this.stack.pop();
        var ref = this.stack.pop();
        this.stack.push(new NodeArrayAccess(ref, index));
    };

    Dynarec.prototype.bastore = function () {
        var value = this.stack.pop();
        var index = this.stack.pop();
        var ref = this.stack.pop();
        this.writeSentence(ref.toString() + '[' + index.toString() + '] = ' + value.toString());
    };

    Dynarec.prototype.arraylength = function () {
        this.stack.push(new NodeCall('Convert.arraylength', [this.stack.pop()]));
    };

    Dynarec.prototype._new = function (clazz) {
        this.call('new ' + clazz.name(this.info.pool), 0);
    };

    Dynarec.prototype.dup = function () {
        var node = this.stack.pop();
        this.stack.push(new NodeRaw('(var temp = ' + this.stack.push(node.toString()) + ', temp)'));
    };

    Dynarec.prototype.call = function (method, count) {
        var args = [];
        for (var n = 0; n < count; n++)
            args.push(this.stack.pop());
        this.stack.push(new NodeCall(method, args.reverse()));
    };
    return Dynarec;
})();
exports.Dynarec = Dynarec;
//# sourceMappingURL=dynarec_fast.js.map
