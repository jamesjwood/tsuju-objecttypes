var listbroCore = require('tsuju-core');
var async = require('async');

var utils = require('tsuju-utils');

var basicType = require('./type.js');
var validation = require('./validation.js');


module.exports = function () {
  "use strict";
  var that = basicType('list');

  that.questionDefinitions.push({
    name: 'name',
    title: 'type of item in this list (e.g. contact)',
    description: 'the name of this list',
    type: 'text',
    access: 'readwrite',
    defaultValue: null,
    validationFunction: validation.required('name'),
    toParent: that,
    indexed: true,
    visible: true

  });
  that.questionDefinitions.push({
    name: 'description',
    title: 'description',
    description: 'a description of this list',
    type: 'text',
    access: 'readwrite',
    defaultValue: [],
    validationFunction: null,
    toParent: that,
    indexed: false,
    visible: true
  });

  that.questionDefinitions.push({
    name: 'itemType',
    title: ' list item type',
    description: 'a description of this list',
    type: 'singleChoice',
    choices: [{title: 'task', _id: '0'}],
    access: 'readwrite',
    defaultValue: null,
    validationFunction: validation.required('itemType'),
    toParent: that,
    indexed: false,
    visible: true
  });

  that.questionDefinitions.push({
    name: 'private',
    title: 'private',
    description: 'is the list private (only accessable by you)',
    type: 'yesno',
    access: 'readwrite',
    defaultValue: false,
    validationFunction: null,
    toParent: that,
    indexed:true,
    visible: true
  });

  that.questionDefinitions.push({
    name: 'items',
    title: 'items',
    description: "items in this list",
    type: 'subList',
    access: 'readwrite',
    defaultValue: [],
    validationFunction: null,
    toParent: that,
    indexed: false,
    subListObjectType: function (a, cb) {
      exports.getCustomTypeFromList(a, cb);
    },
    subListDatabaseName: function (instance) {
      //same as list
      return instance.databaseName();
    },
    ifsubListThenParentQuestionOnChild: 'list',
    visible: false

  });

  that.titleDefinition.calculation =function(ob){
    return ob.name;
  }; 
  return that;
};