/*global window */
/*global $ */
/*jslint node: true */
/*global exports */
/*global require */


var listbroCore = require('core');
var async = require('async');

var utils = require('utils');
var MODULE_NAME = 'listbroObjectTypes';

exports.systemTypes = listbroCore.eventedArray();
exports.userDefinedTypes = listbroCore.eventedArray();

var registerSystemType = function (type) {
  "use strict";
  exports.systemTypes.push(type);
  exports[type.typeName()] = type;
};

var registerUserDefinedType = function (type) {
  "use strict";
  exports.userDefinedTypes.push(type);
  exports[type.typeName()] = type;
};


exports.uuid = function () {
  "use strict";
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
        v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

exports.basicType = function (typeName) {
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

exports.type = function (typeName) {
  "use strict";
  var that = exports.basicType(typeName);
  that.views = {};



  that.questionDefinitions.push({
    name: '_id',
    title: '_id',
    description: '_id',
    type: 'identity',
    access: 'readonly',
    defaultValue: function(){
      return typeName + '_' + exports.uuid();
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

exports.validation = {};

exports.validation.required = function (propertyName) {
  "use strict";
  var r = function (object) {
    var val = object[propertyName];
    if (typeof val !== 'undefined') {
      if (val === null || val === '') {
        return 'required';
      } else {
        return;
      }
    } else {
      return 'required';
    }
  };
  return r;


};



var loginType = function () {
  "use strict";
  var that = exports.type('login');
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

var userType = function () {
  "use strict";
  var that = exports.type('user');
  that.questionDefinitions.push({
    name: 'firstName',
    title: 'first name',
    description: 'first name',
    type: 'text',
    access: 'readwrite',
    defaultValue: '',
    validationfunction: null,
    toParent: that,
    indexed: true
  });
  that.questionDefinitions.push({
    name: 'surname',
    title: 'surname',
    description: 'surname',
    type: 'text',
    access: 'readwrite',
    defaultValue: '',
    validationFunction: null,
    toParent: that,
    indexed: false
  });
  that.questionDefinitions.push({
    name: 'requestedUsername',
    title: 'Requested username',
    description: 'the username you would like to use',
    type: 'text',
    access: 'readwrite',
    defaultValue: '',
    validationFunction: exports.validation.required('requestedUsername'),
    toParent: that,
    indexed: false
  });
  that.questionDefinitions.push({
    name: 'encryptedPrivatePEM',
    title: 'encryptedPrivatePEM',
    description: 'encryptedPrivatePEM',
    type: 'text',
    access: 'readwrite',
    defaultValue: '',
    validationFunction: exports.validation.required('encryptedPrivatePEM'),
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
    validationFunction: exports.validation.required('certificate'),
    toParent: that,
    indexed: false
  });
  that.questionDefinitions.push({
    name: 'dbProvisioned',
    title: 'dbProvisioned',
    description: 'dbProvisioned',
    type: 'yesno',
    access: 'readwrite',
    defaultValue: false,
    validationFunction: exports.validation.required('dbProvisioned'),
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

var listType = function () {
  "use strict";
  var that = exports.type('list');

  that.questionDefinitions.push({
    name: 'name',
    title: 'type of item in this list (e.g. contact)',
    description: 'the name of this list',
    type: 'text',
    access: 'readwrite',
    defaultValue: null,
    validationFunction: exports.validation.required('name'),
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
    validationFunction: exports.validation.required('itemType'),
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

var taskType = function () {
  "use strict";
  var that = exports.type('task');

  that.questionDefinitions.push({
    name: 'name',
    title: 'Title',
    description: 'the name of this list',
    type: 'text',
    access: 'readwrite',
    defaultValue: null,
    validationFunction: exports.validation.required('name'),
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
    validationfunction: exports.validation.required('list'),
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

/*
var listQuestionType = function () {
  "use strict";
  var that = exports.type('listQuestion');
  that._defaultView = 'editor';
  that.questionDefinitions.push({
    name: 'questionTitle',
    title: 'title',
    description: 'the title of this question',
    type: 'text',
    access: 'readwrite',
    defaultValue: [],
    validationFunction: exports.validation.required,
    toParent: that,
    indexed: true

  });
  that.questionDefinitions.push({
    name: 'description',
    title: 'description',
    description: 'a description of this question',
    type: 'text',
    access: 'readwrite',
    defaultValue: [],
    validationFunction: null,
    toParent: that,
    indexed: false

  });
  that.questionDefinitions.push({
    name: 'list',
    title: 'list',
    description: 'list',
    type: 'singleChoice',
    access: 'hidden',
    defaultValue: [],
    validationFunction: exports.validation.required,
    toParent: that,
    indexed: true,
    ifChoiceThenChoiceType: function (a, cb) {
      cb(null, exports.list);
    },

    choiceDatabaseName: function (questionInstance) {
      return questionInstance.databaseName();
    },
    ifChoiceTypeThenParentQuestionOnChild: 'listQuestions'

  });

  that.questionDefinitions.push({
    name: 'questionType',
    title: 'question type',
    description: 'the type of the question',
    type: 'singleChoiceInternal',
    access: 'readwrite',
    defaultValue: null,
    validationFunction: exports.validation.required,
    toParent: that,
    indexed: true,
    choices: [{
      id: 'text',
      text: 'text'
    },
    {
      id: 'singleChoice',
      text: 'single choice'
    },
    {
      id: 'multiChoice',
      text: 'multiple choice'
    },
    {
      id: 'date',
      text: 'date'
    },
    {
      id: 'time',
      text: 'time'
    },
    {
      id: 'datetime',
      text: 'date and time'
    },
    {
      id: 'integer',
      text: 'whole number'
    },
    {
      id: 'color',
      text: 'colour'
    },
    {
      id: 'email',
      text: 'email address'
    },
    {
      id: 'url',
      text: 'web address'
    }]

  });

  that.questionDefinitions.push({
    name: 'listsWhereIsTitleQuestion',
    title: 'lists where this is the title question',
    description: "lists where this is the title question",
    type: 'subList',
    access: 'hidden',
    defaultValue: [],
    validationFunction: null,
    toParent: that,
    indexed: false,
    subListObjectType: function (a, cb) {
      cb(null, exports.list);
    },
    subListDatabaseName: function (instance) {
      //same as list
      return instance.databaseName();
    },
    ifsubListThenParentQuestionOnChild: 'titleQuestion'

  });
  that.questionDefinitions.push({
    name: 'questionNumber',
    title: 'question number',
    description: 'the question number, used to order the questions',
    type: 'integer',
    access: 'readwrite',
    defaultValue: [],
    validationFunction: null,
    toParent: that,
    indexed: false

  });

  that.questionDefinitions.push({
    name: 'require',
    title: 'require',
    description: 'require that the user fills in this question before they can save',
    type: 'singleChoiceInternal',
    access: 'readwrite',
    defaultValue: null,
    validationFunction: exports.validation.required,
    toParent: that,
    indexed: true,
    choices: [{
      id: 0,
      text: 'yes'
    },
    {
      id: 1,
      text: 'no'
    },
    {
      id: 2,
      text: 'custom'
    }]

  });

  that.questionDefinitions.push({
    name: 'customValidation',
    title: 'custom validation script',
    description: 'a custom javascript function taking the list as an argument and returning a boolean and string response',
    type: 'text',
    access: 'readwrite',
    defaultValue: null,
    validationFunction: null,
    toParent: that,
    indexed: false
  });
  that.calculationDefinitions.push({
    name: "title",
    inputs: ['questionTitle', 'questionNumber'],
    outputs: ['title'],
    calculation: function (questionTitle, questionNumber) {
      if (questionTitle) {

        return [questionNumber + ": " + questionTitle];


      } else {
        return ['new question'];
      }
    }
  });
  that.questionDefinitions.push({
    name: 'ifChoiceThenSourceList',
    title: 'choice list',
    description: "the list from which to get the choices from",
    type: 'singleChoice',
    access: 'readwrite',
    defaultValue: null,
    validationFunction: null,
    toParent: that,
    indexed: false,
    ifChoiceThenChoiceType: function (a, cb) {
      cb(null, exports.list);
    },

    choiceDatabaseName: function (questionInstance) {
      return questionInstance.databaseName();
    },
    ifChoiceTypeThenParentQuestionOnChild: 'choiceQuestionsIsListFor'
  });
  //that.calculationDefinitions.push({
  //    name: "title",
  //    inputs: ['project'],
  //    outputs: ['title'],
  //    calculation: function(project) {
  //        if(project)
  //        {
  //            if(project.title)
  //            {
  //                return [project.title()];
  //            }
  //        }       
  //        return [""];
  //        
  //    }
  //});
  return that;
};
*/

exports.hasCalculationDependentOnProperty = function (a) {
  "use strict";
  listbroCore.requireNotNullOn({
    on: a,
    name: 'type'
  });
  listbroCore.requireNotNullOn({
    on: a,
    name: 'propertyName'
  });
  var type = a.type;

  for (var j = 0; j < type.calculations().length; j++) {
    var calc = type.calculations()[j];
    for (var k = 0; k < calc.inputs; k++) {
      var input = calc.inputs[k];
      if (input === a.propertyName) {
        return true;
      }
    }
  }
  return false;
};


/*
exports.getCustomTypeFromList = function (list, cb) {
  "use strict";
  var that = exports.type(list.id());
  that._newTitle = "new " + list.singleName();

  that._defaultView = 'editor';
  that.questionDefinitions.push({
    name: 'list',
    title: 'list',
    description: 'list',
    type: 'singleChoice',
    access: 'hidden',
    defaultValue: [],
    validationFunction: exports.validation.required,
    toParent: that,
    indexed: true,
    ifChoiceThenChoiceType: function (a, cb) {
      cb(null, exports.list);
    },
    choiceDatabaseName: function (questionInstance) {
      return questionInstance.databaseName();
    },
    ifChoiceTypeThenParentQuestionOnChild: 'items'
  });

  var subList = list.questions.listQuestions.subList;
  subList.get({
    reduce: false
  }, utils.cb(cb, function (res) {
    var foundQuestions = res.got;
    async.forEachSeries(foundQuestions, function (q, cbk) {
      listbroBusinessLayer.businessLayer({
        databaseName: subList.databaseName
      }, utils.cb(cbk, function (businessLayer) {
        businessLayer.get({
          id: q._id
        }, utils.cb(cbk, function (r) {
          listbroCore.requireNotNullOn({
            on: r,
            name: 'got'
          });
          var question = r.got;


          that.questionDefinitions.push({
            name: question._id,
            title: question.questionTitle,
            description: question.description,
            type: question.questionType,
            access: 'readwrite',
            defaultValue: null,
            validationFunction: function () {
              if (typeof(question.require) !== 'undefined') {
                //                                if(question.require() === 0)
                //                                {
                //                                    return exports.validation.required;
                //                                }
                return null;
              }
              else

              {
                return null;
              }
            }(),
            toParent: that,
            indexed: true,

            ifChoiceThenChoiceType: function (a, cb) {
              if (!question.ifChoiceThenSourceList) {
                cb();
                return;
              }
              listbroObjects.createObjectFromID({
                id: question.ifChoiceThenSourceList,
                databaseName: subList.databaseName
              }, utils.cb(
              cb, function (list) {
                exports.getCustomTypeFromList(list, cb);
              }));

            },
            choiceDatabaseName: function () {
              return subList.databaseName;
            }

          });
          cbk();
        }));
      }));


    }, utils.cb(cb, function () {
      var titleQuestionName = list.titleQuestion();
      if (titleQuestionName) {
        that.calculationDefinitions.push({
          name: "title",
          inputs: [titleQuestionName],
          outputs: ['title'],
          calculation: function (titleQ) {
            if (titleQ) {
              return [titleQ];
            }
            return [that.newTitle()];

          }
        });
      }

      cb(null, that);
    }));


  }));

};
*/
registerSystemType(loginType());
registerSystemType(userType());
registerSystemType(listType());
registerSystemType(taskType());
//registerSystemType(listQuestionType());


//exports.getInbuiltTypes = function (b, cb) {
//  "use strict";
//  listbroCore.requireNotNullOn({
//    on: b,
//    name: 'databaseName'
//  });
//  var databaseName = b.databaseName;
//  if (databaseName === 'system') {
//    cb(null, exports.systemDBTypes);
//  } else {
//    cb(null, exports.projectDBTypes);
//  }
//};
//
//exports.getCustomTypes = function (b, cb) {
//  "use strict";
//  listbroLogging.logFunctionCall(MODULE_NAME + '.getCustomTypes', b);
//  listbroCore.requireNotNullOn({
//    on: b,
//    name: 'databaseName'
//  });
//  var databaseName = b.databaseName;
//  if (databaseName === 'system') {
//    cb(null, []);
//  } else {
//    var listToReturn = [];
//    listbroBusinessLayer.businessLayer({
//      databaseName: databaseName
//    }, utils.cb(cb, function (businessLayer) {
//      var viewName = exports.getViewName({
//        typeName: 'list',
//        indexedFieldName: 'id'
//      });
//      businessLayer.executeView({
//        viewName: viewName,
//        viewArgs: {
//          reduce: false
//        }
//      }, utils.cb(cb, function (results) {
//
//        listbroLogging.log(1, MODULE_NAME + '.getCustomTypes. ', 'view results', results);
//
//        async.forEachSeries(results, function (summary, cbk) {
//          listbroObjects.createObjectFromID({
//            id: summary._id,
//            databaseName: databaseName
//          }, utils.cb(cbk, function (list) {
//            exports.getCustomTypeFromList(list, utils.cb(cbk, function (customType) {
//              listToReturn.push(customType);
//              cbk();
//            }));
//
//          }));
//        }, utils.cb(cb, function () {
//          cb(null, listToReturn);
//        }));
//      }));
//    }));
//
//  }
//};
//
//exports.getType = function (b, cb) {
//  "use strict";
//  listbroLogging.logFunctionCall(MODULE_NAME + '.getType', b);
//  listbroCore.requireNotNull('b', b);
//  listbroCore.requireNotNullOn({
//    on: b,
//    name: 'typeName'
//  });
//  listbroCore.requireNotNullOn({
//    on: b,
//    name: 'databaseName'
//  });
//  var databaseName = b.databaseName;
//
//
//  exports.getInbuiltTypes({
//    databaseName: databaseName
//  }, utils.cb(cb, function (types) {
//    for (var j = 0; j < types.length; j++) {
//      var typ = types[j];
//      if (typ.typeName() === b.typeName) {
//        listbroLogging.log(1, MODULE_NAME + '.getType', 'found inbuilt type for: ' + b.typeName);
//        cb(null, typ);
//        return;
//      }
//    }
//    listbroLogging.log(1, MODULE_NAME + '.getType', 'searching custom types');
//    exports.getCustomTypes({
//      databaseName: databaseName
//    }, utils.cb(cb, function (typeArray) {
//      for (var i = 0; i < typeArray.length; i++) {
//        var ty = typeArray[i];
//        if (ty.typeName() === b.typeName) {
//          listbroLogging.log(1, MODULE_NAME + '.getType', 'found custom type for: ' + b.typeName);
//          cb(null, ty);
//          return;
//        }
//      }
//      cb(new Error('no type found for: ' + b.typeName));
//    }));
//
//  }));
//
//
//
//
//
//
//};