import assert = require('assert');
import fs = require('fs');
import jsjvm = require('../src/jsjvm');

describe('Bits.class', () => {
	var BitsClass = jsjvm.JavaClass.fromStream(new jsjvm.Stream(fs.readFileSync(__dirname + '/Bits.class')));
	it('getChar', () => {
		var getChar = BitsClass.getMethod('getChar').func;
		var array = new Uint8Array([1, 2, 3]);
		assert.equal(258, getChar(array, 0));
		assert.equal(515, getChar(array, 1));
	});

	it('getShort', () => {
		var getShort = BitsClass.getMethod('getShort').func;
		var array = new Uint8Array([1, 2, 3]);
		assert.equal(258, getShort(array, 0));
		assert.equal(515, getShort(array, 1));
	});

	it('getInt', () => {
		var getInt = BitsClass.getMethod('getInt').func;
		var array = new Uint8Array([1, 2, 3, 4]);
		assert.equal(16909060, getInt(array, 0));
	});
});