/**
 * @fileOverview 日志记录管理类
 * @author sunwei
 */

var log4js = require('log4js');
var fs = require('fs');
/** 创建记录日志的临时文件夹*/
if (!fs.existsSync('log')) {
    fs.mkdirSync('log');
}

log4js.configure(__dirname + '/../conf/log4jsappends.json', {reloadSecs: 300});

exports.logger = function (name) {
    var logger = log4js.getLogger(name);
    return logger;
};

exports.appLogger = function () {
    var logger = this.logger("app");
    return logger;
};