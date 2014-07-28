import assert = require('assert');
import fs = require('fs');
import jsjvm = require('../src/jsjvm');

describe('test', () => {
	it('test', () => {
		var BitsClass = jsjvm.JavaClass.fromStream(new jsjvm.Stream(fs.readFileSync(__dirname + '/Bits.class')));
		//var FibClass = JavaClass.fromStream(new Stream(fs.readFileSync(__dirname + '/sample/Fib.class')));
		var getChar = BitsClass.getMethod('getChar').func;
		var array = new Uint8Array([1, 2, 3]);
		assert.equal(258, getChar(array, 0));
		assert.equal(515, getChar(array, 1));
	});
});