var listbroCore = require('core');
var async = require('async');

var utils = require('utils');

var basicType = require('./type.js');
var validation = require('./validation.js');

module.exports = function(){
  var that = basicType('user'); 

  that.questionDefinitions.push({
    name: 'username',
    title: 'username',
    description: 'the username you would like to use',
    type: 'text',
    access: 'readwrite',
    defaultValue: '',
    validationFunction: validation.required('username'),
    toParent: that,
    indexed: true
  });
  that.questionDefinitions.push({
    name: 'encryptedPrivatePEM',
    title: 'encryptedPrivatePEM',
    description: 'encryptedPrivatePEM',
    type: 'text',
    access: 'readwrite',
    defaultValue: '',
    validationFunction: validation.required('encryptedPrivatePEM'),
    toParent: that,
    indexed: false
  });
  that.questionDefinitions.push({
    name: 'certificate',
    title: 'certificate',
    description: 'certificate',
    type: 'text',
    access: 'readwrite',
    defaultValue: null,
    validationFunction: validation.required('certificate'),
    toParent: that,
    indexed: false
  });
  that.questionDefinitions.push({
    name: 'fullName',
    title: 'full name',
    description: 'full name',
    type: 'text',
    access: 'hidden',
    defaultValue: '',
    validationFunction: null,
    toParent: that,
    indexed: false,
    calculation: function (ob) {
      if (ob.firstName && ob.surname) {
        return ob.firstName + " " + ob.surname;
      } else {
        return ob.firstName || ob.surname;
      }
    }
  });
  that.questionDefinitions.push({
    name: 'unconfirmedEmail',
    title: 'unconfirmed email',
    description: 'unconfirmed email',
    type: 'email',
    access: 'readwrite',
    defaultValue: '',
    validationFunction: null,
    toParent: that,
    indexed: false
  });

  that.questionDefinitions.push({
    name: 'userProjectRoles',
    title: 'projects',
    description: "the user's projects",
    type: 'subList',
    access: 'hidden',
    defaultValue: [],
    validationFunction: null,
    toParent: that,
    indexed: false,
    subListObjectType: function (instance, cbk) {
      cbk(null, exports.userProjectRole);
    },
    subListDatabaseName: function (instance, parentDatabaseName) {
      return 'system';
    },
    ifsubListThenParentQuestionOnChild: 'user'
  });
  that.titleDefinition.calculation = function(o){
    return o.fullName;
  };
  return that;
};