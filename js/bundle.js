(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.tsp = factory());
}(this, (function () { 'use strict';

//src/foo.js

var foo = 36;

console.log('your value is ' + foo);

var main = function () {
  console.log('your value is ' + foo);
};

return main;

})));
