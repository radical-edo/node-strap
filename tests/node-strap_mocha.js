'use strict';
var path = require('path');

var models = require('../node-strap');

describe('models', function () {
  context('strap some files in order', function () {
    beforeEach(function () {
      models('./support/pre_require', {
        rootDir: __dirname,
        strapFirst: ['first_in_order.js', 'second_in_order']
      });
    });

    it('"preRequire" should be an Array', function () {
      assert.equal(preRequire instanceof Array, true)
    });

    it('"preRequire" should have 2 items', function () {
      assert.equal(preRequire.length, 3);
    });

    it('"preRequire" should have items in array in specific order', function () {
      assert.equal(preRequire.toString(), '#2,#last,#nextToLast');
    });
  });


  context('starp files in specified order', function () {
    beforeEach(function () {
      models('./support/connected_dependencies', {
        rootDir: __dirname,
        callOrder: ['init_leave.js', 'override_leaves.js', 'add_one_leaf']
      });
    });

    it('"secretLeaves" should be an Array', function () {
      assert.equal(secretLeaves instanceof Array, true)
    });

    it('"secretLeaves" should have 3 leaves', function () {
      assert.equal(secretLeaves.length, 3);
    });
  });

  context('absolute path provided', function () {
    before(function () {
      models('./support/directory_tree', {
        strapDirectories: true,
        rootDir: __dirname,
        applyArgs: ['yay']
      });
    });

    context('hidden directory in the path', function () {
      it('should not raise an error', function () {
        assert.doesNotThrow(function () {
          models('./support/directory_tree', {
            strapDirectories: true,
            rootDir: __dirname,
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

  context('no "rootDir" provided, therfore "process.cwd()" is used', function () {
    before(function () {
      models('./support/directory_tree', {
        strapDirectories: true,
        rootDir: __dirname,
        applyArgs: ['yay']
      });
    });

    it('raises error because it navigates out of the project', function () {
      assert.throws(function () {
        models('../../support/directory_tree');
      }, Error);
    });
  });
});

