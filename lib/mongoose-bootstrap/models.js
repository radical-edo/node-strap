var fs = require('fs'), closeUp

module.exports = function(path) {
  path = closeUp(path)
  var newPath
  fs.readdirSync(path).forEach(function(file) {
    // has to be a full path to file
    // otherwise node assumes it's a module
    newPath = path + file
    stat = fs.statSync(newPath)
    if (stat.isFile()) {
      require(newPath)
    }
  })
}

closeUp = function(path) {
  var endCharacter
  endCharacter = '/' !== path.charAt(path.length-1) ? '/' : ''
  return path + endCharacter
}
