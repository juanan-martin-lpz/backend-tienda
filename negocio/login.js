const Usuarios = require('../modelos/usuarios-mongoose.js');

exports.login = function(login, password) {

  return new Promise(function (accept, reject) {

    Usuarios.findOne({ login: login, password: password })
      .then(resultado => {
        accept(resultado);
      })
      .catch(error => {
        console.log(error);

        reject("Las credenciales proporcionadas no son validas");
      });
  });
};
