var models = require(__rootdir + '/lib/mongoose-bootstrap/models'),
    path = require('path')

describe('models', function() {
  before(function() {
    models(__rootdir + '/tests/support/directory_tree')
  })
  context('tree', function() {
    it('has root', function() {
      assert.equal(root, 'root')
    })
  })
})
