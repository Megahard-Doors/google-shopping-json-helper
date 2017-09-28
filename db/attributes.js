const datas = require('./datas.json');
exports.singleData = function(name,attribute) {
  let x = name
  let y = attribute
  //console.log(typeof x)
  //console.log(typeof y)
  if (typeof x === "string") {
    for(key in datas) {
      if (key === x) {
        //console.log("Entry found: " + key)
        if (typeof y === "string") {
          for(key in datas[x]) {
            if (key === y) {
              //console.log("Sub-entry for " + x + " found :)")
              return datas[x][key]
            }
          }
          return "No sub-entry for " + x + "." + y + " found :("
        }
        return datas[key]
      }
    }
    return "No entry for " + x +" found."
  }
  else {
    return "singleData failed. You need to supply an attribute name (string) as the first argument."
  }
}
exports.allData = function(version) {
  let v = version.toLowerCase()
  if (v === "raw") {
    return datas
  }
  if (v === "compact") {
    let z = JSON.stringify(datas)
    return z
  }
  if (v === "help") {
    let c = []
    for(key in datas) {
      c.push(key)
    }
    return c
  }
  else {
    return "allData only accepts raw or compact as argument. Supply help as the argument for guidance."
  }
}
/*const records = [
    { id: 1, username: 'jack', password: 'secret', displayName: 'Jack', emails: [ { value: 'jack@example.com' } ] }
  , { id: 2, username: 'jill', password: 'birthday', displayName: 'Jill', emails: [ { value: 'jill@example.com' } ] }
];

exports.findById = function(id, cb) {
  process.nextTick(function() {
    let idx = id - 1;
    if (records[idx]) {
      cb(null, records[idx]);
    } else {
      cb(new Error('User ' + id + ' does not exist'));
    }
  });
}

exports.findByUsername = function(username, cb) {
  process.nextTick(function() {
    for (var i = 0, len = records.length; i < len; i++) {
      var record = records[i];
      if (record.username === username) {
        return cb(null, record);
      }
    }
    return cb(null, null);
  });
}
*/
