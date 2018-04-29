/**
 * @fileOverview 安全相关的工具方法集合
 * @author menglb
 * @module {tool} tool/security
 */

var fs = require('fs');
var path = require('path');
var crypto = require('crypto');

/**
 * @description aes的对称加密
 * @param {String} str 待加密的字符串
 * @param {String} sKey 加密密钥
 * @returns {String} 加密后的字符串
 */
module.exports.encrypt = function (str, sKey) {
    var cipher = crypto.createCipher('aes192', sKey);
    var enc = cipher.update(str, 'utf8', 'hex');
    enc += cipher.final('hex');
    return enc;
};

/**
 * @description aes的对称解密
 * @param {String} str 待解密的字符串
 * @param {String} sKey 解密密钥
 * @returns {String} 解密后的字符串
 */
module.exports.decrypt = function (str, sKey) {
    var decipher = crypto.createDecipher('aes192', sKey);
    var dec = decipher.update(str, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
};

/**
 * @description md5编码
 * @param {String} str 待编码的字符串
 * @returns {String} md5编码后的字符串
 */
module.exports.md5 = function (str) {
    var md5Sum = crypto.createHash('md5');
    md5Sum.update(str);
    str = md5Sum.digest('hex');
    return str;
};

/**
 * @description 获取文件的md5编码
 * @param {String} filePath 文件路径
 * @returns {String} 文件的md5编码字符串
 */
module.exports.fileMD5 = function (filePath) {
    var str = fs.readFileSync(filePath, 'utf-8');
    var md5Sum = crypto.createHash('md5');
    md5Sum.update(str);
    str = md5Sum.digest('hex');
    return str;
};

/**
 * @description base64编码
 * @param {String} str 待编码的字符串
 * @returns {String} base64编码后的字符串
 */
module.exports.base64Encode = function (str) {
    if (!str) {
        return str;
    }
    return new Buffer(str).toString('base64');
};

/**
 * @description base64解码
 * @param {String} str 待解码的字符串
 * @returns {String} base64解码后的字符串
 */
module.exports.base64Decode = function (str) {
    if (!str) {
        return str;
    }
    return new Buffer(str, 'base64').toString('utf-8');
};

/**
 * @description SQL字符串过滤
 * @param {String} str 待过滤的字符串
 * @returns {String} 过滤后的字符串
 */
module.exports.sqlEncode = function (str) {
    if (!str) {
        return str;
    }
    str = str.replace('\'', '\'\'');
    return str;
};