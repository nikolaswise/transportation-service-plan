import test from 'tape';
import * as map from '../src/js/map/map';

test('Map is a thing I can look at', function (t) {
  t.plan(1);
  console.log(map);
  t.equal('foo', 'bar', 'This fails.');
});
