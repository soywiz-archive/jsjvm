function range(count) {
    return Array.apply(null, { length: count }).map(Number.call, Number);
}
exports.range = range;

var Stream = (function () {
    function Stream(buffer) {
        this.buffer = buffer;
        this.position = 0;
    }
    Object.defineProperty(Stream.prototype, "length", {
        get: function () {
            return this.buffer.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Stream.prototype, "available", {
        get: function () {
            return this.buffer.length - this.position;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Stream.prototype, "eof", {
        get: function () {
            return this.available <= 0;
        },
        enumerable: true,
        configurable: true
    });
    Stream.prototype._move = function (value, offset) {
        this.position += offset;
        return value;
    };
    Stream.prototype.readUInt32BE = function () {
        return this._move(this.buffer.readUInt32BE(this.position), 4);
    };
    Stream.prototype.readUInt16BE = function () {
        return this._move(this.buffer.readUInt16BE(this.position), 2);
    };
    Stream.prototype.readInt32BE = function () {
        return this._move(this.buffer.readInt32BE(this.position), 4);
    };
    Stream.prototype.readInt16BE = function () {
        return this._move(this.buffer.readInt16BE(this.position), 2);
    };
    Stream.prototype.readInt8 = function () {
        return this._move(this.buffer.readInt8(this.position), 1);
    };
    Stream.prototype.readUInt8 = function () {
        return this._move(this.buffer.readUInt8(this.position), 1);
    };
    Stream.prototype.readBytes = function (count) {
        return this._move(this.buffer.slice(this.position, this.position + count), count);
    };
    return Stream;
})();
exports.Stream = Stream;

var StringReader = (function () {
    function StringReader(reference) {
        this.reference = reference;
        this.offset = 0;
    }
    Object.defineProperty(StringReader.prototype, "length", {
        get: function () {
            return this.reference.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StringReader.prototype, "available", {
        get: function () {
            return this.length - this.offset;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StringReader.prototype, "eof", {
        get: function () {
            return this.available <= 0;
        },
        enumerable: true,
        configurable: true
    });
    StringReader.prototype.read = function () {
        return this.reference.charAt(this.offset++);
    };
    return StringReader;
})();
exports.StringReader = StringReader;
//# sourceMappingURL=utils.js.map
