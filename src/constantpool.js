var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
(function (CONSTANT) {
    CONSTANT[CONSTANT["Utf8"] = 1] = "Utf8";
    CONSTANT[CONSTANT["Integer"] = 3] = "Integer";
    CONSTANT[CONSTANT["Float"] = 4] = "Float";
    CONSTANT[CONSTANT["Long"] = 5] = "Long";
    CONSTANT[CONSTANT["Double"] = 6] = "Double";
    CONSTANT[CONSTANT["Class"] = 7] = "Class";
    CONSTANT[CONSTANT["String"] = 8] = "String";
    CONSTANT[CONSTANT["Fieldref"] = 9] = "Fieldref";
    CONSTANT[CONSTANT["Methodref"] = 10] = "Methodref";
    CONSTANT[CONSTANT["InterfaceMethodref"] = 11] = "InterfaceMethodref";
    CONSTANT[CONSTANT["NameAndType"] = 12] = "NameAndType";
})(exports.CONSTANT || (exports.CONSTANT = {}));
var CONSTANT = exports.CONSTANT;

var ConstantPool = (function () {
    function ConstantPool() {
        this.items = [];
    }
    ConstantPool.prototype.get = function (index) {
        return this.items[index];
    };
    ConstantPool.prototype.getValue = function (index) {
        return this.items[index].value;
    };
    ConstantPool.prototype.getString = function (index) {
        return this.get(index).string;
    };
    ConstantPool.prototype.getClassName = function (index) {
        return this.getString(this.get(index).indexName);
    };
    ConstantPool.prototype.getClassReference = function (index) {
        return this.get(index);
    };

    ConstantPool.prototype.getMethodName = function (index) {
        var mr = this.getMethodReference(index);
        var className = this.getString(this.get(mr.indexClassReference).indexName);
        var methodName = this.getString(this.get(mr.indexNameType).indexName);
        var typeName = this.getString(this.get(mr.indexNameType).indexType);
        return className + '.' + methodName + typeName;
    };

    ConstantPool.prototype.getType = function (index) {
        return this.items[index].constructor;
    };
    ConstantPool.prototype.getFieldReference = function (index) {
        return this.get(index);
    };
    ConstantPool.prototype.getMethodReference = function (index) {
        return this.get(index);
    };
    ConstantPool.prototype.getMethodType = function (index) {
        return this.getMethodReference(index).type(this);
    };
    ConstantPool.prototype.dump = function () {
        this.items.forEach(function (item, index) {
            console.log(index, item.constructor, item);
        });
    };

    ConstantPool.prototype.readInfo = function (stream) {
        var pool = this;
        var offset = stream.position;
        var type = stream.readUInt8();

        switch (type) {
            case 1 /* Utf8 */:
                return new JavaConstantUtf8(pool, stream.readBytes(stream.readUInt16BE()));
            case 3 /* Integer */:
                return new JavaConstantInt(pool, stream.readInt32BE());
            case 4 /* Float */:
                throw (new Error("CONSTANT.Float"));
            case 5 /* Long */:
                return new JavaConstantLong(pool, stream.readInt32BE(), stream.readInt32BE());
            case 6 /* Double */:
                throw (new Error("CONSTANT.Double"));
            case 7 /* Class */:
                return new JavaConstantClassReference(pool, stream.readUInt16BE());
            case 8 /* String */:
                return new JavaConstantStringReference(pool, stream.readUInt16BE());
            case 9 /* Fieldref */:
                return new JavaConstantFieldReference(pool, stream.readUInt16BE(), stream.readUInt16BE());
            case 10 /* Methodref */:
                return new JavaConstantMethodReference(pool, stream.readUInt16BE(), stream.readUInt16BE());
            case 11 /* InterfaceMethodref */:
                return new JavaConstantInterfaceMethodReference(pool, stream.readUInt16BE(), stream.readUInt16BE());
            case 12 /* NameAndType */:
                return new JavaConstantNameTypeDescriptor(pool, stream.readUInt16BE(), stream.readUInt16BE());
        }

        throw (new Error("Unknown type of constant pool info " + type + " at " + 'className' + ":" + offset + ":"));
    };

    ConstantPool.fromStream = function (stream, count) {
        var pool = new ConstantPool();
        for (var index = 1; index < count; index++) {
            var item = pool.items[index] = pool.readInfo(stream);
            if (item instanceof JavaConstantLong || item instanceof JavaConstantDouble)
                index++;
        }
        return pool;
    };
    return ConstantPool;
})();
exports.ConstantPool = ConstantPool;

