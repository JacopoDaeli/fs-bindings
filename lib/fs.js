'use strict';

const fs = require('fs-extra');
const async = require('async');
const File = require('./file');

class FS {

  /**
   * constructor - Constructs a FS object
   *
   * @param {Object} params
   * @api public
   */
  constructor(opts) {
    this.rootFolder = opts.rootFolder;
  }

  /**
   * _createDirectory - Create a directory
   *
   * @param {Object} params
   * @return {Object}
   * @api private
   */
   _createDirectory(dir, cb) {
     fs.exists(dir, function (exists) {
       const response = { Location: dir };
       if(exists) return cb(null, response);
       fs.mkdir(dir, '0755', function(err) {
         cb(err, response);
       });
     });
   }

  /**
   * _deleteDirectory - Delete a directory
   *
   * @param {Object} params
   * @return {Object}
   * @api private
   */
  _deleteDirectory(dir, cb) {
    fs.exists(dir, function (exists) {
      const response = { Location: dir };
      if(!exists) return cb(new Error(`Impossible to delete \`${dir}\`. Folder doen't exists.`));
      fs.rmdir(dir, function(err) {
        cb(err, response);
      });
    });
  }

  /**
   * createBucket - Creates a new bucket
   *
   * @param {Object} params
   * @param {Function} callback
   * @return {Object}
   * @api public
   */
  createBucket(params, callback) {
    if(!params.Bucket) throw new Error('FS.createBucket() -> params.Bucket is mandatory.');
    this._createDirectory(`${this.rootFolder}/${params.Bucket}`, callback);
  }

  /**
   * deleteBucket - Deletes the bucket
   *
   * @param {Object} params
   * @param {Function} callback
   * @return {Object}
   * @api public
   */
  deleteBucket(params, callback) {
    if(!params.Bucket) throw new Error('FS.deleteBucket() -> params.Bucket is mandatory.');
    this._removeDirectory(`${this.rootFolder}/${params.Bucket}`, callback);
  }

  /**
   * putObject - Adds an object to a bucket
   *
   * @param {Object} obj
   * @param {Object} params
   * @param {Function} callback
   * @return {Object}
   * @api public
   */
  putObject(obj, params, callback) {
    if(!obj) throw new Error('FS.putObject() -> obj is mandatory.');
    if(!params.Bucket) throw new Error('FS.putObject() -> params.Bucket is mandatory.');
    if(!params.Key) throw new Error('FS.putObject() -> params.Key is mandatory.');
    const self = this;
    const folders = params.Key.split(/\//gi);
    const folderPaths = [];

    let currentPath = `${this.rootFolder}/${params.Bucket}`;

    for(let i in folders) {
      if(i < folders.length - 1) {
        currentPath = `${currentPath}/${folders[i]}`;
        folderPaths.push(currentPath);
      }
    }

    async.eachSeries(folderPaths, this._createDirectory, function(err) {
      const response = { Location: `${self.rootFolder}/${params.Bucket}/${params.Key}` };
      fs.writeFile(response.Location, obj, function (err) {
        callback(err, response);
      });
    });
  }

  /**
   * getObject - Retrieves the object
   *
   * @param {Object} params
   * @param {Function} callback
   * @return {Object}
   * @api public
   */
  getObject(params, callback) {
    if(!params.Bucket) throw new Error('FS.putObject() -> params.Bucket is mandatory.');
    if(!params.Key) throw new Error('FS.putObject() -> params.Key is mandatory.');
    File.loadFile(`${this.rootFolder}/${params.Bucket}/${params.Key}`, function(err, obj) {
      callback(err, obj);
    });
  }

  /**
   * deleteObject - Delete the object
   *
   * @param {Object} params
   * @param {Function} callback
   * @return {Object}
   * @api public
   */
  deleteObject(params, callback) {
    if(!params.Bucket) throw new Error('FS.deleteObject() -> params.Bucket is mandatory.');
    if(!params.Key) throw new Error('FS.deleteObject() -> params.Key is mandatory.');
    const response = { Location: `${this.rootFolder}/${params.Bucket}/${params.Key}` };
    fs.unlink(response.Location, function (err) {
      // TODO: after removing a file, if directory is empty, delete the directory (recursive, except for the Bucket folder)
      callback(err, response);
    });
  }

  /**
   * deleteObjects - This operation enables you to delete multiple objects from a bucket using a single request
   *
   * @param {Object} params
   * @param {Function} callback
   * @return {Object}
   * @api public
   */
  deleteObjects(params, callback) {
    // TODO: method implementation
  }

}

module.exports = FS;
