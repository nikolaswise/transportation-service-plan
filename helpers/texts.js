var fs = require('fs');
var getTexts = require('./get-texts');
var addToPage = require('./add-to-page');

function apply (text, site, cb) {
  var helper = addToPage(site, cb);
  return helper(text);
}

module.exports = function (site, cb) {
  let sources = fs.readdirSync('./src/text/');
  let text = getTexts(sources);
  apply(text, site, cb);
};
