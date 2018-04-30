/**
 * @author sunwei,2018/4/29.
 */
"use strict";
"use strict";
/** 全局变量CIT*/
global.CIT = global.CIT || {};
CIT.appName = 'crawl.tools';
CIT.baseDir = __dirname + '/';
CIT.config = require('./conf/system.config');
CIT.logger = require("./logger").appLogger();
CIT.tools = require('util')._extend({}, require("./tool/tools"));
CIT.tools.fileHelper = require('./tool/fileHelper');
CIT.tools.security = require("./tool/security");
CIT.module = {};