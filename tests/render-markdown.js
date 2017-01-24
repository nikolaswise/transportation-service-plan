var test = require('tape');
var renderMarkdown = require('../helpers/render-markdown');

test('Render markdown test', function (t) {
  t.plan(1);

  let sample = '# I am some simple markdown';
  // careful! the below html has hidden soft hyphens in it.
  let expected = '<h1>I am some sim­ple mark­down</h1>\n';

  t.equal(renderMarkdown(sample), expected, 'Markdown being properly rendered and typeset.');
});
