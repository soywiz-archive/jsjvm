﻿import assert = require('assert');
import fs = require('fs');
import jsjvm = require('../src/jsjvm');

import Stream = jsjvm.Stream;
import JavaClass = jsjvm.JavaClass;

describe('Bits.class', () => {
	var BitsClass = JavaClass.fromStream(new Stream(fs.readFileSync(__dirname + '/Bits.class')));

	it('getBool', () => {
		var getBoolean = BitsClass.getMethod('getBoolean').func;
		assert.equal(0, getBoolean(new Uint8Array([0]), 0));
		assert.equal(1, getBoolean(new Uint8Array([2]), 0));
		assert.equal(1, getBoolean(new Uint8Array([-1]), 0));
	});

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

describe('Ternary.class', () => {
	var BitsClass = JavaClass.fromStream(new Stream(fs.readFileSync(__dirname + '/../sample/Ternary.class')));

	it('min', () => {
		var min = BitsClass.getMethod('min').func;
		assert.equal(3, min(3, 7));
		assert.equal(3, min(7, 3));
		assert.equal(-2, min(-1, -2));
	});
});

describe('IfTest.class', () => {
	var BitsClass = JavaClass.fromStream(new Stream(fs.readFileSync(__dirname + '/../sample/IfTest.class')));

	it('demo', () => {
		var demoMethod = BitsClass.getMethod('demo');
		var demo = demoMethod.func;
		//console.log(demoMethod.body);
		assert.equal(1, demo(3, 7, 4));
		assert.equal(2, demo(7, 3, 4));
	});
});