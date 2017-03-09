var test = require('tape');
var generateToC = require('../../helpers/generate-toc');

test('Generate Table of Contents', function (t) {
  t.plan(1);

  let sample = '# one \n ## two \n ### three \n # one \n ## two \n ## two';
  let expected = '<ul>\n<li><a href="#one">one</a>\n<ul>\n<li><a href="#two">two</a></li>\n</ul>\n</li>\n<li><a href="#one-1">one</a>\n<ul>\n<li><a href="#two-1">two</a></li>\n<li><a href="#two-2">two</a></li>\n</ul>\n</li>\n</ul>\n';

  t.equal(generateToC(sample), expected, 'Table of Contents being properly scraped and rendered.');
});
