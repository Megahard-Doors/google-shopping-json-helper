'use strict'
const fs = require('fs');
const readline = require('readline');
//const streamr = require('../streamr');
exports.makeJson = function(file,cb) {
const rl = readline.createInterface({
    input: fs.createReadStream(file)
});
let count = 0;
rl.on('line', (line) => {
    editLine(line);
})
.on('close', (line) => {
  console.log("Finished gpd.json with " + count + " entries.");
  return cb("]");
});
  let editLine = (line) => {
      if (count == 0) {
        count += 1;
        return cb("[\n");
      }
      count += 1;
      let strippedN = line.match(/\d/g);
      let strippedW = line.match(/[A-Ö&>\s-]/g);
      let total, totalW = "";
      if (strippedN && count >= 1) {
      total = "";
      strippedN.forEach(function(item){
        total += item;
      });
      strippedW.forEach(function(witem){
        totalW += witem;
      });
      // Strip space - space
      totalW = totalW.substring(3);
      // Return this to object as JSON
      let jObject = {
        id: parseInt(total),
        path: totalW
      }
      let myvalue = JSON.stringify(jObject);
      // Last object ID in the list to make the json format complete.
      if (jObject.id == 5644) {
        return cb(myvalue + "\n");
      }
      return cb(myvalue + ",\n");
      }
      rl.close();
    }
}
