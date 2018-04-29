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
if (fs.existsSync('log')) {
    if (!fs.existsSync('log/access')) {
        fs.mkdirSync('log/access');
    }
    if (!fs.existsSync('log/app')) {
        fs.mkdirSync('log/app');
    }
}

log4js.configure(__dirname + '/../conf/log4jsappends.json', {reloadSecs: 300});

exports.logger = function (name) {
    var logger = log4js.getLogger(name);
    return logger;
};

exports.accessLogger = function () {
    var logger = this.logger("access");
    return logger;
};

exports.appLogger = function () {
    var logger = this.logger("app");
    return logger;
};