/*global window */
/*global $ */
/*jslint node: true */
/*global exports */
/*global require */

exports.validation = require('./src/validation.js');
exports.type = require('./src/type.js');
exports.user = require('./src/user.js')();
exports.login = require('./src/login.js')();
exports.userList = require('./src/userList.js')();
exports.list = require('./src/list.js')();
exports.task = require('./src/task.js')();
exports.share = require('./src/share.js')();
exports.docLocation = require('./src/docLocation.js')();