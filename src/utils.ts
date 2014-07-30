export function range(count: number): number[] { return Array.apply(null, { length: count }).map(Number.call, Number); }

export class Stream {
	position = 0;
	constructor(private buffer: NodeBuffer) { }
	get length() { return this.buffer.length; }
	get available() { return this.buffer.length - this.position; }
	get eof() { return this.available <= 0; }
	private _move<T>(value: T, offset: number) { this.position += offset; return value; }
	pad(pad: number) { while ((this.position % pad) != 0) { this.position++; } }
	readUInt32BE() { return this._move(this.buffer.readUInt32BE(this.position), 4); }
	readUInt16BE() { return this._move(this.buffer.readUInt16BE(this.position), 2); }
	readInt32BE() { return this._move(this.buffer.readInt32BE(this.position), 4); }
	readInt16BE() { return this._move(this.buffer.readInt16BE(this.position), 2); }
	readInt8() { return this._move(this.buffer.readInt8(this.position), 1); }
	readUInt8() { return this._move(this.buffer.readUInt8(this.position), 1); }
	readBytes(count: number) { return this._move(this.buffer.slice(this.position, this.position + count), count); }
}

export class StringReader {
	private offset = 0;
	constructor(private reference: string) {
	}
	get length() { return this.reference.length; }
	get available() { return this.length - this.offset; }
	get eof() { return this.available <= 0; }
	read() {
		return this.reference.charAt(this.offset++);
	}
}
