/**
 * @author sunwei,2017/3/25.
 */
"use strict";
const config = crawl.config.mongodbConfig;
const logger = crawl.logger;
const mongoose = require('mongoose');

mongoose.connect(config, function (err) {
    if(err){
        logger.error('connect to %s error: ', config, err.message);
        process.exit();
    }
});

/**
 * @description 引入所有的schema
 */
require('./proxySchema');

/**
 * @description 统一exports
 */
module.exports.Proxy = mongoose.model('proxy');