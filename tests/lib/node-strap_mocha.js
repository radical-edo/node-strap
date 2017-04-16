'use strict';
var bootstarap = require(__rootdir, '/lib/node-strap')

describe('strap', function() {
  it('has models function', function() {
    assert.equal(typeof bootstarap.files, 'function')
  })
})
