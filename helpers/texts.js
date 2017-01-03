var fs = require('fs')
var md = require('markdown-it')({
  typographer: true,
  quotes: '“”‘’'
}).use(require('markdown-it-sanitizer'), {
  imageClass: 'img',
  removeUnbalanced: true,
  removeUnknown: true
});

var typeset = require('typeset');

module.exports = function (site, cb) {

  var getFiles = function (err, files) {
    if (err) {
      return err
    }
    let text
    files.map(function (file) {
      text += fs.readFileSync('./src/text/' + file, 'utf8')
      text += "\n"
    })
    content(text)
  }

  var stuff = function (site, cb) {
    return function (text) {
      site = site.map(function (page) {
        page.content = text
        page.content = md.render(page.content)
        page.content = typeset(page.content)
        console.log(page.content)
        return page
      })
      cb(null, site)
    }
  }

  let content = stuff(site, cb)

  fs.readdir('./src/text/', getFiles)
}