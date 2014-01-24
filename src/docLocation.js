

var listbroCore = require('tsuju-core');
var async = require('async');

var utils = require('tsuju-utils');

var basicType = require('./type.js');
var validation = require('./validation.js');

module.exports = function () {
  "use strict";
  var that = basicType('docLocation');

  that.questionDefinitions.push({
    name: 'docId',
    title: 'docId',
    description: 'the document id',
    type: 'text',
    access: 'readwrite',
    defaultValue: null,
    validationFunction: validation.required('docId'),
    toParent: that,
    indexed: true,
    visible: true
  });

  that.questionDefinitions.push({
    name: 'currentRev',
    title: 'currentRev',
    description: 'the currentRev',
    type: 'text',
    access: 'readwrite',
    defaultValue: null,
    toParent: that,
    indexed: true,
    visible: true
  });

  that.questionDefinitions.push({
    name: 'locationId',
    title: 'locationId',
    description: 'locationId',
    type: 'text',
    access: 'readwrite',
    defaultValue: false,
    toParent: that,
    indexed: true,
    visible: true
  });
  return that;
};
