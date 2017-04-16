'use strict';
var fs = require('fs');
var nodePath = require('path');

var crawl = function crawl(filePath, options) {
  options = options || {};
  var rootDir = options.rootDir || process.cwd();
  var self = this;
  var argsToApply = options.applyArgs || [];
  var path = nodePath.resolve(rootDir, filePath);
  fs.readdirSync(path).forEach(function (file) {
    var closedUpPath = closeUp(path);
    // has to be a full path to file
    // otherwise node assumes it's a module
    var newPath = closedUpPath + file;
    var stat = fs.statSync(newPath);
    if (stat.isFile()) {
      var extension = nodePath.extname(file);
      if ('.js' === extension) {
        var required = require(newPath);
        if (typeof required === 'function') {
          required.apply(self, argsToApply);
        }
      }
    } else if (stat.isDirectory()) {
      crawl.call(self, newPath, options);
    }
  });
};

var closeUp = function closeUp(path) {
  var endCharacter = '/' !== path.charAt(path.length-1) ? '/' : '';
  return path + endCharacter
};

module.exports = crawl;

