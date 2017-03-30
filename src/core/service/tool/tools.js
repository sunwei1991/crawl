/**
 * @author sunwei,2017/3/25.
 */
"use strict";

module.exports.exists = function (obj) {
    return (typeof(obj) != 'undefined' && obj != null && obj != '');
};