var test = require('tape');
var addToPage = require('../helpers/add-to-page');

var site = [{
  toc: '',
  content: ''
}];
var content = '# Oh hello \n I didnt see you there';
var expected = [ { content: '<h1>Oh hello</h1>\n<p>I didnt see you there</p>\n', toc: '<ul>\n<li><a href="#oh-hello">Oh hello</a></li>\n</ul>\n' } ];

function cb (err, object) {
  if (err) { return err; }
  return object;
}

test('Content to Static Site object.', function (t) {
  t.plan(3);

  var partialFunction = addToPage(site, cb);
  t.equal(typeof partialFunction, 'function', 'Partially applied function is ready for text');

  var newSite = partialFunction(content);

  t.equal(newSite[0].toc.length, expected[0].toc.length, 'Rendered Table of Contents added to page');
  t.equal(newSite[0].content.length, expected[0].content.length, 'Rendered Text content added to page');
});
