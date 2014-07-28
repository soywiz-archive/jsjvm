jsjvm
=====

[![Build Status](https://travis-ci.org/soywiz/jsjvm.svg?branch=master)](https://travis-ci.org/soywiz/jsjvm)

A java virtual machine for javascript (dynamic recompilation not an interpreter).

The idea is to convert the initial vm into a static compiler that converts java into several other languages like haxe.
Using a jre, cutting the dependency tree and just implementing the native functions. Ignoring visibility, reflection and
threading initially. And putting a event loop on top of it so it can run on browsers and perform async operations.
The idea is to support java8.

Currently in its initial stages.
