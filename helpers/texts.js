var fs = require('fs');
var getTexts = require('./get-texts');
var addToPage = require('./add-to-page');

/**
 * Generates HTML from Markdown
 *
 * @param {String} String of Markdown
 * @param {Object} Static Site site object
 * @param {Function} Static Site helper callback
 * @returns {String} String of HTML
 */
function apply (text, site, cb) {
  var helper = addToPage(site, cb);
  return helper(text);
}

/**
 * Generates HTML with Table of Contents from directory of markdown files.
 * Runs on compilation of static site.
 *
 * @param {String} String of Markdown
 * @returns {String} String of HTML
 */
module.exports = function (site, cb) {
  let sources = fs.readdirSync('./src/lib/');
  console.log(sources)
  let text = getTexts(sources);
  apply(text, site, cb);
};
