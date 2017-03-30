/**
 * @author sunwei,2017/3/30.
 */
"use strict";
const cheerio = require('cheerio');
const logger = crawl.logger;
const proxyIPDAC = require('../../model/mongodb/dac/proxyDAC.js');
const requestHandle = require('../requestHandle');
const then = crawl.module.then;
const tools = crawl.tools;
const Url = require('url');

class storageHandle {
    constructor(option) {
        this.baseUrl = option.baseUrl;
        this.redo = option.redoTimes;
        this.useProxy = option.proxy === true;
        this.detailLimit = option.detailLimit || 5;
    }

    main() {
        const _this = this;
        return _this.proxy()
            .then(function (cont, data) {
                _this.save(data).fin(cont);
            })
            .fail(function (cont, err) {
                cont(err);
            })
    }

    save(data) {
        const _this = this;
        return then(function (cont) {
            then.eachLimit(data, function (con, proxy) {
                    proxy.valid = 0;
                    return proxyIPDAC.upsert(proxy).fin(function (co, err, ret) {
                        if (err) {
                            logger.error(err);
                            return;
                        }
                        con(null, ret);
                    });
                }, 10)
                .then(function (con, ret) {
                    logger.info('youdaili此次upsert数据%s条', data.length);
                    cont(null, true);
                })
                .fail(cont);
        });
    }

    proxy() {
        const _this = this;
        return _this.getBase()
            .then(function (cont, urls) {
                then.each(urls, function (con, url) {
                    return _this.getProxy(url).fin(con);
                }).fin(cont);
            })
            .then(function (cont, ret) {
                let list = [];
                ret.forEach(function (row) {
                    Array.prototype.push.apply(list, row);
                });
                cont(null, list);
            })
            .then(function (cont, list) {
                let temp = {};
                let ret = [];
                list.forEach(function (proxy) {
                    let key = proxy.ip.toString() + proxy.port.toString();
                    if (!temp[key]) {
                        temp[key] = proxy;
                        ret.push(proxy);
                    }
                });
                cont(null, ret);
            })
            .fail(function (cont, err) {
                cont(err);
            });
    }

    getBase() {
        const _this = this;
        return then(function (cont) {
            let option = {
                proxy: _this.useProxy,
                url: _this.baseUrl,
                redo: _this.redo
            };
            let handle = new requestHandle(option);
            handle.request()
                .then(function (con, ret) {
                    let $ = cheerio.load(ret);
                    let $list = $('.chunlist').find("li:not('.line')");
                    if (_this.detailLimit > $list.length) {
                        _this.detailLimit = $list.length;
                    }
                    let urls = [];
                    for (let i = 0; i < _this.detailLimit; i++) {
                        let $li = $list.eq(i);
                        urls.push($li.find('a').eq(0).attr('href').trim());
                    }
                    cont(null, urls);
                })
                .fail(cont);
        });
    }

    getProxy(url) {
        const _this = this;
        return then(function (cont) {
            let option = {
                proxy: _this.useProxy,
                url: url,
                redo: _this.redo
            };
            let handle = new requestHandle(option);
            handle.request()
                .then(function (con, ret) {
                    let $ = cheerio.load(ret);
                    let $content = $('.content');
                    if (!$content || $content.length < 1) {
                        cont(new Error('empty content'));
                        return;
                    }
                    let list = [];
                    $content.eq(0).find('p').each(function (i, o) {
                        let str = $(o).text().trim();
                        if (str.split('@').length > 1) {
                            let ip = str.split('@')[0].split(':')[0];
                            let port = str.split('@')[0].split(':')[1] ? str.split('@')[0].split(':')[1] : '';
                            let method = str.split('@')[1].split('#')[0].toLocaleLowerCase();
                            list.push({
                                ip: ip,
                                port: port,
                                method: method
                            });
                        }
                    });
                    let $pb = $('.pagebreak');
                    if ($pb && $pb.find('.thisclass') && $pb.find('.thisclass').eq(0).next()) {
                        let $nextPage = $pb.find('.thisclass').eq(0).next();
                        if ($nextPage.find('a')) {
                            let nextUrl = $nextPage.find('a').attr('href').trim();
                            if (nextUrl != '#') {
                                return _this.getProxy(Url.resolve(url, nextUrl))
                                    .fin(function (con1, err, proxys) {
                                        if (err) {
                                            proxys = [];
                                        }
                                        Array.prototype.push.apply(list, proxys);
                                        cont(null, list);
                                    });
                            }
                            else {
                                cont(null, list);
                            }
                        }
                        else {
                            cont(null, list);
                        }
                    }
                    else {
                        cont(null, list);
                    }
                })
                .fail(cont);
        });
    }
}

module.exports.start = function (options) {
    let handle = new storageHandle({
        baseUrl: options.baseUrl,
        redo: options.redoTimes,
        useProxy: options.useProxy,
        detailLimit: options.detailLimit
    });
    logger.info('开始抓取youdaili的代理IP');
    return handle.main()
        .fin(function (cont, err, ret) {
            if (err) {
                logger.error('youdaili-获取代理出错：%s', err);
            }
            logger.info('抓取youdaili的代理IP完成');
            setImmediate(function () {
                setTimeout(function () {
                    return module.exports.start(options);
                }, options.delay * 1000);
            });
        });
};