const fs = require('fs');
const stream = require('stream');
exports.copy = function(filepath,options,readsize) {
  // X holds filename, including full path.
  // __dirname + "filename.txt"
  let x = filepath;
  // Y holds options, as an object.
  // https://nodejs.org/api/fs.html#fs_fs_createreadstream_path_options
  let y = options;
  // z holds amount of bytes read, as an integer.
  let z = 0;
  let r = readsize;
  // Fallback to default options if not specified.
  if (!y) {
    y = {
      // r, r+, rs+, w, wx, w+, wx+, a, ax, a+, ax+
      // https://nodejs.org/api/fs.html#fs_fs_open_path_flags_mode_callback
    	flags: 'r',
      // ascii, utf8, utf16le, ucs2, base64, latin1, binary, hex
      // https://nodejs.org/api/buffer.html#buffer_buffers_and_character_encodings
    	encoding: 'ascii',
      // Sets the chmod, file permission, if the file was created.
      mode: 0o666,
      // Overwrite specified filepath with fd. Do not change.
    	fd: null,
      // true, false
    	autoClose: true
    }
  }
  // Fallback to default readsize if not specified.
  if (!r) {
    r = 16384;
  }
  // Write to destination file.
  const mws = (chunk,q) => {
    let textHold = chunk.toString('utf8');
    if (y.fd) {
      console.log("Writing to " + y.fd);
      let ftw = fs.createWriteStream(y.fd,{flags:'w', start: q});
      ftw.write(textHold,'utf8', cCall(textHold));
    }
    if (!y.fd) {
      cCall(textHold);
    }
  }
  // Callback to confirm content in console.log
  const cCall = (textHold) => {
    console.log(textHold);
  }
  // Create a readable stream.
  const file = fs.createReadStream(x,y);
  // If file is readable, read it until end of file.
  file.on('readable', () => {
    while(chunk = file.read(r)) {
      mws(chunk,z);
      z += chunk.length;
    }
  });
  file.on('end', () => {
    if (y.fd) {
      console.log("Copied all " + z + " bytes from " + x + " to " + y.fd);
    }
    else {
      console.log(x + " is " + z + " bytes");
    }
  });
  file.on('error', () => {
    console.log("file.on error");
  });
}
