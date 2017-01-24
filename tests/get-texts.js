var test = require('tape');
var getTexts = require('../helpers/get-texts');

test('Get texts from files', function (t) {
  t.plan(1);
  let text = getTexts(['01-TSP-introduction.markdown_github']);
  let actual = text.split('\n', 1)[0];
  let expected = 'Introduction';
  t.equals(actual, expected, 'First line of the document is "Introduction".');
});
