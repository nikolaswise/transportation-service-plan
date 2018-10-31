var test = require('tape');
import add from './add';

test('This is a thing!', function (t) {
  t.plan(1);
  var result = add(1,1)
  var expect = 2
  t.equal(result, expect, 'This fails.');
});
