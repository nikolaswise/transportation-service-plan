var fs = require('fs');

module.exports = function (files) {
  let text = '';
  files.map(function (file) {
    text += fs.readFileSync('./src/text/' + file, 'utf8');
    text += '\n';
  });
  return text;
};
