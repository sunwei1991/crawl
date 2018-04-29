/**
 * @fileOverview mysql中movies_data表的schema文件
 * @author sunwei
 * @module model/mysql/entity/moviesDataModel
 * @description 用户可在此文件中添加对movies_data表的定义，此文件集成了partial中sunwei自动生成的schema。
 */
'use strict';

const schema = require('../schema').schema();
const partial = require('./partial/moviesDataModel.js');

/**
 * @description 定义movies_data表model
 */
const moviesData = schema.define(partial.modelName,
    Object.assign(partial.fields,{

    }),
    Object.assign(partial.options,{

    }));

module.exports = moviesData;