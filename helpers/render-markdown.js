var md = require('markdown-it')({
  typographer: true,
  quotes: '“”‘’'
}).use(require('markdown-it-anchor')).use(require('markdown-it-sanitizer'), {
  imageClass: 'img',
  removeUnbalanced: true,
  removeUnknown: true
}).use(require('markdown-it-kramdown-attrs'));

/**
 * Generates HTML from Markdown
 *
 * @param {String} String of Markdown
 * @returns {String} String of HTML
 */

module.exports = function (text) {
  return md.render(text);
};
