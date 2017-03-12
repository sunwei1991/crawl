/**
 * @author sunwei on 2017/2/25.
 */
"use strict";
const fileHelper=require('./tools/fileHelper');

fileHelper.getFiles('G:/电影/720p/007系列', function (err, files) {
    if (err) {
        console.error(err);
    }
    else {
        var start = new Date().getTime();

        function cal_loop(i) {
            if (i >= files.length) {
                console.log('耗时:' + (new Date().getTime() - start) / 1000.00 + "秒");
                return;
            }
            fileHelper.getFileMD5(files[i], function (err, hashStr) {
                if (err) {
                    console.error(err);
                }
                console.log(hashStr);
                i++;
                cal_loop(i);
            });
        }

        cal_loop(0);
    }
});