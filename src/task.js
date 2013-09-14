var listbroCore = require('core');
var async = require('async');

var utils = require('utils');

var basicType = require('./type.js');
var validation = require('./validation.js');


module.exports = function () {
  "use strict";
  var that = basicType('task');

  that.questionDefinitions.push({
    name: 'name',
    title: 'Title',
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
    name: 'details',
    title: 'Details',
    description: 'the name of this list',
    type: 'longtext',
    access: 'readwrite',
    defaultValue: null,
    toParent: that,
    indexed: true,
    visible: true
  });

  that.questionDefinitions.push({
    name: 'complete',
    title: 'Complete',
    description: 'complete',
    type: 'yesno',
    access: 'readwrite',
    defaultValue: false,
    toParent: that,
    indexed: true,
    visible: true
  });

  that.questionDefinitions.push({
    name: 'list',
    title: 'List',
    description: 'the list this task is in',
    type: 'relatedSingleChoice',
    access: 'readwrite',
    defaultValue: null,
    validationfunction: validation.required('list'),
    toParent: that,
    indexed: true,
    ifChoiceThenChoiceType: function (a, cb) {
      cb(null, exports.list);
    },

    choiceDatabaseName: function () {
      return "system";
    },
    ifChoiceTypeThenParentQuestionOnChild: 'items',
    visible: false
  });
  that.titleDefinition.calculation =function(ob){
    return ob.name;
  }; 
  return that;
};
