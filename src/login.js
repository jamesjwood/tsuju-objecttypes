var listbroCore = require('tsuju-core');
var async = require('async');

var utils = require('tsuju-utils');

var basicType = require('./type.js');
var validation = require('./validation.js');


module.exports = function () {
  "use strict";
  var that = basicType('login');
  that.questionDefinitions.push({
    name: 'email',
    title: 'email',
    description: 'email address',
    type: 'email',
    visibility: 'hidden',
    toParent: that,
    indexed: true
  });
  that.questionDefinitions.push({
    name: 'salt',
    title: 'salt',
    description: 'salt',
    type: 'text',
    visibility: 'hidden',
    toParent: that,
    indexed: false
  });
  that.questionDefinitions.push({
    name: 'hashedPassword',
    title: 'hashedPassword',
    description: 'hashedPassword',
    type: 'text',
    visibility: 'hidden',
    toParent: that,
    indexed: false
  });
  that.questionDefinitions.push({
    name: 'loginAttempts',
    title: 'loginAttempts',
    description: 'loginAttempts',
    type: 'integer',
    visibility: 'hidden',
    toParent: that,
    indexed: false
  });
  that.questionDefinitions.push({
    name: 'user',
    title: 'user',
    description: 'the user for this login',
    type: 'relatedSingleChoice',
    access: 'readwrite',
    defaultValue: '',
    validationfunction: null,
    toParent: that,
    indexed: true,
    ifChoiceThenChoiceType: function (a, cb) {
      cb(null, exports.user);
    },

    choiceDatabaseName: function () {
      return "system";
    },
    ifChoiceTypeThenParentQuestionOnChild: 'logins'
  });
  that.titleDefinition.calculation = function(o){
    return o.email;
  };
  return that;
};

