'use strict';
var fs = require('fs');
var nodePath = require('path');

var crawl = function crawl(path) {
  if (/\.\W/.test(path)) {
    throw new Error('please provide an absolute path')
  }
  var self = this;
  var crawlArgs = arguments;
  fs.readdirSync(path).forEach(function (file) {
    var closedUpPath = closeUp(path);
    // has to be a full path to file
    // otherwise node assumes it's a module
    var newPath = closedUpPath + file;
    var stat = fs.statSync(newPath);
    if (stat.isFile()) {
      var extension = nodePath.extname(file)
      if ('.js' === extension || '.coffee' === extension) {
        var required = require(newPath);
        if (typeof required === 'function') {
          var args = Array.prototype.slice.call(crawlArgs, 1);
          required.apply(self, args);
        }
      }
    } else if (stat.isDirectory()) {
      var args = Array.prototype.slice.call(crawlArgs, 1);
      args.unshift(newPath);
      crawl.apply(self, args);
    }
  });
};

var closeUp = function closeUp(path) {
  var endCharacter = '/' !== path.charAt(path.length-1) ? '/' : '';
  return path + endCharacter
};

module.exports = crawl
