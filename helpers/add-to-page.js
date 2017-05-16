var generateToC = require('./generate-toc');
var renderMarkdown = require('./render-markdown');

/**
 * Creates HTML from a markdown table of content, adds to each page.
 * Occurs on compilation of site with Static Site
 *
 * @param {Object} Static Site site object
 * @param {Function} Static Site helper callback.
 * @returns {Function} Partially applied function
 */
module.exports = function (site, cb) {
  return function (text) {
    site = site.map(function (page) {
      page.toc = generateToC(text);
      console.log(page.toc);
      page.content = renderMarkdown(text);
      return page;
    });
    cb(null, site);
    return site;
  };
};
