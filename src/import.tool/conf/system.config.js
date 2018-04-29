/**
 * @description 系统配置文件
 * @author sunwei 2018/1/27
 * @module conf/system.config
 */
"use strict";
module.exports = {
    /**【部署需要修改】，部署环境需要修改，程序运行端口*/
    port: 3005,
    /**【部署需要修改】，debug为true时，为调试模式*/
    debug: true,
    /**【部署需要修改】，为true时，启动进程会编译压缩静态文件*/
    compile: false,
    /**【部署需要修改】，session过期时间，单位：分钟*/
    sessionExpiresTime: 20,
    /*【部署需要修改】，refreshToken过期时间，单位：分钟*/
    refreshTokenExpiresTime: 60 * 24 * 14,
    /**【部署需要修改】，session加密密钥*/
    sessionSecretKey: 'Mopit!@#',
    /**【部署需要修改】，存储session的redis配置*/
    sessionRedisConfig: {host: '101.201.140.179', port: 5268, db: 9},
    /**【部署需要修改】，OAuth state过期时间，单位：分钟*/
    stateExpiresTime: 2,
    /**【部署需要修改】，mysql数据库配置*/
    mysqlConfig: {
        host: '101.201.140.179',
        port: 33061,
        user: 'college',
        password: 'college123!',
        database: 'porcupine_exercise',
        pool: {
            maxConnections: 100
        }
    },
    /**【部署需要修改】，mongodb数据库配置*/
    mongodbConfig: {
        uri: 'mongodb://101.201.140.179:8017/porcupine_exercise',
        options: {
            autoReconnect: true,
            poolSize: 100,
            reconnectTries: Number.MAX_VALUE,
            reconnectInterval: 1000,
            useMongoClient: true
        }
    },
    /**【部署需要修改】，数据缓存的redis配置*/
    cacheRedisConfig: {host: '101.201.140.179', port: 5268, db: 10},
    /**【部署需要修改】，数据缓存的过期时间，单位：分钟*/
    cacheExpiresTime: 60 * 24 * 14,
    /**【部署需要修改】，文件服务器配置*/
    uploadConfig: 'http://file.ngrok.porcupinee.com:8044/',
    /**【部署需要修改】，用户统一认证配置*/
    userAuthConfig: {
        /**基地址*/
        baseUrl: 'http://ucenter.ngrok.porcupinee.com:8044',
        /**内网基地址*/
        baseIntranetUrl: 'http://ucenter.ngrok.porcupinee.com:8044',
        /**应用代码*/
        clientCode: 'porcupine-exercise-dev',
        /**授权密钥*/
        clientSecret: 'b28f3e30074511e895fb215f586d18e2',
        /**认证地址*/
        authUrl: '/oauth/authorize',
        /**回调地址*/
        authBackUrl: '/oauth/callback',
        /**获取token*/
        tokenUrl: '/api/oauth/token',
        /**刷新token*/
        refreshTokenUrl: '/api/user/token/refresh',
        /**获取用户信息*/
        userInfoUrl: '/api/user/cur',
        /**获取用户权限*/
        userPrivsUrl: '/api/user/priv',
        /**退出*/
        logoutUrl: '/api/user/logout',
        /**机构信息*/
        orgInfoUrl: '/api/org/detail'
    }
};