const datas = require('./gpd.json');
exports.singleData = function(userinput) {
  let x = parseInt(userinput);
  // Return the ID if input is a string
  if (x === "NaN") {
    let f = userinput;
    console.log("x: " + f + " " + typeof x);
    //console.log("Database length: " + datas.length);
    for (i = 0; i < datas.length; i++) {
      if (datas[i].path == f) {
        //console.log("Found at: " + i)
        return datas[i].id
      }
    }
        return false
  }
  //Return the path if input is a number
  //console.log("It started");
  if (x !== "NaN") {
    let f = parseInt(x);
    console.log("Input was an id (number): " + f);
    //console.log("Database length: " + datas.length);
    for (i = 0; i < datas.length; i++) {
      if (datas[i].id == f) {
        //console.log("Found at: " + i)
        return datas[i].path
      }
    }
        return false
  }
// End
return "You must supply an id as an integer or a path as a string."
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
      c.push(datas[key].path)
      if (c.length > 10) {
        return c
      }
    }
    return c
  }
  else {
    return "allData only accepts raw or compact as argument. Supply help as the argument for a sample list of valid inputs."
  }
}
