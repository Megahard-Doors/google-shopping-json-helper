'use strict'
const fs = require ('fs');
const downloadr = require('../downloadr');
const recreate = require('../downloadr/recreate');
exports.categories = function() {
  // Clear the old file and open a writable
  let jfile = fs.createWriteStream('db/gpd.json', {flags: 'w', start: 0, mode: 0o666, defaultEncoding: 'utf8', autoClose: true});
  let totalLength = 0;
  // Start a buffer, convert to json and write to new file
  function doIt(){
    recreate.makeJson("cache/info.txt", function(jsonlines){
      let buffersource = Buffer.from(jsonlines);
      totalLength += buffersource.length;
      updJfile(totalLength,buffersource);
    });
  }
  function updJfile(length,buff){
    jfile = fs.createWriteStream('db/gpd.json', {flags: 'a', start: totalLength, defaultEncoding: 'utf8', autoClose: true});
    fillFile(jfile,buff);
  }
  function fillFile(myfile,jsonobj){
    myfile.write(jsonobj,'utf8', function() {
    //console.log(jsonobj);
    myfile.close();
    });
  }
  //Download the new file
downloadr.download('https://www.google.com/basepages/producttype/taxonomy-with-ids.en-US.txt','cache/info.txt',function(err){
    if (err) {
      console.log(err);
    }
    doIt();
    fs.unlink('cache/info.txt', function(err){
    if (err) {
      console.log("The file doesn't exist");
    }
      console.log("Cleaned up file.");
  });
});
}
