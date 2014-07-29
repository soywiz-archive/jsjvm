import utils = require('./utils');
import types = require('./types');
import instructions = require('./instructions');
import constantpool = require('./constantpool');
import dynarec = require('./dynarec');
import Stream = utils.Stream;
import ConstantPool = constantpool.ConstantPool;

require('./runtime');

export enum ACC_CLASS { PUBLIC = 0x0001, FINAL = 0x0010, SUPER = 0x0020, INTERFACE = 0x0200, ABSTRACT = 0x0400 }
export enum ACC_MEMBER { PUBLIC = 0x0001, PRIVATE = 0x0002, PROTECTED = 0x0004, STATIC = 0x0008, FINAL = 0x0010, SYNCHRONIZED = 0x0020, VOLATILE = 0x0040, TRANSIENT = 0x0080, NATIVE = 0x0100, ABSTRACT = 0x0400, STRICT = 0x0800 }

export class JavaMemberInfo {
	constructor(public access_flags: ACC_MEMBER, public name_index: number, public descriptor_index: number, public attributes: JavaAttributeInfo[]) { }
}

export class JavaAttributeInfo {
	constructor(public index: number, public data: NodeBuffer) { }
}

export class JavaClass {
	static majorVersionMap = { 45: 'JDK 1.1', 46: 'JDK 1.2', 47: 'JDK 1.3', 48: 'JDK 1.4', 49: 'J2SE 5.0', 50: 'J2SE 6.0', 51: 'J2SE 7', 52: 'J2SE 8' };

	public constantPool: ConstantPool;
	private methods = <JavaMethod[]>[];
	private interfaces = <number[]>[];
	private fields = <JavaMemberInfo[]>[];
	private attributes = <JavaAttributeInfo[]>[];
	private access_flags: ACC_CLASS;
	private this_class: number;
	private super_class: number;

	static fromStream(stream: Stream) {
		var javaClass = new JavaClass();
		javaClass.readData(stream);
		return javaClass;
	}

	readData(stream: Stream) {
		var magic = stream.readUInt32BE();
		if (magic != 3405691582) throw (new Error("Not a java class"));

		var minor_version = stream.readUInt16BE();
		var major_version = stream.readUInt16BE();

		this.constantPool = ConstantPool.fromStream(stream, stream.readUInt16BE());

		this.access_flags = <ACC_CLASS>stream.readUInt16BE();
		this.this_class = stream.readUInt16BE();
		this.super_class = stream.readUInt16BE();

		for (var n = 0, count = stream.readUInt16BE(); n < count; n++) this.interfaces.push(stream.readUInt16BE());
		for (var n = 0, count = stream.readUInt16BE(); n < count; n++) this.fields.push(this.readFieldInfo(stream));
		for (var n = 0, count = stream.readUInt16BE(); n < count; n++) this.methods.push(new JavaMethod(this.constantPool, this.readMethodInfo(stream)));
		for (var n = 0, count = stream.readUInt16BE(); n < count; n++) this.attributes.push(this.readAttributeInfo(stream));
	}

	getMethod(name: string, type: string = null) {
		for (var n = 0; n < this.methods.length; n++) {
			var method = this.methods[n];
			if (method.name != name) continue;
			if (type && method.methodTypeStr != type) continue;
			return method;
		}
		return null;
	}

	private _readMemberInfo(stream: Stream) {
		var access_flags = stream.readUInt16BE(), name_index = stream.readUInt16BE(), descriptor_index = stream.readUInt16BE();
		var attributes = [];
		for (var n = 0, count = stream.readUInt16BE(); n < count; n++) attributes.push(this.readAttributeInfo(stream));
		return new JavaMemberInfo(access_flags, name_index, descriptor_index, attributes);
	}

	private readMethodInfo(stream: Stream) { return this._readMemberInfo(stream); }
	private readFieldInfo(stream: Stream) { return this._readMemberInfo(stream); }
	private readAttributeInfo(stream: Stream) { return new JavaAttributeInfo(stream.readUInt16BE(), stream.readBytes(stream.readUInt32BE())); }
}

export class JavaMethod {
	public name: string;
	public methodTypeStr: string;
	private bodydata: NodeBuffer;
	public func: Function;
	public body: string;
	public methodType: types.Method;

	constructor(private pool: ConstantPool, public info: JavaMemberInfo) {
		this.name = pool.getString(info.name_index);
		this.methodTypeStr = pool.getString(info.descriptor_index);
		this.methodType = types.demangleMethod(this.methodTypeStr);

		this.info.attributes.forEach(attribute => {
			var attribute_name = this.pool.getString(attribute.index);
			if (attribute_name == 'Code') {
				this.bodydata = attribute.data;
			}
		});

		this._createFunction();
	}

	private _createFunction() {
		//console.log('Code!');
		var stream = new Stream(this.bodydata);
		var maxStack = stream.readInt16BE();
		var maxLocals = stream.readInt16BE();
		var codeLength = stream.readInt32BE();
		var codeStream = new Stream(stream.readBytes(codeLength));
		//console.log('max_stack_locals', max_stack, max_locals);

		var instructions = dynarec.readInstructions(this.pool, codeStream);
		var info = dynarec.getFunctionCode(this.pool, this.name, this.methodType, maxStack, maxLocals, ((this.info.access_flags & ACC_MEMBER.STATIC) != 0), instructions);
		this.func = info.func;
		this.body = info.body;
	}
}
