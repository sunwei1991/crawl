/**
 * @author sunwei on 2017/2/25.
 */
"use strict";
const fs = require('fs');
const crypto = require('crypto');

module.exports.getFiles = function (dirStr, callback) {
    fs.access(dirStr, function (err_a) {
        if (err_a) {
            callback(err_a);
            return;
        }
        fs.readdir(dirStr, function (err_r, files) {
            var ret = [];
            if (err_r) {
                callback(err_r);
                return;
            }
            function readChild(i) {
                if (i >= files.length) {
                    callback(null, ret);
                    return;
                }
                var childPath = dirStr + '/' + files[i];
                fs.stat(childPath, function (err_c, stat) {
                    if (err_c) {
                        callback(err_c);
                        return;
                    }
                    if (stat.isDirectory()) {
                        getFiles(childPath, function (err_g, files_g) {
                            if (err_g) {
                                callback(err_g);
                                return;
                            } else {
                                Array.prototype.push.apply(ret, files_g);
                            }
                            i++;
                            readChild(i);
                        });
                    } else {
                        ret.push(childPath);
                        i++;
                        readChild(i);
                    }
                });
            }

            readChild(0);
        });
    });
};

module.exports.getFileHash = function (filePath, callback) {
    try {
        var hash = crypto.createHash('sha256');
        var rs = fs.createReadStream(filePath);
        rs.on('data', function (chunk) {
            hash.update(chunk);
        });
        rs.on('end', function () {
            var str = hash.digest('hex');
            callback(null, str);
        });
    } catch (e) {
        callback(e);
    }
};

module.exports.getFileMD5 = function (filePath, callback) {
    var md5Sum = crypto.createHash('md5');
    var rs = fs.createReadStream(filePath);
    rs.on('data', function (chunk) {
        md5Sum.update(chunk);
    });
    rs.on('end', function () {
        var str = md5Sum.digest('hex');
        callback(null, str);
    });
};