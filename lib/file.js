'use strict';

const fs = require('fs-extra');
const async = require('async');

class File {
  constructor(params) {
    this.Path = params.path;
    this.Body = params.body;
    this.CreationDate = params.ctime;
    this.LastModified = params.mtime;
    this.ContentLength = params.size;
  }
  static loadFile(path, callback) {
    const params = {};
    fs.stat(path, function(err, stats) {
      if(err) return callback(err);
      if(!stats.isFile()) return callback(new Error(`\`${path}\` is not a file.`));
      fs.readFile(path, function(err, data) {
        if(err) return callback(err);
        params.ctime = stats.ctime;
        params.mtime = stats.mtime;
        params.size = stats.size;
        params.body = data;
        callback(null, new File(params));
      });
    });
  }
}

module.exports = File;
