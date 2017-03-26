/**
 * @author by sunwei on 2017/3/25.
 */
"use strict";
global.crawl = global.crawl || {};
crawl.appName = 'porcupine.crawl.core.service';
crawl.baseDir = __dirname + '/';
crawl.config = require('./conf/system');
crawl.logger = require("./logger").appLogger();
crawl.tools = require('util')._extend({}, require("./tool/tools"));
crawl.tools.security = require("./tool/security");
crawl.module = {};
crawl.module.then = require('thenjs');