var bootstarap = require(__rootdir, '/lib/mongoose-bootstrap')

describe('bootstrap', function() {
  it('has models function', function() {
    assert.equal(typeof bootstarap.models, 'function')
  })
})