var JavaConstantUtf8 = (function () {
    function JavaConstantUtf8(pool, data) {
        this.string = "";
        this.string = data.toString('utf-8');
    }
    return JavaConstantUtf8;
})();
exports.JavaConstantUtf8 = JavaConstantUtf8;
var JavaConstantInt = (function () {
    function JavaConstantInt(pool, value) {
        this.value = value;
    }
    return JavaConstantInt;
})();
exports.JavaConstantInt = JavaConstantInt;
var JavaConstantLong = (function () {
    function JavaConstantLong(pool, low, high) {
        this.low = low;
        this.high = high;
    }
    return JavaConstantLong;
})();
exports.JavaConstantLong = JavaConstantLong;
var JavaConstantDouble = (function () {
    function JavaConstantDouble(pool, value) {
        this.value = value;
    }
    return JavaConstantDouble;
})();
exports.JavaConstantDouble = JavaConstantDouble;
var JavaConstantClassReference = (function () {
    function JavaConstantClassReference(pool, indexName) {
        this.indexName = indexName;
    }
    JavaConstantClassReference.prototype.name = function (pool) {
        return pool.getString(this.indexName);
    };
    return JavaConstantClassReference;
})();
exports.JavaConstantClassReference = JavaConstantClassReference;
var JavaConstantStringReference = (function () {
    function JavaConstantStringReference(pool, index) {
        this.index = index;
    }
    return JavaConstantStringReference;
})();
exports.JavaConstantStringReference = JavaConstantStringReference;

var JavaConstantFieldMethodReference = (function () {
    function JavaConstantFieldMethodReference(pool, indexClassReference, indexNameType) {
        this.indexClassReference = indexClassReference;
        this.indexNameType = indexNameType;
    }
    JavaConstantFieldMethodReference.prototype.classReference = function (pool) {
        return pool.get(this.indexClassReference);
    };
    JavaConstantFieldMethodReference.prototype.className = function (pool) {
        return pool.getString(this.classReference(pool).indexName);
    };
    JavaConstantFieldMethodReference.prototype.nameTypeDescriptor = function (pool) {
        return pool.get(this.indexNameType);
    };
    JavaConstantFieldMethodReference.prototype.name = function (pool) {
        return this.nameTypeDescriptor(pool).name(pool);
    };
    JavaConstantFieldMethodReference.prototype.type = function (pool) {
        return this.nameTypeDescriptor(pool).type(pool);
    };
    return JavaConstantFieldMethodReference;
})();
exports.JavaConstantFieldMethodReference = JavaConstantFieldMethodReference;

var JavaConstantFieldReference = (function (_super) {
    __extends(JavaConstantFieldReference, _super);
    function JavaConstantFieldReference(pool, indexClassReference, indexNameType) {
        _super.call(this, pool, indexClassReference, indexNameType);
        this.indexClassReference = indexClassReference;
        this.indexNameType = indexNameType;
    }
    return JavaConstantFieldReference;
})(JavaConstantFieldMethodReference);
exports.JavaConstantFieldReference = JavaConstantFieldReference;
var JavaConstantMethodReference = (function (_super) {
    __extends(JavaConstantMethodReference, _super);
    function JavaConstantMethodReference(pool, indexClassReference, indexNameType) {
        _super.call(this, pool, indexClassReference, indexNameType);
        this.indexClassReference = indexClassReference;
        this.indexNameType = indexNameType;
    }
    return JavaConstantMethodReference;
})(JavaConstantFieldMethodReference);
exports.JavaConstantMethodReference = JavaConstantMethodReference;
var JavaConstantInterfaceMethodReference = (function () {
    function JavaConstantInterfaceMethodReference(pool, index1, index2) {
        this.index1 = index1;
        this.index2 = index2;
    }
    return JavaConstantInterfaceMethodReference;
})();
exports.JavaConstantInterfaceMethodReference = JavaConstantInterfaceMethodReference;
var JavaConstantNameTypeDescriptor = (function () {
    function JavaConstantNameTypeDescriptor(pool, indexName, indexType) {
        this.indexName = indexName;
        this.indexType = indexType;
    }
    JavaConstantNameTypeDescriptor.prototype.name = function (pool) {
        return pool.getString(this.indexName);
    };
    JavaConstantNameTypeDescriptor.prototype.type = function (pool) {
        return pool.getString(this.indexType);
    };
    return JavaConstantNameTypeDescriptor;
})();
exports.JavaConstantNameTypeDescriptor = JavaConstantNameTypeDescriptor;
//# sourceMappingURL=constantpool.js.map
