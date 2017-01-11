var fs = require('fs');
var md = require('markdown-it')({
  typographer: true,
  quotes: '“”‘’'
}).use(require('markdown-it-sanitizer'), {
  imageClass: 'img',
  removeUnbalanced: true,
  removeUnknown: true
});

var md2toc = require('markdown-toc');

var typeset = require('typeset');

module.exports = function (site, cb) {
  var getFiles = function (err, files) {
    if (err) {
      return err;
    }
    let text = '';
    files.map(function (file) {
      text += fs.readFileSync('./src/text/' + file, 'utf8');
      text += '\n';
    });
    content(text);
  };

  var stuff = function (site, cb) {
    return function (text) {
      let toc = md2toc(text, {maxdepth: 2}).content;
      console.log(toc);
      site = site.map(function (page) {
        page.toc = md.render(toc);
        page.content = text;
        page.content = md.render(page.content);
        page.content = typeset(page.content);
        return page;
      });
      cb(null, site);
    };
  };

  let content = stuff(site, cb);

  fs.readdir('./src/text/', getFiles);
};
