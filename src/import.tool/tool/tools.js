/**
 * @fileOverview 工具类方法集合
 * @author menglb
 * @module tool/tools
 */

var extendUtil = require('util')._extend;
var uuid = require('uuid');

module.exports = {
    /**
     * @description api数据接口结果封装
     * @param {Object} data 返回的数据
     * @param {Number} code 错误码，默认0
     * @param {String} msg 返回信息，常用作错误提示
     * @return {Object} 封装后的对象
     */
    apiResult: apiResult,
    /**
     * @description api错误信息封装
     * @param {Object} msgOrObj 错误信息
     * @param {Number} code 错误码，默认-1
     * @param {Object} data 数据，默认为空
     * @return {Object} 封装后的对象
     */
    apiErr: apiErr,
    /**
     * @description 错误处理，用在then链中
     * @param {Function} cont 触发器，触发下一个then链
     * @param {Object} err 错误信息
     * @return {Function} 触发then链中的fail方法
     */
    errorHandler: errorHandler,
    /**
     * @description api错误处理，用在then链中的Response
     * @param {Function} cont then链中的触发器
     * @param {Object} err 错误信息
     * @param {Object} res http response
     * @return {Response} 返回json格式的response
     */
    apiErrorHandler: apiErrorHandler,
    /**
     * @description api结果返回处理，用在then链中的Response
     * @param {Function} cont then链中的触发器
     * @param {Object} data 待响应返回的数据对象
     * @param {Object} res http response
     * @return {Response} 返回json格式的response
     */
    apiResultHandler: apiResultHandler,
    /**
     * @description 请求参数校验，使用了ExpressValidator
     * @param {Object} req http request
     * @param {Object} res http response
     * @return {Object} 有错误返回apiErr对象，没有错误返回null
     */
    paramCheck: paramCheck,
    /**
     * @description 向对象中添加另一对象
     * @param {Object} dst 被添加的对象
     * @param {Object} src 要添加的对象
     * @return {Object} 返回添加合并后的对象
     */
    extend: extend,
    /**
     * @description 检测对象是否是一个function
     * @param {String} fn 函数名
     * @return {Boolean} true or false
     */
    isFunction: isFunction,
    /**
     * @description JSON字符串转化为对象
     * @param {String} str JSON字符串
     * @returns {Object} 转化后的对象
     * @function
     */
    parseJSON: parseJSON,
    /**
     * @description 判断是否为null
     * @param {Object} obj 输入对象
     * @return {Boolean} true or false
     */
    isNull: isNull,
    /**
     * @description 判断是否为数组
     * @param {Object} obj 输入对象
     * @return {Boolean} true or false
     */
    isArray: isArray,
    /**
     * @description 判断是否是字符串
     * @param {Object} str 输入对象
     * @return {Boolean} true or false
     */
    isString: isString,
    /**
     * @description 判断对象是否为空
     * @param {Object} obj 输入对象
     * @return {Boolean} true or false
     */
    isEmpty: isEmpty,
    /**
     * @description 转换成字符串
     * @param {Object} value 输入对象
     * @return {String} 转换后的字符串
     */
    toStr: toStr,
    /**
     * @description 转换成Number
     * @param {Object} value 输入对象
     * @return {Number} 转换后的数字
     */
    toNum: toNum,
    /**
     * @description 转换成数组
     * @param {Object} value 输入对象
     * @return {Array} 转换后的数组
     */
    toArray: toArray,
    /**
     * @description 删除字符串两端的空格
     * @param {String} str 待处理字符串
     * @param {Boolean} strict 是否为严格模式，默认为false
     * @return {String} 删除空格后的字符串
     */
    trim: trim,
    /**
     * @description 判断独享是否存在该属性
     * @param {Object} obj 输入对象
     * @param {String} key 属性名
     * @return {Boolean} true or false
     */
    hasOwn: hasOwn,
    /**
     * @description 获取url中的参数
     * @param {String} url url
     * @param {String} key 参数名
     * @return {String} 参数值
     */
    getUrlParam: getUrlParam,
    /**
     * @description 往url中添加参数
     * @param {String} url url
     * @param {String} key 参数名
     * @param {String} value 参数值
     * @return {String} url
     */
    setUrlParam: setUrlParam,
    /**
     * @description 往url中添加参数
     * @param {String} url url
     * @param {Object} keyValues 要添加的参数，格式为{key:value}
     * @return {String} url
     */
    setUrlParams: setUrlParams,
    /**
     * @description 时间格式化，返回yyyy-MM-dd HH:mm:ss
     * @param {Date} time 输入的日期对象
     * @return {String} 格式化后的日期
     */
    formatTime: formatTime,
    /**
     * @description 日期格式化，返回yyyy-MM-dd
     * @param {Date} date 输入的日期对象
     * @return {String} 格式化后的日期
     */
    formatDate: formatDate,
    /**
     * @description 判断对象是否存在，undefined、null、''都是不存在
     * @param {Object} obj 输入对象
     * @return {Boolean} true or false
     */
    isExist: isExist,
    /**
     * @description 判断对象是否未定义
     * @param {Object} obj 输入对象
     * @return {Boolean} true or false
     */
    isUndefined: isUndefined,
    /**
     * @description 为目标数字左侧补零，并输出补零后数字字符串
     * @param {Number} num 目标数字
     * @param {Number} n 数字格式位数
     * @return {String} 补零后的数字字符串
     */
    pad: pad,
    /**
     * @description 生成uuid
     * @return {String} uuid
     */
    getUUID: getUUID,
    /**
     * @description 判断输入值是否为非负整数
     * @return {String} true or false
     */
    isPositiveInt: isPositiveInt,
    /**
     * @description 根据字段值获取字段key值，主要用于枚举类获取描述信息
     * @param {Object} obj 枚举对象
     * @param {Object} val 枚举值
     * @return {String} 键值
     */
    getKeyByVal: getKeyByVal,
    /**
     * @description 获取文件的扩展名
     * @param {String} fileName 文件名
     * @return {String} 文件扩展名
     */
    getFileExt: getFileExt,
    /**
     * @description 获取request中cookie中的值
     * @param {Object} req request对象
     * @param {String} cookie名
     * @returns {String} 返回对应的cookie值，不存在返回null
     */
    getCookieValue: getCookieValue,
    /**
     * @description 截字
     * @param {String} str 要截字的字符串
     * @param {Number} num 截字字节数目
     * @param {String} [appendChars] 超长时尾部附件的字符串
     * @returns {String} 截字后的字符串
     */
    substring: substring,
    /**
     * @description 取字符串的整型hash值
     * @param {String} str 要处理的字符串
     * @returns {Number} hash值
     */
    hashCode: hashCode,
    /**
     * @description 处理expressValidator的错误信息
     * @param {Array} expressValidator的错误信息
     * @returns {String} 错误信息
     */
    formatValidationErrors: formatValidationErrors,
    fileName: fileName,
    /**
     * @description 判断一个对象是否能转换成日期
     * @param {Object} obj 输入对象
     * @returns {Boolean}
     */
    isDate: isDate,
    /**
     * @description 将array数组转换成sql查询的in条件<br />
     *              input:['a','b','c']
     *              output: \'a\',\'b\',\'c\'
     * @param arr
     * @returns {string}
     */
    arrayToSql: arrayToSql
};

