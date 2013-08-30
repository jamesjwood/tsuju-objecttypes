


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