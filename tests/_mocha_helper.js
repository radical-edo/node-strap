'use strict';
var path = require('path');

global.__rootdir = path.normalize(__dirname + '/..');
global.context = describe;
global.assert = require('assert');
