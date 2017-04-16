'use strict';
var fs = require('fs');
var nodePath = require('path');

var crawl = function crawl(filePath, options) {
  options = options || {};
  var rootDir = options.rootDir || process.cwd();
  var argsToApply = options.applyArgs || [];
  var path = nodePath.resolve(rootDir, filePath);
  var callOrder = options.callOrder || [];
  var strapDirectories = options.strapDirectories || false;
  fs.readdirSync(path).sort(inSuppliedOrder(callOrder)).forEach(function (file) {
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
          required.apply(null, argsToApply);
        }
      }
    } else if (strapDirectories && stat.isDirectory()) {
      crawl.call(null, newPath, options);
    }
  });
};

var inSuppliedOrder = function inSuppliedOrder(callOrder) {
  callOrder = callOrder.map(function (name) {
    return nodePath.extname(name) === '' ? name + '.js' : name;
  });
  return function sortingFunc(a, b) {
    return callOrder.indexOf(a) - callOrder.indexOf(b);
  };
};

var closeUp = function closeUp(path) {
  var endCharacter = '/' !== path.charAt(path.length-1) ? '/' : '';
  return path + endCharacter
};

module.exports = crawl;

