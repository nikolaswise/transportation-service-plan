var md2toc = require('markdown-toc');
var renderMarkdown = require('./render-markdown');

module.exports = function (text) {
  var markdown = md2toc(text, {maxdepth: 2}).content;
  var tableOfContents = renderMarkdown(markdown);
  return tableOfContents;
};