function apiErrorHandler(err, res) {
    if (!err || typeof err.code == 'undefined') {
        err = apiErr(err);
    }
    res.json(err);
}

function apiResultHandler(data, res) {
    if (!data || typeof data.code == 'undefined') {
        data = apiResult(data);
    }
    res.json(data);
}

function paramCheck(req, res) {
    var errors = req.validationErrors();
    if (errors && errors.length > 0) {
        var ermsg = [];
        for (var i = 0; i < errors.length; i++) {
            ermsg.push(errors[i].msg);
        }

        return apiErr(ermsg.join("\n"));
    }

    return null;
}

function errorHandler(cont, err) {
    cont(err);
}

function apiErr(msgOrObj, code, data) {
    var err = {};
    err.msg = msgOrObj.toString();
    err.code = code || -1;
    err.data = data || '';
    return err;
}

function apiResult(data, code, msg) {
    return {
        code: code || 0,
        msg: msg,
        data: data
    };
}

function extend(dst, src) {
    return extendUtil(dst, src);
}

function isFunction(fn) {
    return typeof fn === 'function';
}

function parseJSON(str) {
    var obj = null;
    try {
        obj = JSON.parse(str);
    } catch (e) {
    }
    return typeof obj === 'object' ? obj : null;
}

function isArray(obj) {
    return Array.isArray ? Array.isArray(obj) : Object.prototype.toString.call(obj) === '[object Array]';
}

function isString(str) {
    return (typeof str == 'string') && str.constructor == String;
}

function isNull(obj) {
    return obj === null || obj !== obj;
}

function isEmpty(obj) {
    if (obj) {
        for (var key in obj) {
            return !hasOwn(obj, key);
        }
    }
    return true;
}

function toStr(value) {
    if (typeof value === 'object') {
        return JSON.stringify(value);
    }
    else {
        return (value || value === 0) ? (value + '') : '';
    }
}

function toNum(value) {
    if (isArray(value)) {
        value.forEach(function (x, i) {
            value[i] = +x || 0;
        });
    } else {
        value = +value || 0;
    }
    return value;
}

function toArray(value) {
    if (!isArray(value)) {
        value = value === undefined ? [] : [value];
    }
    return value;
}

function trim(str, strict) {
    return toStr(str).trim().replace(strict ? (/\s+/g) : (/ +/g), ' ').replace(/^\s+/, '').replace(/\s+$/, '');
}

function hasOwn(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
}

