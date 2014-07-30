var types = require('./types');

var dynarec_common = require('./dynarec_common');

var Dynarec0 = (function () {
    function Dynarec0(pool, methodName, methodType, max_stack, max_locals, is_static) {
        this.pool = pool;
        this.methodName = methodName;
        this.methodType = methodType;
        this.max_stack = max_stack;
        this.max_locals = max_locals;
        this.is_static = is_static;
        this.body = '"use strict"; var stack = []; var locals = []; var label = 0;\n';
    }
    Dynarec0.prototype.writeSentence = function (text) {
        this.body += text + "\n";
    };

    Dynarec0.prototype.process = function (instructions) {
        var _this = this;
        for (var n = 0; n < this.max_locals; n++) {
            this.writeSentence("locals[" + n + "] = { value: null };");
        }
        for (var n = 0; n < this.methodType.arguments.length; n++) {
            this.writeSentence("arg" + n + " = { value: arg" + n + " };");
        }
        this.writeSentence('while (true) switch (label) {');
        instructions.forEach(function (i) {
            _this.body += 'case ' + i.offset + ': ';
            _this.processOne(i);
        });
        this.writeSentence('}');
    };

    Dynarec0.prototype.processOne = function (i) {
        dynarec_common.DynarecProcessor.processOne(this, this.pool, i);
    };

    Dynarec0.prototype.call = function (method, count) {
        this.writeSentence('stack.push(' + method + '(stack.splice(stack.length - ' + count + '))); // call');
    };

    Dynarec0.prototype.call_void = function (method, count) {
        this.writeSentence('' + method + '(stack.splice(stack.length - ' + count + ')); // call_void');
    };

    Dynarec0.prototype.getref = function (index) {
        var argLength = this.methodType.arguments.length;
        if (index < argLength) {
            return 'arg' + (index);
        } else {
            return 'locals[' + (index - argLength) + ']';
        }
    };

    Dynarec0.prototype._load = function (type, index) {
        if (type instanceof types.Ref) {
            this.writeSentence('stack.push(' + this.getref(index) + '); // aload');
        } else {
            this.writeSentence('stack.push(' + this.getref(index) + '.value); // _load');
        }
    };
    Dynarec0.prototype._return = function (type) {
        if (type instanceof types.Void) {
            this.writeSentence('return;');
        } else {
            this.writeSentence('return stack.pop(); // _return');
        }
    };

    Dynarec0.prototype.invoke = function (invokeType, methodInfo) {
        var className = methodInfo.className(this.pool);
        var name = methodInfo.name(this.pool);
        var type = methodInfo.type(this.pool);
        var demangledType = types.demangleMethod(methodInfo.type(this.pool));
        var argCount = demangledType.arguments.length;

        //if (invoketype == 'static') argCount++;
        if (demangledType.rettype instanceof types.Void) {
            this.call(name, argCount);
        } else {
            this.call_void(name, argCount);
        }
    };

    Dynarec0.prototype._store = function (type, index) {
        this.writeSentence(this.getref(index) + '.value = stack.pop(); // _store');
    };
    Dynarec0.prototype.convert = function (from, to) {
        this.writeSentence('stack.push(JavaRuntime.Convert' + from.mangled + to.mangled + '(stack.pop())); // _const');
    };
    Dynarec0.prototype._const = function (type, value) {
        this.writeSentence('stack.push(' + value + '); // _const');
    };
    Dynarec0.prototype.aaload = function () {
        this.writeSentence('var i = stack.pop(), aref = stack.pop(); stack.push(aref.value[i]); // aaload');
    };
    Dynarec0.prototype.aastore = function () {
        throw (new Error("Not implemented!"));
    };
    Dynarec0.prototype.ldc = function (index, wide) {
        this.writeSentence('stack.push(' + this.pool.getValue(index) + '); // ldc');
    };
    Dynarec0.prototype.getstatic = function (methodInfo) {
        this.writeSentence('stack.push(getstatic(' + methodInfo.name(this.pool) + ')); // getstatic');
    };
    Dynarec0.prototype._binop = function (type, op) {
        if (type instanceof types.Integer) {
            this.writeSentence('var r = stack.pop(), l = stack.pop(); stack.push(l ' + op + ' r); // ibinop(' + op + ')');
        } else {
            this.writeSentence('var r = stack.pop(), l = stack.pop(); stack.push(Long["' + op + '"](l, r)); // lbinop(' + op + ')');
        }
    };
    Dynarec0.prototype.ifcond = function (op, offset) {
        this.writeSentence('if (stack.pop() ' + op + ' 0) { label = ' + offset + '; break; } // ifcond(' + op + ')');
    };
    Dynarec0.prototype.ifcond2 = function (op, offset) {
        this.writeSentence('if (stack.pop() ' + op + ' stack.pop()) { label = ' + offset + '; break; } // ifcond2(' + op + ')');
    };
    Dynarec0.prototype.goto = function (offset) {
        this.writeSentence('{ label = ' + offset + '; break; }; // goto');
    };
    Dynarec0.prototype.iinc = function (local, increment) {
        this.writeSentence(this.getref(local) + ' = ' + this.getref(local) + ' + ' + increment + '; // iinc');
    };
    Dynarec0.prototype._aload = function (type) {
        this.writeSentence('var i = stack.pop(), aref = stack.pop(); stack.push(aref.value[i]); // baload');
    };
    Dynarec0.prototype._astore = function (type) {
        this.writeSentence('var val = stack.pop(), i = stack.pop(), aref = stack.pop(); aref.value[i] = val; // bastore');
    };
    Dynarec0.prototype.arraylength = function () {
        this.writeSentence('stack.push(JavaRuntime.arraylength(stack.pop())); // arraylength');
    };
    Dynarec0.prototype._new = function (clazz) {
        this.writeSentence('stack.push(new ' + this.pool.getString(clazz.indexName) + '()); // new');
    };
    Dynarec0.prototype.dup = function () {
        this.writeSentence('stack.push(stack[stack.length - 1]); // dup');
    };
    return Dynarec0;
})();
exports.Dynarec0 = Dynarec0;
//# sourceMappingURL=dynarec_simple.js.map
