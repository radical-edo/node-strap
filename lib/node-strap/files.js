var fs = require('fs'),
    nodePath = require('path'),
    closeUp, crawl

crawl = function(path) {
  if (/\./.test(path)) {
    throw new Error('please provide an absolute path')
  }
  path = closeUp(path)
  var self = this
  var crawlArgs = arguments
  fs.readdirSync(path).forEach(function(file) {
    var newPath, required, args, extension 
    // has to be a full path to file
    // otherwise node assumes it's a module
    newPath = path + file
    stat = fs.statSync(newPath)
    if (stat.isFile()) {
      extension = nodePath.extname(file)
      if ('.js' === extension || '.coffee' === extension) {
        required = require(newPath)
        if (typeof required === 'function') {
          args = Array.prototype.slice.call(crawlArgs, 1)
          required.apply(self, args)
        }
      }
    } else if (stat.isDirectory()) {
      args = Array.prototype.slice.call(crawlArgs, 1)
      args[0] = newPath
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
