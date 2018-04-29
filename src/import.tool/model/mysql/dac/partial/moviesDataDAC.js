/**
 * @fileOverview mysql中movies_data表操作模块
 * @module model/mysql/dac/moviesDataDAC
 * @author sunwei
 * @description 本文件由sunwei自动生成，手动更改此文件可能会导致应用程序中发生异常行为，如果重新生成代码，则将覆盖对此文件的手动更改。
 */
'use strict';

const moviesDataModel = require('../../entity/moviesDataModel.js');
const schema = require('../../schema').schema();
const tools = CIT.tools;

/**
 * @description 添加一条moviesData记录
 * @author sunwei
 * @param {Object} moviesData
 * @returns {*} 新添加的moviesData对象
 */
module.exports.addOne = function (moviesData) {
    let options = {raw: true};
    return moviesDataModel.create(moviesData, options);
};

/**
 * @description 根据id获取一条moviesData记录
 * @author sunwei
 * @param {INTEGER} id
 * @returns {*} moviesData对象
 */
module.exports.getByID = function (id) {
    let options = {raw: true, where: {id: id}};
    return moviesDataModel.findOne(options);
};

/**
 * @description 根据id删除一条moviesData记录
 * @author sunwei
 * @param {INTEGER} id
 * @returns {*} 受影响的行数
 */
module.exports.deleteByID = function (id) {
    let options = {where: {id: id}};
    return moviesDataModel.destroy(options);
};

/**
 * @description 根据id倒序获取最新的moviesData记录
 * @author sunwei
 * @param {Number} length 返回的记录条数
 * @returns {*} moviesData对象列表
 */
module.exports.getLatestOrderByID = function (length) {
    let sql = 'select id,title,fileSize,filePath,fileExt,fileMD5,fileHash,originalName,originalPath from movies_data order by id desc limit 0,:length';
    let options = {type: schema.QueryTypes.SELECT, raw: true, replacements: {length: length}};
    return schema.query(sql, options);
};

/**
 * @description 根据title获取一条moviesData记录
 * @author sunwei
 * @param {STRING} title
 * @returns {*} moviesData对象
 */
module.exports.getByTitle = function (title) {
    let options = {raw: true, where: {title: title}};
    return moviesDataModel.findOne(options);
};

/**
 * @description 根据title删除moviesData记录
 * @author sunwei
 * @param {STRING} title
 * @returns {*} 受影响的行数
 */
module.exports.deleteByTitle = function (title) {
    let options = {where: {title: title}};
    return moviesDataModel.destroy(options);
};

/**
 * @description 根据title更新moviesData记录
 * @author sunwei
 * @param {STRING} title
 * @param {Object} moviesData 新的moviesData
 * @returns {*} 受影响的行数
 */
module.exports.updateByTitle = async function (title, moviesData) {
    let values = {};
    let options = {raw: true, where: {title: title}};
    
    if (!tools.isUndefined(moviesData.fileSize)) {
        values = Object.assign(values, {fileSize: moviesData.fileSize});
    }
    if (!tools.isUndefined(moviesData.filePath)) {
        values = Object.assign(values, {filePath: moviesData.filePath});
    }
    if (!tools.isUndefined(moviesData.fileExt)) {
        values = Object.assign(values, {fileExt: moviesData.fileExt});
    }
    if (!tools.isUndefined(moviesData.fileMD5)) {
        values = Object.assign(values, {fileMD5: moviesData.fileMD5});
    }
    if (!tools.isUndefined(moviesData.fileHash)) {
        values = Object.assign(values, {fileHash: moviesData.fileHash});
    }
    if (!tools.isUndefined(moviesData.originalName)) {
        values = Object.assign(values, {originalName: moviesData.originalName});
    }
    if (!tools.isUndefined(moviesData.originalPath)) {
        values = Object.assign(values, {originalPath: moviesData.originalPath});
    }

    if (!Object.keys(values).length) {
        return 0
    }

    return moviesDataModel.update(values, options)
        .then(affected=>affected[0]);
};
