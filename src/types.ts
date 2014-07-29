import utils = require('./utils');
import StringReader = utils.StringReader;

export class Any { mangled = ""; }
export class Ref extends Any { mangled = ""; }
export class Void extends Any { mangled = "V"; }
export class Boolean extends Any { mangled = "Z"; }
export class Byte extends Any { mangled = "B"; }
export class Short extends Any { mangled = "S"; }
export class Character extends Any { mangled = "C"; public boxed_name: String = 'Ljava/lang/Character;'; }
export class Integer extends Any { mangled = "I"; }
export class Object extends Any { constructor(public type: string) { super(); this.mangled = 'T' + type + ';' } }
export class Float extends Any { mangled = "F"; }
export class Double extends Any { mangled = "D"; }
export class Long extends Any { mangled = "J"; }
export class Array extends Any { constructor(public type: Any) { super(); this.mangled = '[' + type.mangled; } }
export class Method extends Any { arguments = <Any[]>[]; rettype: Any; mangled = ""; }

export function demangle(data: string) { return _demangle(new StringReader(data)); }
export function demangleMethod(data: string) { return _demangleMethod(new StringReader(data)); }

export function _demangle(data: StringReader) {
	var type = data.read();
	switch (type) {
		case 'L':
			var out = '';
			while (!data.eof) {
				var c = data.read();
				if (c == ';') break;
				out += c;
			}
			return new Object(out);
		case 'V': return new Void();
		case 'I': return new Integer();
		case 'J': return new Long();
		case 'F': return new Float();
		case 'B': return new Byte();
		case 'Z': return new Boolean();
		case 'S': return new Short();
		case 'C': return new Character();
		case 'D': return new Double();
		case 'F': return new Float();
		case '[': return new Array(_demangle(data));
		case ')': return null;

		default: throw (new Error("Unknown type " + type));
	}
}

export function _demangleMethod(str: StringReader) {
	var methodType = new Method();
	if (str.read() != '(') throw (new Error("Not a method type"));
	while (!str.eof) {
		var type: Any = _demangle(str);
		if (type === null) break;
		methodType.arguments.push(type);
	}
	methodType.rettype = _demangle(str);
	methodType.mangled = '(' + methodType.arguments.map(arg => arg.mangled).join('') + ')' + methodType.rettype.mangled;
	if (!str.eof) throw (new Error("Not loaded the entire string"));
	return methodType;
}
