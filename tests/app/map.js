// import test from 'tape';
// import * as map from '../src/js/map/map';
// var test = require('tape');
// var map = require('../src/js/map/map');

require("babel-register");
require('babel-core/register');
require('babel/dist/external-helpers');
var test = require('tape');
// import {test} from 'tape';
// var dom = require('../../src/js/helpers/dom.js');
// var bus = require('../../src/js/helpers/bus.js');
// var layers = require('../../src/js/map/layers');
// var test = require('tape');
var map = require('../../src/js/map/map');

test('This is a thing!', function (t) {
  t.plan(1);
  console.log(map);
  t.equal('foo', 'bar', 'This fails.');
});
