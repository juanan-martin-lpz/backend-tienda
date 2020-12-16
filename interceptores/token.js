const jwt = require('jsonwebtoken');
const key = require('../key/key');

exports.checkToken = function(request, response, next) {

  if (request.method.toUpperCase() == 'OPTIONS') {
    next();
    return;
  }


  let autorizacion = request.headers.authorization;

  console.log(autorizacion);

  if (!autorizacion) {
    response.status(401).json({
      status: false,
      error: 'Autorizacion no valida'
    });

    return;
  }

  let tokens = autorizacion.split(' ');

  if (tokens.length != 2 || tokens[0] != 'Bearer') {

    response.status(401).json({
      status: false,
      error: 'Autorizacion no valida'
    });

    return;
  }

  // Verificar
  let token = tokens[1];

  jwt.verify(token, key.privateKey,{ algorithms: ['RS256']}, (err, decoded) => {
    if (err) {
      console.log('error');

      response.status(401).json({
        status: false,
        error: 'Autorizacion no valida : ' + err
      });

      return;
    }


    // Last step
    next();

  });
};
