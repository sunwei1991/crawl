/**
 * @description Sequelize
 * @author by s.wei on 2016/4/8.
 * @module model/mysql/entity/schema
 */
"use strict";

const Sequelize = require('sequelize');
const sqlConfig = CIT.config.mysqlConfig;
const Op = Sequelize.Op;

const operatorsAliases = {
    $eq: Op.eq,
    $ne: Op.ne,
    $gte: Op.gte,
    $gt: Op.gt,
    $lte: Op.lte,
    $lt: Op.lt,
    $not: Op.not,
    $in: Op.in,
    $notIn: Op.notIn,
    $is: Op.is,
    $like: Op.like,
    $notLike: Op.notLike,
    $iLike: Op.iLike,
    $notILike: Op.notILike,
    $regexp: Op.regexp,
    $notRegexp: Op.notRegexp,
    $iRegexp: Op.iRegexp,
    $notIRegexp: Op.notIRegexp,
    $between: Op.between,
    $notBetween: Op.notBetween,
    $overlap: Op.overlap,
    $contains: Op.contains,
    $contained: Op.contained,
    $adjacent: Op.adjacent,
    $strictLeft: Op.strictLeft,
    $strictRight: Op.strictRight,
    $noExtendRight: Op.noExtendRight,
    $noExtendLeft: Op.noExtendLeft,
    $and: Op.and,
    $or: Op.or,
    $any: Op.any,
    $all: Op.all,
    $values: Op.values,
    $col: Op.col
};

const sequelizeInstance = new Sequelize(sqlConfig.database, sqlConfig.user, sqlConfig.password,
    {
        host: sqlConfig.host,
        port: sqlConfig.port,
        dialect: 'mysql',
        pool: sqlConfig.pool,
        logging: function (msg) {
            if (CIT.config.debug) {
                CIT.logger.debug(msg);
            }
        },
        dialectOptions: {
            multipleStatements: true
        },
        autocommit: true,
        isolationLevel: 'REPEATABLE READ',
        operatorsAliases: operatorsAliases
    });

/**
 * Sequelize初始化配置
 * 其他地方直接schema()即可获取一个新的连接
 */
exports.schema = function () {
    return sequelizeInstance;
};