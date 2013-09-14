var listbroCore = require('core');
var async = require('async');

var utils = require('utils');

var basicType = require('./type.js');
var validation = require('./validation.js');

module.exports = function(){
  var that = basicType('share'); 

  that.questionDefinitions.push({
    name: 'typeSpecs',
    title: 'typeSpecs',
    description: '',
    type: 'text',
    access: 'readwrite',
    defaultValue: '',
    validationFunction: validation.required('typeSpecs'),
    toParent: that,
    indexed: false
  });

  that.questionDefinitions.push({
    name: 'trustedCerts',
    title: 'trustedCerts',
    description: '',
    type: 'text',
    access: 'readwrite',
    defaultValue: '',
    validationFunction: validation.required('username'),
    toParent: that,
    indexed: false
  });
  

  return that;
};