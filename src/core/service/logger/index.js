/**
 * @author by sunwei on 2017/3/26.
 */
"use strict";
const log4js = require('log4js');
const fs = require('fs');
/** 创建记录日志的临时文件夹*/
if (!fs.existsSync('log')) {
    fs.mkdirSync('log');
}

log4js.configure(__dirname + '/../conf/log4js.json', {reloadSecs: 300});

exports.logger = function (name) {
    let logger = log4js.getLogger(name);
    return logger;
};

exports.appLogger = function () {
    let logger = this.logger("app");
    return logger;
};