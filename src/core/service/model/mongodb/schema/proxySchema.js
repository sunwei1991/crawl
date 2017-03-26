/**
 * @author sunwei,2017/3/26.
 */
"use strict";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * @description 定义proxy的schema
 * @property {String} ip ip地址
 * @property {Number} port 端口
 * @property {String} method 支持的调用方式
 * @property {Number} valid 是否可用，默认是0 可用
 * @property {Date} insertTime 插入时间
 * @property {Date} latestUsedTime 上次使用时间
 */
let proxySchema = new Schema({
    ip: {type: String},
    port: {
        type: Number, default: function () {
            return null;
        }
    },
    method: {
        type: String, default: function () {
            return null;
        }
    },
    valid: {
        type: Number, default: function () {
            return 0;
        }
    },
    insertTime: {
        type: Date, default: function () {
            return new Date();
        }
    },
    latestUsedTime: {
        type: Date, default: function () {
            return new Date();
        }
    }
});

/**
 * @description 索引
 */
proxySchema.index({insertTime: 1});
proxySchema.index({ip: 1, port: 1});
proxySchema.index({valid: 1});
proxySchema.index({latestUsedTime: 1});
proxySchema.index({valid: 1, latestUsedTime: 1});
proxySchema.index({latestUsedTime: 1});

mongoose.model('proxy', proxySchema);