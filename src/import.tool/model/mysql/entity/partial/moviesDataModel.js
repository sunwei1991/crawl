/**
 * @fileOverview mysql中movies_data表的schema文件
 * @author sunwei
 * @module model/mysql/entity/moviesDataModel
 * @description 本文件由sunwei自动生成，手动更改此文件可能会导致应用程序中发生异常行为，重新生成代码，则将覆盖对此文件的手动更改。
 */
'use strict';

const sequelize = require('sequelize');

module.exports = {
    modelName: 'movies_data',
    fields: {
        id: {type: sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        title: {type: sequelize.STRING, allowNull: true},
        fileSize: {type: sequelize.BIGINT},
        filePath: {type: sequelize.STRING, allowNull: true},
        fileExt: {type: sequelize.STRING, allowNull: true},
        fileMD5: {type: sequelize.STRING, allowNull: true},
        fileHash: {type: sequelize.STRING, allowNull: true},
        originalName: {type: sequelize.STRING, allowNull: true},
        originalPath: {type: sequelize.STRING, allowNull: true}
    },
    options: {
        freezeTableName: false,
        tableName: 'movies_data',
        timestamps: false
    }
};