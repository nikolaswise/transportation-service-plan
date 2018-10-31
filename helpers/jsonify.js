var fs = require('fs');
var indexer = require("markdown2json").Indexer;
var parser = require("markdown2json").parseMD;

indexer = new indexer({
  "dir" : "./src/text",
  "cleanMD" : true
});

indexer.run()
.then(function(idx){
  idx.forEach(function (file) {
    parse(file)
  })
})

function parse (file) {
  parser("./src/text" + file.path, {
    "dir" : "./src/text",
    "cleanMD" : true,
  })
  .then(function(jsonObj){
  })
  .catch(function(err){
  })
}