function getUrlParam(url, key) {
    var urlM = require('url');
    var qsM = require('querystring');
    var urlObj = urlM.parse(url);
    urlObj.query = urlObj.query || {};
    if (typeof urlObj.query == 'string') {
        urlObj.query = qsM.parse(urlObj.query);
    }
    return urlObj.query[key];
}

function setUrlParam(url, key, value) {
    return setUrlParams(url, parseJSON('{"' + key + '":"' + value + '"}'));
}

function setUrlParams(url, keyValues) {
    var urlM = require('url');
    var qsM = require('querystring');
    var urlObj = urlM.parse(url);
    urlObj.query = urlObj.query || {};
    if (typeof urlObj.query == 'string') {
        urlObj.query = qsM.parse(urlObj.query);
    }
    urlObj.query = extend(urlObj.query, keyValues);
    urlObj.search = null;
    return urlM.format(urlObj);
}

function formatTime(time) {
    var result = time.getFullYear() + "-" + pad((time.getMonth() + 1), 2) + "-" + pad(time.getDate(), 2) + " ";
    result += pad(time.getHours(), 2) + ":" + pad(time.getMinutes(), 2) + ":" + pad(time.getSeconds(), 2);
    return result;
}

function formatDate(date) {
    if (!date) {
        return date;
    }

    var result = date.getFullYear() + "-" + pad((date.getMonth() + 1), 2) + "-" + pad(date.getDate(), 2);
    return result;
}

function isExist(obj) {
    return !(typeof(obj) == "undefined" || obj === null || obj === '');
}

function isUndefined(obj) {
    return typeof(obj) == "undefined";
}

function pad(num, n) {
    var len = num.toString().length;
    while (len < n) {
        num = "0" + num;
        len++;
    }
    return num;
}


function getUUID() {
    return uuid.v1().replace(/-/g, "");
}

function isPositiveInt(value) {
    var r = new RegExp("^\\d+$");
    return r.test(value);
}

function getKeyByVal(obj, val) {
    if (!obj) {
        return '';
    }
    for (var i in obj) {
        if (obj[i] === val) {
            return i;
        }
    }

    return '';
}

function getFileExt(fileName) {
    var fileTypeMatches = fileName.match(/.([^.]*)$/);
    var fileFormat = '';
    if (fileTypeMatches && fileTypeMatches.length > 1) {
        fileFormat = fileTypeMatches[1];
    }

    return fileFormat;
}

function getCookieValue(req, name) {
    if (!req || !req.headers || !req.headers.cookie) {
        return null;
    }

    var cookieString = req.headers.cookie;
    var pairs = cookieString.split(/[;,] */);
    var cookies = {};
    for (var i = 0; i < pairs.length; i++) {
        var idx = pairs[i].indexOf('=');
        var key = pairs[i].substr(0, idx).toLocaleLowerCase();
        var val = pairs[i].substr(++idx, pairs[i].length).trim();
        cookies[key] = val;
    }
    name = name.toLocaleLowerCase();
    if (cookies[name]) {
        return decodeURIComponent(cookies[name]);
    }
    else {
        return null;
    }
}

function substring(str, num, appendChars) {
    if (!str || !num) {
        return '';
    }
    if (str.length <= num) {
        return str;
    }
    var strReturn = '';
    num *= 2;
    var a = 0;
    for (var i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) > 255) {
            a += 2;
        } else {
            a++;
        }
        if (a > num) {
            break;
        }
        strReturn += str.charAt(i);
    }

    if (str.length <= strReturn.length || (typeof appendChars != "undefined" && !appendChars)) {
        return strReturn;
    }
    if (typeof appendChars == "undefined") {
        appendChars = '...';
    }
    return strReturn + appendChars;
}

function hashCode(str) {
    var hash = 0;
    if (str.length === 0) return hash;
    for (var i = 0; i < str.length; i++) {
        var char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        /*Convert to 32bit integer*/
        hash = hash & hash;
    }
    return Math.abs(hash);
}

function formatValidationErrors(errors) {
    var erMsg = [];
    if (errors && errors.length > 0) {
        errors.forEach(function (e) {
            erMsg.push(e.msg);
        });
    }
    return erMsg.join("\n");
}

function fileName(attachPath, isAliyun) {
    var spilts;
    if (!isExist(isAliyun) || isAliyun === 0) spilts = attachPath.split('_');
    else spilts = attachPath.split('/');
    return spilts[spilts.length - 1];
}

function isDate(str) {
    try {
        return !isNull(new Date(str).getTime());
    }
    catch (e) {
        return false;
    }
}

function sqlEncode(str) {
    if (!str) {
        return str;
    }
    str = str.replace('\'', '\'\'');
    return str;
}

function arrayToSql(arr) {
    var str = '';
    arr.forEach(function (c) {
        str += '\'' + sqlEncode(c) + '\',';
    });
    str = str.substring(0, str.length - 1);
    return str;
}