var listbroCore = require('core');
var async = require('async');

var utils = require('utils');

var uuid = function () {
  "use strict";
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
        v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

var basicType = function (typeName) {
  "use strict";
  var that = {};

  listbroCore.addProperty(that, 'name', typeName);

  that.typeName = function () {
    return typeName;
  };

  listbroCore.addProperty(that, 'questionDefinitions', []);
  listbroCore.addProperty(that, 'calculationDefinitions', []);
  listbroCore.addProperty(that, 'defaultView', 'navigator');
  listbroCore.addProperty(that, 'newTitle', "new " + typeName);


  that.getQuestion = function (name) {
    for (var i = 0; i < that.questionDefinitions.length; i++) {
      var q = that.questionDefinitions[i];
      if (q.name === name) {
        return q;
      }
    }
    return null;
  };

  return that;
};

module.exports  = function (typeName) {
  "use strict";
  var that = basicType(typeName);
  that.views = {};



  that.questionDefinitions.push({
    name: '_id',
    title: '_id',
    description: '_id',
    type: 'identity',
    access: 'readonly',
    defaultValue: function(){
      return typeName + '_' + uuid();
    },
    validationfunction: null,
    toParent: that,
    indexed: true,
    deflatedName: "_id",
    visible: false
  });
  that.questionDefinitions.push({
    name: 'activeRecord',
    title: 'activeRecord',
    description: 'activeRecord',
    type: 'yesno',
    access: 'readonly',
    defaultValue: true,
    validationfunction: null,
    toParent: that,
    indexed: true,
    visible: false
  });

  that.questionDefinitions.push({
    name: 'lastModified',
    title: 'lastModified',
    description: 'lastModified',
    type: 'datetime',
    access: 'readonly',
    defaultValue: null,
    validationfunction: null,
    toParent: that,
    indexed: true,
    visible: false
  });

  that.questionDefinitions.push({
    name: 'lastModifiedBy',
    title: 'lastModifiedBy',
    description: 'lastModifiedBy',
    type: 'relatedSingleChoice',
    access: 'readonly',
    defaultValue: null,
    validationfunction: null,
    toParent: that,
    indexed: true,
    visible: false
  });

  that.questionDefinitions.push({
    name: 'created',
    title: 'created',
    description: 'created',
    type: 'datetime',
    access: 'readonly',
    defaultValue: null,
    validationfunction: null,
    toParent: that,
    indexed: true,
    visible: false
  });

  that.questionDefinitions.push({
    name: 'createdBy',
    title: 'createdBy',
    description: 'createdBy',
    type: 'relatedSingleChoice',
    access: 'readonly',
    defaultValue: null,
    validationfunction: null,
    toParent: that,
    indexed: true,
    visible: false
  });


  var titleDefinition = {
    name: 'title',
    title: 'title',
    description: 'title',
    type: 'text',
    access: 'readonly',
    defaultValue: null,
    calculation: function (object) {
      return 'title calculation not set';
    },
    validationfunction: null,
    indexed: true,
    visible: false
  };
  that.titleDefinition = titleDefinition;

  that.questionDefinitions.push(titleDefinition);


  that.questionDefinitions.push({
    name: 'titleDetail',
    title: 'titleDetail',
    description: 'used for tooltips',
    type: 'text',
    access: 'readonly',
    defaultValue: null,
    validationfunction: null,
    toParent: that,
    indexed: true,
    visible: false
  });
  that.questionDefinitions.push({
    name: 'calculationErrors',
    title: 'calculationErrors',
    description: 'calculationErrors',
    type: 'subList',
    access: 'readonly',
    defaultValue: [],
    validationfunction: null,
    toParent: that,
    indexed: true,
    visible: false
  });

  return that;
};


