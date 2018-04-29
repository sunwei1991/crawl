/**
 * @fileOverview mysql中movies_data表操作模块
 * @author sunwei
 * @module model/mysql/dac/moviesDataDAC
 * @description 用户可在此文件中添加对movies_data表的操作，此文件集成了partial中sunwei自动生成的模块。
*/
'use strict';

const schema = require('../schema').schema();
const moviesDataModel = require('../entity/moviesDataModel.js');
let extension = require('./partial/moviesDataDAC.js');
module.exports = extension;
