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
  var strapFirst = options.strapFirst || [];
  getListOfFiles(path, {
    callOrder: callOrder,
    strapFirst: strapFirst
  }).forEach(function (file) {
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

var getListOfFiles = function getListOfFiles(path, options) {
  var filesList = fs.readdirSync(path);
  if (options.callOrder.length) {
    return filesList.sort(inSuppliedOrder(options.callOrder));
  } else if (options.strapFirst.length) {
    var filesToStrapAfter = [];
    var strapListWithExtension = appendExtension(options.strapFirst);
    return filesList.filter(function (fileName) {
      var fileInStrapList = -1 !== strapListWithExtension.indexOf(fileName);
      if (false === fileInStrapList) {
        filesToStrapAfter.push(fileName);
      }
      return fileInStrapList;
    }).sort(inSuppliedOrder(options.strapFirst)).concat(filesToStrapAfter);
  } else {
    return filesList;
  }
};

var inPartialOrder = function inPartialOrder(strapFirst) {
  strapFirst = appendExtension(strapFirst);
  return function strapFirstSortFunc(a, b) {
    if (-1 === strapFirst.indexOf(a) || -1 === strapFirst.indexOf(b)) {
      return -1;
    } else {
      return strapFirst.indexOf(a) - strapFirst.indexOf(b);
    }
  };
};

var appendExtension = function appendExtension(files) {
  return files.map(function (fileName) {
    return nodePath.extname(fileName) === '' ? fileName + '.js' : fileName;
  });
};

var inSuppliedOrder = function inSuppliedOrder(callOrder) {
  callOrder = appendExtension(callOrder);
  return function sortingFunc(a, b) {
    return callOrder.indexOf(a) - callOrder.indexOf(b);
  };
};

var closeUp = function closeUp(path) {
  var endCharacter = '/' !== path.charAt(path.length-1) ? '/' : '';
  return path + endCharacter
};

module.exports = crawl;

