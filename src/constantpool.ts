import utils = require('./utils');

import Stream = utils.Stream;

export enum CONSTANT { Utf8 = 1, Integer = 3, Float = 4, Long = 5, Double = 6, Class = 7, String = 8, Fieldref = 9, Methodref = 10, InterfaceMethodref = 11, NameAndType = 12 }

export class ConstantPool {
	public items = <JavaConstant[]>[];

	get<T>(index: number) { return <T><any>this.items[index]; }
	getValue(index: number) { return (<any>this.items[index]).value; }
	getString(index: number) { return this.get<JavaConstantUtf8>(index).string; }
	getClassName(index: number) { return this.getString(this.get<JavaConstantClassReference>(index).indexName); }
	getClassReference(index: number) { return this.get<JavaConstantClassReference>(index); }

	getMethodName(index: number) {
		var mr = this.getMethodReference(index);
		var className = this.getString(this.get<JavaConstantClassReference>(mr.indexClassReference).indexName);
		var methodName = this.getString(this.get<JavaConstantNameTypeDescriptor>(mr.indexNameType).indexName);
		var typeName = this.getString(this.get<JavaConstantNameTypeDescriptor>(mr.indexNameType).indexType);
		return className + '.' + methodName + typeName;
	}

	getType(index: number) { return this.items[index].constructor; }
	getFieldReference(index: number) { return this.get<JavaConstantFieldReference>(index); }
	getMethodReference(index: number) { return this.get<JavaConstantMethodReference>(index); }
	getMethodType(index: number) { return this.getMethodReference(index).type(this); }
	dump() { this.items.forEach((item, index) => { console.log(index, item.constructor, item); }); }

	readInfo(stream: Stream): JavaConstant {
		var pool = this;
		var offset = stream.position;
		var type = <CONSTANT>stream.readUInt8();

		switch (type) {
			case CONSTANT.Utf8: return new JavaConstantUtf8(pool, stream.readBytes(stream.readUInt16BE()));
			case CONSTANT.Integer: return new JavaConstantInt(pool, stream.readInt32BE());
			case CONSTANT.Float: throw (new Error("CONSTANT.Float"));
			case CONSTANT.Long: return new JavaConstantLong(pool, stream.readInt32BE(), stream.readInt32BE());
			case CONSTANT.Double: throw (new Error("CONSTANT.Double"));
			case CONSTANT.Class: return new JavaConstantClassReference(pool, stream.readUInt16BE());
			case CONSTANT.String: return new JavaConstantStringReference(pool, stream.readUInt16BE());
			case CONSTANT.Fieldref: return new JavaConstantFieldReference(pool, stream.readUInt16BE(), stream.readUInt16BE());
			case CONSTANT.Methodref: return new JavaConstantMethodReference(pool, stream.readUInt16BE(), stream.readUInt16BE());
			case CONSTANT.InterfaceMethodref: return new JavaConstantInterfaceMethodReference(pool, stream.readUInt16BE(), stream.readUInt16BE());
			case CONSTANT.NameAndType: return new JavaConstantNameTypeDescriptor(pool, stream.readUInt16BE(), stream.readUInt16BE());
		}

		throw (new Error("Unknown type of constant pool info " + type + " at " + 'className' + ":" + offset + ":"));
	}

	static fromStream(stream: Stream, count: number) {
		var pool = new ConstantPool();
		for (var index = 1; index < count; index++) {
			var item = pool.items[index] = pool.readInfo(stream);
			if (item instanceof JavaConstantLong || item instanceof JavaConstantDouble) index++;
		}
		return pool;
	}
}

export interface JavaConstant { }
export class JavaConstantUtf8 implements JavaConstant { string = ""; constructor(pool: ConstantPool, data: NodeBuffer) { this.string = data.toString('utf-8'); } }
export class JavaConstantInt implements JavaConstant { constructor(pool: ConstantPool, public value: number) { } }
export class JavaConstantLong implements JavaConstant { constructor(pool: ConstantPool, public low: number, public high: number) { } }
export class JavaConstantDouble implements JavaConstant { constructor(pool: ConstantPool, public value: number) { } }
export class JavaConstantClassReference implements JavaConstant {
	constructor(pool: ConstantPool, public indexName: number) { }
	name(pool: ConstantPool) { return pool.getString(this.indexName) }
}
export class JavaConstantStringReference implements JavaConstant { constructor(pool: ConstantPool, public index: number) { } }

export class JavaConstantFieldMethodReference implements JavaConstant {
	constructor(pool: ConstantPool, public indexClassReference: number, public indexNameType: number) { }
	classReference(pool: ConstantPool) { return pool.get<JavaConstantClassReference>(this.indexClassReference); }
	className(pool: ConstantPool) { return pool.getString(this.classReference(pool).indexName); }
	nameTypeDescriptor(pool: ConstantPool) { return pool.get<JavaConstantNameTypeDescriptor>(this.indexNameType); }
	name(pool: ConstantPool) { return this.nameTypeDescriptor(pool).name(pool); }
	type(pool: ConstantPool) { return this.nameTypeDescriptor(pool).type(pool); }
}

export class JavaConstantFieldReference extends JavaConstantFieldMethodReference {
	constructor(pool: ConstantPool, public indexClassReference: number, public indexNameType: number) { super(pool, indexClassReference, indexNameType); }
}
export class JavaConstantMethodReference extends JavaConstantFieldMethodReference {
	constructor(pool: ConstantPool, public indexClassReference: number, public indexNameType: number) { super(pool, indexClassReference, indexNameType); }
}
export class JavaConstantInterfaceMethodReference implements JavaConstant { constructor(pool: ConstantPool, public index1: number, public index2: number) { } }
export class JavaConstantNameTypeDescriptor implements JavaConstant {
	constructor(pool: ConstantPool, public indexName: number, public indexType: number) { }
	name(pool: ConstantPool) { return pool.getString(this.indexName); }
	type(pool: ConstantPool) { return pool.getString(this.indexType); }
}

