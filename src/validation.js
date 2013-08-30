module.exports = {};
module.exports.required = function (propertyName) {
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