/**
 * Created with JetBrains WebStorm.
 * User: jameswood
 * Date: 31/10/2012
 * Time: 09:42
 * To change this template use File | Settings | File Templates.
 */

/*jslint node: true */
/*global describe */
/*global it */
/*global before */
/*global after */

var assert = require('assert');
var utils= require('utils');

var masterLog = utils.log().wrap('objectTypes');

var lib = require('./index.js');

if (typeof process.env.COVERAGE !== 'undefined') {
//lib = require('./../../../lib-cov/shared/objectTypes.js');
  masterLog = utils.log.fake();
}

describe('objectTypes', function () {
  'use strict';
  //  it('objectTypes.getType: should find types in the inbuilt list', function (done) {
  //
  //    sinon.stub(lib, 'getInbuiltTypes', function (a, cb) {
  //      cb(null, [{
  //        typeName: function () {
  //          return 'myType';
  //        }
  //      }]);
  //    });
  //
  //    lib.getType({
  //      databaseName: 'system',
  //      typeName: 'myType'
  //    }, function (error, result) {
  //      lib.getInbuiltTypes.restore();
  //      assert.ifError(error);
  //      assert.equal(result.typeName(), 'myType');
  //      done();
  //    });
  //  });
  //
  //  it('objectTypes.getType: should search the custom types if not in the inbuilt list', function (done) {
  //    sinon.stub(lib, 'getInbuiltTypes', function (a, cb) {
  //      cb(null, []);
  //    });
  //
  //    sinon.stub(lib, 'getCustomTypes', function (a, cb) {
  //      assert.equal(a.databaseName, 'test');
  //      cb(null, [{
  //        typeName: function () {
  //          return 'myType';
  //        }
  //      }]);
  //    });
  //
  //    lib.getType({
  //      databaseName: 'test',
  //      typeName: 'myType'
  //    }, function (error, result) {
  //      lib.getInbuiltTypes.restore();
  //      lib.getCustomTypes.restore();
  //      assert.ifError(error);
  //      assert.equal(result.typeName(), 'myType');
  //      done();
  //    });
  //
  //  });
  it('objectTypes.basicType: should have a name and questionDefinitions and calculationDefinitions', function (done) {
    var type = lib.basicType('customType');
    assert.equal(type.name, 'customType');
    assert.equal(type.questionDefinitions.length, 0);
    assert.equal(type.calculationDefinitions.length, 0);

    assert.equal(type.newTitle, 'new customType');

    assert.equal(type.defaultView, 'navigator');
    done();
  });

  it('objectTypes.type: should have basic properties', function (done) {
    var type = lib.type('customType');
    var id = type.getQuestion('_id');
    assert.ok(id, 'should have an id');
    var activeRecord = type.getQuestion('activeRecord');
    assert.ok(activeRecord, 'should have an activeRecord');
    var created = type.getQuestion('created');
    assert.ok(created, 'should have an created');
    var createdBy = type.getQuestion('createdBy');
    assert.ok(createdBy, 'should have an createdBy');
    var lastModified = type.getQuestion('lastModified');
    assert.ok(lastModified, 'should have an lastModified');
    var lastModifiedBy = type.getQuestion('lastModifiedBy');
    assert.ok(lastModifiedBy, 'should have an lastModifiedBy');
    var title = type.getQuestion('title');
    assert.ok(title, 'should have an title');
    var titleDetail = type.getQuestion('titleDetail');
    assert.ok(titleDetail, 'should have an titleDetail');
    done();
  });
  it('login.type: should have basic properties', function (done) {
    var type = lib.login;
    var id = type.getQuestion('_id');
    assert.ok(id, 'should have an id');
    var activeRecord = type.getQuestion('activeRecord');
    assert.ok(activeRecord, 'should have an activeRecord');
    var created = type.getQuestion('created');
    assert.ok(created, 'should have an created');
    var createdBy = type.getQuestion('createdBy');
    assert.ok(createdBy, 'should have an createdBy');
    var lastModified = type.getQuestion('lastModified');
    assert.ok(lastModified, 'should have an lastModified');
    var lastModifiedBy = type.getQuestion('lastModifiedBy');
    assert.ok(lastModifiedBy, 'should have an lastModifiedBy');
    var title = type.getQuestion('title');
    assert.ok(title, 'should have an title');
    var titleDetail = type.getQuestion('titleDetail');
    assert.ok(titleDetail, 'should have an titleDetail');
    done();
  });
});