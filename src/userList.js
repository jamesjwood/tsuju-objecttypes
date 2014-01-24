var listbroCore = require('tsuju-core');
var async = require('async');

var utils = require('tsuju-utils');

var basicType = require('./type.js');
var validation = require('./validation.js');

module.exports = function(){
  var that = basicType('userList'); 

  that.questionDefinitions.push({
    name: 'user',
    title: 'user',
    description: 'the user',
    type: 'relatedSingleChoice',
    access: 'readwrite',
    defaultValue: '',
    validationFunction: validation.required('user'),
    toParent: that,
    indexed: true
  });
  that.questionDefinitions.push({
    name: 'list',
    title: 'list',
    description: 'list',
    type: 'relatedSingleChoice',
    access: 'readwrite',
    defaultValue: '',
    validationFunction: validation.required('list'),
    toParent: that,
    indexed: true
  });
  return that;
};