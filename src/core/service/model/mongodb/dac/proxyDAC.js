/**
 * @author sunwei,2017/3/26.
 */
"use strict";
const Proxy = require('../schema').Proxy;
const then = crawl.module.then;
const tools = crawl.tools;

/**
 * @description 统计代理ip数量
 * @param {Number} [valid] ip状态值，0-可用，1-异常，2-删除
 * @returns {*}
 */
module.exports.countIP = function (valid) {
    return then(function (cont) {
        let condition = {};
        if (tools.exists(valid)) {
            condition = {valid: valid}
        }
        Proxy.count(condition, function (err, count) {
            if (err) {
                cont(err);
            }
            else {
                cont(null, count);
            }
        });
    });
};

/**
 * @description 根据状态获取代理ip
 * @param valid
 * @returns {*}
 */
module.exports.findByValid = function (valid) {
    return then(function (cont) {
        valid = valid || 0;
        let condition = {valid: valid};
        Proxy.find(condition, function (err, docs) {
            if (err) {
                cont(err);
            }
            else {
                cont(null, docs);
            }
        });
    });
};

/**
 * @description 分页获取一批可用的代理ip
 * @author sunwei 2016.5.25
 * @param {Number} [valid] ip状态值，0-可用，1-异常，2-删除
 * @param {Number} skip 起始位置
 * @param {Number} limit 返回数量
 * @param {Date} [latestUsedTime] 上次使用时间，取上次使用时间小于传入值的ip
 * @param {Object} [sort] 排序方式，默认{'insertTime': 1}
 * @returns {Array} 返回可用的ip列表
 */
module.exports.findProxyIP = function (valid, skip, limit, latestUsedTime, sort) {
    return then(function (cont) {
        valid = valid || 0;
        let condition = {valid: valid};
        if (tools.isExist(latestUsedTime)) {
            condition = tools.extend(condition, {latestUsedTime: {$lt: latestUsedTime}});
        }
        sort = sort || {'insertTime': 1};
        Proxy.find(condition, null, {skip: skip, limit: limit, sort: sort}, function (err, docs) {
            if (err) {
                cont(err);
            }
            else {
                cont(null, docs);
            }
        });
    });
};

/**
 * @description 修改代理ip的状态吗
 * @param {String} _id 唯一标识
 * @param {Number} valid 状态码
 * @returns {*}
 */
module.exports.changeIPValid = function (_id, valid) {
    return then(function (cont) {
        Proxy.update({_id: _id}, {$set: {'valid': valid}}, {upsert: false}, function (err, rows) {
            if (err) {
                cont(err);
            }
            else {
                cont(null, rows);
            }
        });
    });
};

/**
 * @description 删除代理ip
 * @param {Number} valid 代理ip状态
 * @returns {*}
 */
module.exports.deleteUnValidIP = function (valid) {
    return then(function (cont) {
        let condition = {valid: valid};
        Proxy.remove(condition, function (err) {
            if (err) {
                cont(err);
            }
            else {
                cont(null, true);
            }
        });
    });
};

/**
 * @description 更新或添加代理
 * @param info
 * @returns {*}
 */
module.exports.upsert = function (info) {
    return then(function (cont) {
        let conditions = {ip: info.ip, port: info.port};
        let update = {$set: {insertTime: new Date(), latestUsedTime: new Date()}};
        if (tools.exists(info.ip)) {
            update.$set = tools.extend(update.$set, {ip: info.ip});
        }
        if (tools.exists(info.port)) {
            update.$set = tools.extend(update.$set, {port: info.port});
        }
        if (tools.exists(info.method)) {
            update.$set = tools.extend(update.$set, {method: info.method});
        }
        if (tools.exists(info.valid)) {
            update.$set = tools.extend(update.$set, {valid: info.valid});
        }
        let options = {upsert: true};
        Proxy.update(conditions, update, options, function (err, rows) {
            if (err) {
                cont(err);
            }
            else {
                cont(null, rows);
            }
        });
    });
};

/**
 * @description 修改代理的使用时间
 * @param _id
 * @returns {*}
 */
module.exports.updateIPLatestUsedTime = function (_id) {
    return then(function (cont) {
        Proxy.update({_id: _id}, {$set: {'latestUsedTime': new Date()}}, {upsert: false}, function (err, rows) {
            if (err) {
                cont(err);
            }
            else {
                cont(null, rows);
            }
        });
    });
};