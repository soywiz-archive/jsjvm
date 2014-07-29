var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var utils = require('./utils');
var StringReader = utils.StringReader;

var Any = (function () {
    function Any() {
        this.mangled = "";
    }
    return Any;
})();
exports.Any = Any;
var Ref = (function (_super) {
    __extends(Ref, _super);
    function Ref() {
        _super.apply(this, arguments);
        this.mangled = "";
    }
    return Ref;
})(Any);
exports.Ref = Ref;
var Void = (function (_super) {
    __extends(Void, _super);
    function Void() {
        _super.apply(this, arguments);
        this.mangled = "V";
    }
    return Void;
})(Any);
exports.Void = Void;
var Boolean = (function (_super) {
    __extends(Boolean, _super);
    function Boolean() {
        _super.apply(this, arguments);
        this.mangled = "Z";
    }
    return Boolean;
})(Any);
exports.Boolean = Boolean;
var Byte = (function (_super) {
    __extends(Byte, _super);
    function Byte() {
        _super.apply(this, arguments);
        this.mangled = "B";
    }
    return Byte;
})(Any);
exports.Byte = Byte;
var Short = (function (_super) {
    __extends(Short, _super);
    function Short() {
        _super.apply(this, arguments);
        this.mangled = "S";
    }
    return Short;
})(Any);
exports.Short = Short;
var Character = (function (_super) {
    __extends(Character, _super);
    function Character() {
        _super.apply(this, arguments);
        this.mangled = "C";
        this.boxed_name = 'Ljava/lang/Character;';
    }
    return Character;
})(Any);
exports.Character = Character;
var Integer = (function (_super) {
    __extends(Integer, _super);
    function Integer() {
        _super.apply(this, arguments);
        this.mangled = "I";
    }
    return Integer;
})(Any);
exports.Integer = Integer;
var Object = (function (_super) {
    __extends(Object, _super);
    function Object(type) {
        _super.call(this);
        this.type = type;
        this.mangled = 'T' + type + ';';
    }
    return Object;
})(Any);
exports.Object = Object;
var Float = (function (_super) {
    __extends(Float, _super);
    function Float() {
        _super.apply(this, arguments);
        this.mangled = "F";
    }
    return Float;
})(Any);
exports.Float = Float;
var Double = (function (_super) {
    __extends(Double, _super);
    function Double() {
        _super.apply(this, arguments);
        this.mangled = "D";
    }
    return Double;
})(Any);
exports.Double = Double;
var Long = (function (_super) {
    __extends(Long, _super);
    function Long() {
        _super.apply(this, arguments);
        this.mangled = "J";
    }
    return Long;
})(Any);
exports.Long = Long;
var Array = (function (_super) {
    __extends(Array, _super);
    function Array(type) {
        _super.call(this);
        this.type = type;
        this.mangled = '[' + type.mangled;
    }
    return Array;
})(Any);
exports.Array = Array;
var Method = (function (_super) {
    __extends(Method, _super);
    function Method() {
        _super.apply(this, arguments);
        this.arguments = [];
        this.mangled = "";
    }
    return Method;
})(Any);
exports.Method = Method;

function demangle(data) {
    return exports._demangle(new StringReader(data));
}
exports.demangle = demangle;
function demangleMethod(data) {
    return exports._demangleMethod(new StringReader(data));
}
exports.demangleMethod = demangleMethod;

function _demangle(data) {
    var type = data.read();
    switch (type) {
        case 'L':
            var out = '';
            while (!data.eof) {
                var c = data.read();
                if (c == ';')
                    break;
                out += c;
            }
            return new Object(out);
        case 'V':
            return new Void();
        case 'I':
            return new Integer();
        case 'J':
            return new Long();
        case 'F':
            return new Float();
        case 'B':
            return new Byte();
        case 'Z':
            return new Boolean();
        case 'S':
            return new Short();
        case 'C':
            return new Character();
        case 'D':
            return new Double();
        case 'F':
            return new Float();
        case '[':
            return new Array(exports._demangle(data));
        case ')':
            return null;

        default:
            throw (new Error("Unknown type " + type));
    }
}
exports._demangle = _demangle;

function _demangleMethod(str) {
    var methodType = new Method();
    if (str.read() != '(')
        throw (new Error("Not a method type"));
    while (!str.eof) {
        var type = exports._demangle(str);
        if (type === null)
            break;
        methodType.arguments.push(type);
    }
    methodType.rettype = exports._demangle(str);
    methodType.mangled = '(' + methodType.arguments.map(function (arg) {
        return arg.mangled;
    }).join('') + ')' + methodType.rettype.mangled;
    if (!str.eof)
        throw (new Error("Not loaded the entire string"));
    return methodType;
}
exports._demangleMethod = _demangleMethod;
//# sourceMappingURL=types.js.map
