var fs = require('fs'), closeUp, crawl

crawl = function(path) {
  if (/\./.test(path)) {
    throw new Error('please provide an absolute path')
  }
  path = closeUp(path)
  var newPath
  fs.readdirSync(path).forEach(function(file) {
    // has to be a full path to file
    // otherwise node assumes it's a module
    newPath = path + file
    stat = fs.statSync(newPath)
    if (stat.isFile()) {
      if (/(.*)\.(js$|coffee$)/.test(file)) {
        require(newPath)
      }
    } else if (stat.isDirectory()) {
      crawl(newPath)
    }
  })
}

closeUp = function(path) {
  var endCharacter
  endCharacter = '/' !== path.charAt(path.length-1) ? '/' : ''
  return path + endCharacter
}

module.exports = crawl
