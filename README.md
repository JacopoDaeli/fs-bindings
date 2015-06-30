# fs-bindings
File System bindings for Node.js inspired by AWS S3 SDK.

## Usage

```
const FS = require('./index').FS;
const fs = new FS({ rootFolder: `path/to/root/folder` });

fs.createBucket({ Bucket: 'awesome' }, function(err, response) {
  if(err) return console.error(err);
  console.log(`createBucket says: ${response.Location}`);
  fs.putObject('This is amazing!', { Bucket: 'awesome', Key: 'path/to/something/amazing.txt' },
    function(err, response) {
      if(err) return console.error(err);
      console.log(`putObject says: ${response.Location}`);
      fs.getObject({ Bucket: 'awesome', Key: 'path/to/something/amazing.txt' },
        function(err, object) {
          if(err) return console.error(err);
          console.log(`*** getObject returned a file ***`);
          console.log(`object.path: ${object.path}`);
          console.log(`object.CreationDate: ${object.CreationDate}`);
          console.log(`object.LastModified: ${object.LastModified}`);
          console.log(`object.ContentLength: ${object.ContentLength}`);
          console.log(`object.Body: ${object.Body.toString()}`);
          fs.deleteObject({ Bucket: 'awesome', Key: 'path/to/something/amazing.txt' },
            function(err, object) {
              if(err) return console.error(err);
              console.log(`deleteObject says: ${response.Location}`);
          });
      });
  });
});
```


## Implementation

```
class FS {

  /**
   * constructor - Constructs a FS object
   *
   * @param {Object} params
   * @api public
   */
  constructor(opts) {

  }

  /**
   * createBucket - Creates a new bucket
   *
   * @param {Object} params
   * @param {Function} callback
   * @api public
   */
  createBucket(params, callback) {

  }

  /**
   * deleteBucket - Deletes the bucket
   *
   * @param {Object} params
   * @param {Function} callback
   * @api public
   */
  deleteBucket() {

  }

  /**
   * putObject - Adds an object to a bucket
   *
   * @param {Object} params
   * @param {Function} callback
   * @api public
   */
  putObject(params, callback) {

  }

  /**
   * getObject - Retrieves the object
   *
   * @param {Object} params
   * @param {Function} callback
   * @api public
   */
  getObject(params, callback) {

  }

  /**
   * deleteObject - Delete the object
   *
   * @param {Object} params
   * @param {Function} callback
   * @api public
   */
  deleteObject(params, callback) {

  }

  /**
   * deleteObjects - This operation enables you to delete multiple objects from a bucket using a single request
   *
   * @param {Object} params
   * @param {Function} callback
   * @api public
   */
  deleteObjects(params, callback) {

  }

}
```

```
class File {

  /**
   * constructor - Constructs a File object
   *
   * @param {Object} params
   * @api public
   */
  constructor(params) {

  }

  /**
   * loadFile - Load a file from the FS
   *
   * @param {String} path
   * @param {Function} callback
   * @return {File}
   * @api public
   */
  static loadFile(path, callback) {

  }

}
```


## TODO

- Implementing `FS.deleteObjects(...)` method
- Object versioning
- Buckets as website
