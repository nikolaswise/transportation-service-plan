var generateToC = require('./generate-toc');
var renderMarkdown = require('./render-markdown');

module.exports = function (site, cb) {
  return function (text) {
    site = site.map(function (page) {
      page.toc = generateToC(text);
      page.content = renderMarkdown(text);
      return page;
    });
    cb(null, site);
    return site;
  };
};
