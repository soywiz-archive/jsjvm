jsjvm
=====

[![Build Status](https://travis-ci.org/soywiz/jsjvm.svg?branch=master)](https://travis-ci.org/soywiz/jsjvm)

A java virtual machine for javascript (dynamic recompilation not an interpreter).

The idea is to convert the initial vm into a static compiler that converts java into several other languages like haxe.
Using a jre, cutting the dependency tree and just implementing the native functions. Ignoring visibility, reflection and
threading initially. And putting a event loop on top of it so it can run on browsers and perform async operations.
The idea is to support java8.

Currently in its initial stages.

First the compiler tries to convert methods into something like this (near native speed with modern js engines):

```javascript
"use strict";
return Convert.i2c((((arg0[((arg1|0) + 1)] & 255) << 0) + (arg0[((arg1|0) + 0)] << 8)));
```

And in the case it cannot follow the flow with gotos and keep the stack at 0 in compilation time,
it generates simething much slower but safer:

```javascript
"use strict"; var stack = []; var locals = []; var label = 0;
locals[0] = { value: null };
locals[1] = { value: null };
arg0 = { value: arg0 };
arg1 = { value: arg1 };
while (true) switch (label) {
case 0: stack.push(arg0); // aload
case 1: stack.push(arg1.value); // _load
case 2: stack.push(1); // iconst
case 3: var r = stack.pop(), l = stack.pop(); stack.push(l + r); // ibinop(+)
case 4: var i = stack.pop(), aref = stack.pop(); stack.push(aref.value[i]); // baload
case 5: stack.push(255); // iconst
case 8: var r = stack.pop(), l = stack.pop(); stack.push(l & r); // ibinop(&)
case 9: stack.push(0); // iconst
case 10: var r = stack.pop(), l = stack.pop(); stack.push(l << r); // ibinop(<<)
case 11: stack.push(arg0); // aload
case 12: stack.push(arg1.value); // _load
case 13: stack.push(0); // iconst
case 14: var r = stack.pop(), l = stack.pop(); stack.push(l + r); // ibinop(+)
case 15: var i = stack.pop(), aref = stack.pop(); stack.push(aref.value[i]); // baload
case 16: stack.push(8); // iconst
case 18: var r = stack.pop(), l = stack.pop(); stack.push(l << r); // ibinop(<<)
case 19: var r = stack.pop(), l = stack.pop(); stack.push(l + r); // ibinop(+)
case 20: stack.push(Convert.i2c(stack.splice(stack.length - 1))); // call
case 21: return stack.pop(); // _return
```
