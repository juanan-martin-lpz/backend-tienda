const fs = require('fs');

// Generamos el token con la informacion necesaria y devolvemos el token

let key = '';

function readKey() {
  fs.readFile('./key/my-key.rsa', (err, datos) => {
    if (err) {
      console.log(err);
      return;
    }

    exports.privateKey = datos;
  });
}

exports.privateKey = key;
exports.readKey = readKey;
