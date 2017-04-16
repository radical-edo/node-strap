'use strict';
var models = require(__rootdir + '/lib/node-strap/files');
var path = require('path');

describe('models', function () {
  before(function () {
    models(__rootdir + '/tests/support/directory_tree', {
      applyArgs: ['yay']
    });
  });

  context('absolute path provided', function () {
    context('hidden directory in the path', function () {
      it('should not raise an error', function () {
        assert.doesNotThrow(function () {
          models(__rootdir + '/tests/support/directory_tree', {
            applyArgs: ['yay']
          });
        }, Error);
      });
    });

    context('invokes function', function () {
      it('with args', function () {
        assert.equal(bubu, 'yay');
      });

      it('goes deeper', function () {
        assert.equal(ubub, 'yay');
      });
    });

    context('tree', function () {
      it('has root', function () {
        assert.equal(treeRoot, 'root');
      });

      it('has no polypore', function () {
        assert.equal(typeof polypore, 'undefined');
      });

      context('branches', function () {
        it('has a branch', function () {
          assert.equal(branch, 'branch');
        });

        context('leaves', function () {
          it('has leaf #1', function () {
            assert.equal(leaf_1, 'leaf_1')
          });

          it('has leaf #2', function () {
            assert.equal(leaf_2, 'leaf_2')
          });
        });
      });
    });
  });

  context('relative path provided', function () {
    it('rasies unsupported option error', function () {
      assert.throws(function () {
        models('/../../support/directory_tree');
      }, Error);
    });
  });
});

