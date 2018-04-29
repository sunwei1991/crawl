/**
 * @description 系统配置文件
 * @author sunwei 2018/1/27
 * @module conf/system.config
 */
"use strict";
module.exports = {
    /**【部署需要修改】，debug为true时，为调试模式*/
    debug: true,
    /**【部署需要修改】，mysql数据库配置*/
    mysqlConfig: {
        host: '192.168.31.105',
        port: 3306,
        user: 'dev',
        password: '123456',
        database: 'crawl-moivie',
        pool: {
            maxConnections: 100
        }
    }
};