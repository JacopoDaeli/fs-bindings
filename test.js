const FS = require('./index').FS;

const fs = new FS({ rootFolder: `${__dirname}/shared` });

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
