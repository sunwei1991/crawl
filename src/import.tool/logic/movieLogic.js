/**
 * @author sunwei,2018/4/30.
 */
"use strict";
const fileHelper = CIT.tools.fileHelper;
const fs = require('fs');
const path = require('path');
const moviesDataDAC = require('../model/mysql/dac/moviesDataDAC.js');

const baseDir = 'I:/电影';
const exts = ['mkv', 'rmvb', 'mp4'];

module.exports.import = async function () {
    let files = await getAllMovie();
    let movies = [];
    for (let i = 0; i < files.length; i++) {
        let movie = await getMovieInfo(files[i]);
        if (exts.indexOf(movie.fileExt.toLocaleLowerCase()) > -1) {
            movies.push(movie);
        }
    }
    await moviesDataDAC.bulkInsert(movies);
    return files;
};

function getAllMovie() {
    return new Promise(function (resolve, reject) {
        fileHelper.getFiles(baseDir, function (err, files) {
            if (err) {
                reject(err);
                return;
            }
            resolve(files);
        });
    });
}

function getMovieInfo(filePath) {
    return new Promise(function (resolve, reject) {
        try {
            let movie = {originalPath: filePath};
            let _path = path.parse(filePath);
            movie.title = _path.name;
            movie.fileExt = _path.ext.replace(/^\./, '');
            movie.originalName = _path.name;
            fs.stat(filePath, function (err, status) {
                if (err) {
                    reject(err);
                    return;
                }
                movie.fileSize = status.size;
                resolve(movie);
            });
        }
        catch (err) {
            reject(err);
        }
    });
}