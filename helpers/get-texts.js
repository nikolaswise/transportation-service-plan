var fs = require('fs');
var parser = require("markdown2json").parseMD;


/**
 * Generates Markdown table of contents from the body of a markdown file.
 *
 * @param {Array} Array of file paths to scrape text from.
 * @returns {String} String of text read from files.
 */
module.exports = function (files) {
  let text = '';

parser("./src/content", {
  "cleanMD" : true,
}).then(
  function(jsonObj){
    fs.writeFile('./src/content.json', jsonObj, function (err) {
      if (err) return console.log(err);
    });
  }
)

  files.map(function (file) {
    text += fs.readFileSync('./src/text/' + file, 'utf8');
    text += '\n';
  });
  return text;
};
