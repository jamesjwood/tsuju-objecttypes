
/*jslint node: true */
/*global describe */
/*global it */
/*global before */
/*global after */

var assert = require('assert');
var utils= require('tsuju-utils');

var masterLog = utils.log().wrap('objectTypes.type');

var lib = require('../src/type.js');


describe('objectTypes.type', function () {
  'use strict';
    it('login.type: should have basic properties', function (done) {
        var type = lib();
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