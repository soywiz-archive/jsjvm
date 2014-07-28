var fs = require('fs');
var jsjvm = require('./src/jsjvm');

var BitsClass = jsjvm.JavaClass.fromStream(new jsjvm.Stream(fs.readFileSync(__dirname + '/test/Bits.class')));

//var FibClass = JavaClass.fromStream(new Stream(fs.readFileSync(__dirname + '/sample/Fib.class')));
var getChar = BitsClass.getMethod('getChar').func;
var array = new Uint8Array([1, 2, 3]);
var v = 0;
var start = Date.now();

for (var n = 0; n < 10000; n++) {
    v += getChar(array, 0);
}
console.log(v, Date.now() - start);
/*
console.log('----------');
*/
//# sourceMappingURL=main.js.map
