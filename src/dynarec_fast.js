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
        this.body = '"use strict";\n';
    }
    Dynarec.processMethod = function (info, instructionBlock) {
        var output = Dynarec._processBlock(info, instructionBlock);

        //console.log('///////////////////////////// ', this.stack.length);
        if (output.stack.length)
            console.warn('stack length not zero at the end of the function! Probably a bug! ' + info.methodName + ' : stack: ' + JSON.stringify(output.stack));
        return output;
    };

    Dynarec._processBlock = function (info, instructionBlock) {
        if (instructionBlock == null)
            return null;

        var dynarec = new Dynarec(info);
        dynarec.process(instructionBlock);

        return { code: dynarec.body, stack: dynarec.stack };
    };

    Dynarec.prototype.writeSentence = function (text) {
        this.body += text + "\n";
    };

    Dynarec.prototype.process = function (instructionBlock) {
        var instructions = instructionBlock.instructions;

        for (var n = 0; n < instructions.length; n++) {
            var i = instructions[n];
            if (i.opcodeInfo.type == 1 /* Jump */) {
                var jumpCondition = new NodeUnop(types.Any, this.processOne(i), '!', '');

                if (i.param > i.offset) {
                    var blockIfStart = i.offset;
                    var blockElseStart = i.param;
                    var blockEndStart = -1;

                    var blockIf = instructionBlock.sliceOffsets(blockIfStart, blockElseStart).skip(1);
                    var blockElse = null;

                    // Has goto at the end of the block.
                    if (blockIf.last.op == 167 /* goto */) {
                        blockEndStart = blockIf.last.param;
                        blockIf = blockIf.rstrip(1);
                        blockElse = instructionBlock.sliceOffsets(blockElseStart, blockEndStart);
                    } else {
                        blockEndStart = blockElseStart;
                        //blockElse = new Block
                    }

                    var blockIfResult = Dynarec._processBlock(this.info, blockIf);
                    var blockElseResult = Dynarec._processBlock(this.info, blockElse);

                    //console.log('if:' + blockIfResult.stack.length);
                    //console.log('else:' + blockElseResult.stack.length);
                    // Ternary operator
                    if ((blockIfResult) && (blockElseResult) && (blockIfResult.stack.length == 1) && (blockElseResult.stack.length == 1)) {
                        this.stack.push(new NodeTernary(jumpCondition, blockIfResult.stack[0], blockElseResult.stack[0]));

                        //console.log(this.stack);
                        n = instructionBlock.getIndexByOffset(blockEndStart) - 1;
                    } else {
                        if (blockIfResult && blockIfResult.stack.length)
                            throw (new Error("if with stack mismatch! : " + blockIfResult.stack.join(',')));
                        if (blockElseResult && blockElseResult.stack.length)
                            throw (new Error("else with stack mismatch! : " + blockElseResult.stack.join(',')));
                        throw (new Error("if not implemented! " + blockIf.instructions.length));
                    }
                } else {
                    throw (new Error("while not implemented!"));
                }
            } else {
                this.processOne(i);
            }
        }
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
        return this.ifcond2(op, offset);
    };

    Dynarec.prototype.ifcond2 = function (op, offset) {
        var a2 = this.stack.pop();
        var a1 = this.stack.pop();
        return new NodeBinop(new types.Integer(), a1, op, a2);
    };

    Dynarec.prototype.goto = function (offset) {
        return new NodeValue(1);
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
