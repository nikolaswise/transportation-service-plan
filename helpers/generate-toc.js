var md2toc = require('markdown-toc');
var renderMarkdown = require('./render-markdown');

/**
 * Generates Markdown table of contents from the body of a markdown file.
 *
 * @param {String} String of Markdown
 * @returns {String} String of Mardown representing the Table of Contents
 */
module.exports = function (text) {
  var markdown = md2toc(text, {maxdepth: 2}).content;
  var tableOfContents = renderMarkdown(markdown);
  return tableOfContents;
};
