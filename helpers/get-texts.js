var fs = require('fs');

/**
 * Generates Markdown table of contents from the body of a markdown file.
 *
 * @param {Array} Array of file paths to scrape text from.
 * @returns {String} String of text read from files.
 */
module.exports = function (files) {
  let text = '';
  files.map(function (file) {
    text += fs.readFileSync('./src/text/' + file, 'utf8');
    text += '\n';
  });
  return text;
};
