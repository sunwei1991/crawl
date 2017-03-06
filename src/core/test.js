/**
 * @author sunwei on 2017/3/6.
 */
"use strict";
const cheerio = require('cheerio');
const request = require('request');
const then = require('thenjs');

function test() {
    return then(function (cont) {
        request({uri: 'https://movie.douban.com/subject/6532822/'}, function (err, res, body) {
            if (err) {
                cont(err);
                return;
            }
            console.log(body);
            cont(null, true);
        });
    });
}

test()
    .fin(function (cont, err, ret) {
        if (err) {
            console.error(err);
        }
        console.log(ret);
    });
