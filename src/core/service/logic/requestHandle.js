/**
 * @author sunwei,2017/3/30.
 */
"use strict";
const logger = crawl.logger;
const proxyDAC = require('../model/mongodb/dac/proxyDAC.js');
const request = require('request');
const requestHelper = require('../tool/requestHelper');
const then = crawl.module.then;
const tools = crawl.tools;
const urlModel = require("url");

function getProxy() {
    return proxyDAC.findProxyIP(0, 0, 1, null, {latestUsedTime: 1})
        .then(function (cont, rows) {
            if (tools.exist(rows) && tools.isArray(rows) && rows.length >= 1) {
                let proxy = rows[0];
                proxyDAC.updateIPLatestUsedTime(proxy['_id']).fail(function (con, err) {
                    logger.error(err);
                });
                cont(null, 'http://' + proxy.ip + (proxy.port ? ':' + proxy.port : ''));
            }
            else {
                cont(new Error('no proxy'));
            }
        })
        .fail(function (cont, err) {
            cont(err);
        });

}

function doReq(option) {
    return then(function (cont) {
        let reqOptions = {};
        reqOptions.uri = option.url;
        reqOptions.headers = requestHelper.setHeaders(requestHelper.getHostFormUrl(option.url));
        reqOptions.method = option.method || 'GET';
        reqOptions.encoding = option.encoding || 'utf8';
        reqOptions.timeout = option.timeout || 30000;
        reqOptions.gzip = true;
        if (option.body) {
            reqOptions.body = option.body;
        }
        if (reqOptions.method.toLocaleLowerCase() == 'post') {
            reqOptions.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        }
        if (option.proxy) {
            reqOptions.proxy = option.proxy;
        }
        request(reqOptions, function (err, response, body) {
            if (err) {
                cont(err);
                return;
            }
            cont(null, {response: response, body: body});
        });
    });
}

class requestHandle {
    constructor(option) {
        this.option = option;
        this.redoCount = 0;
    }

    request() {
        const _this = this;
        return then(function (cont) {
            if (_this.option.proxy) {
                getProxy().fin(cont);
            }
            else {
                cont(null);
            }
        })
            .then(function (cont, proxy) {
                let reqOption = Object.assign({}, _this.option, {proxy: proxy});
                doReq(reqOption)
                    .fin(function (con, err, res) {
                        _this.redoCount++;
                        if (err) {
                            if (_this.option.redoTimes && _this.redoCount < _this.option.redoTimes) {
                                _this.request().fin(cont);
                            }
                            else {
                                cont(err);
                            }
                        }
                        else {
                            cont(null, res);
                        }
                    })
            })
            .fail(function (cont, err) {
                cont(err);
            });
    }
}

module.exports = requestHandle;