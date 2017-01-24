var md = require('markdown-it')({
  typographer: true,
  quotes: '“”‘’'
}).use(require('markdown-it-sanitizer'), {
  imageClass: 'img',
  removeUnbalanced: true,
  removeUnknown: true
});
var typeset = require('typeset');

module.exports = function (text) {
  return typeset(md.render(text));
};
