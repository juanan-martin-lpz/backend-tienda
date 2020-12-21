const Usuarios = require('../modelos/usuarios-mongoose.js');
const ObjectId = require('mongoose').Types.ObjectId;


let Validator = require('validatorjs');
Validator.useLang('es');

exports.listarUsuarios = function() {

  return new Promise( function(accept, reject) {

    try {

      Usuarios.find({})
        .then(results => {
          accept(results);
        })
        .catch( err => {
          reject(err);
        });
    }
    catch ( me ) {
      reject(me.message);
    }

  });
};


exports.buscarUsuarios = function(criterio) {

  return new Promise( function(accept, reject) {

    try {
      Usuarios.find(criterio)
        .then(results => {
          accept(results);
        })
        .catch( err => {
          reject(err);
        });
    }
    catch ( me ) {
      reject(me.message);
    }

  });
};

exports.buscarUsuario = function(id) {

  return new Promise( function(accept, reject) {

      Usuarios.findById(id)
        .then(usuario => {
          accept(usuario);
        })
        .catch(me => {
          reject(me.message);
        });
  });


};

// Funciones para la Cesta del Usuario

exports.getCestaUsuario = function(id) {

  return new Promise( function(accept, reject) {
      Usuarios.findById(id)
        .then(usuario => {
          accept(usuario.cesta || []);
        })
        .catch(me => {
          reject(me.message);
        });
  });
}


exports.putCestaUsuario = function(id, cesta) {

    return new Promise( function(accept, reject) {

      let _id;

      try {
         _id = new ObjectId(id);
      }
      catch ( e ) {
        reject('El Id no tiene el formato correcto');
      }

      Usuarios.findOneAndUpdate(
        { _id: id } ,
        {
          cesta: cesta
        })
        .then(resultado => {

          accept(resultado.cesta);

        })
        .catch(err => {
          console.log(err);

          reject(err);
        });
    })
    .catch ( errors => {
      reject({status: false, validacion: true, errors});
    });
}
//




function usuarioNoExiste(usuario) {

      return new Promise( function(accept, reject) {

        Usuarios.findOne({ login: usuario.login })
          .then(resultado => {
            if (resultado) {
              reject('El Login ya existe');
            }
            else {
              accept(usuario);
            }
          })
          .catch( error => {
            reject(error);
          });
      });
};

function validarNuevoUsuario(usuario) {

    return new Promise( function(accept, reject) {

      // Reglas de validacion
      let reglas = {
        nombre: 'required',
        login: 'required|min:4',
        password: 'required|min:8',
        email: 'required|email',
        rol: ['required', 'regex:/(CLIENTE|EMPLEADO|ADMIN)/']
      };

      // Validamos
      let validar = new Validator(usuario, reglas);

      if (validar.fails()) {
        // Hay errores, rechazamos la promesa y devolvemos los errores
        reject(validar.errors.all());
      }
      else {
        accept(usuario);
      }

    });
};

function validarUsuarioExistente(usuario) {

    return new Promise( function(accept, reject) {

      // Reglas de validacion
      let reglas = {
        nombre: 'required',
        apellidos: 'required',
        email: 'required|email',
        telefono: 'required',
        direccion: 'required|min:5',

      };

      // Validamos
      let validar = new Validator(usuario, reglas);

      if (validar.fails()) {
        // Hay errores, rechazamos la promesa y devolvemos los errores
        reject(validar.errors.all());
      }
      else {
        accept(usuario);
      }

    });
};


exports.insertarUsuario = function(usuario) {

  return new Promise( function(accept, reject) {

    usuarioNoExiste(usuario)
      .then(user => {
        validarNuevoUsuario(user)
          .catch(errores => {
            reject(errores);
          });
      })
      .then(u => {

        let usr = new Usuarios();

        usr.nombre = u.nombre;
        usr.apellidos = u.apellidos;
        usr.login = u.login;
        usr.password = u.password;
        usr.telefono = u.telefono;
        usr.rol = u.rol;
        usr.direccion = u.direccion;
        usr.telefono = u.telefono;
        usr.imagen = u.imagen;
        usr.email = u.email;
        usr.idioma = u.idioma;

        return usr.save();
      })
      .then(resultado => {
        // Resolvemos la promesa
        accept(resultado);
      })
      .catch ( errors => {
        reject(errors);
      });

  });
};

exports.modificarUsuario = function(id, usuario) {

    return new Promise( function(accept, reject) {

      let _id;

      try {
         _id = new ObjectId(id);
      }
      catch ( e ) {
        reject('El Id no tiene el formato correcto');
      }

      validarUsuarioExistente(usuario)
        .then( usr => {
          // Guardamos los datos
          Usuarios.findOneAndUpdate(
            { _id: id } ,
            {
              nombre: usr.nombre,
              apellidos: usr.apellidos,
              email: usr.email,
              telefono: usr.telefono,
              //login: usuario.login,
              //password: usuario.password,
              //imagen: usr.imagen,
              idioma: usr.idioma,
              direccion: usr.direccion
            })
            .then(resultado => {

              accept(resultado);

            })
            .catch(err => {
              console.log(err);

              reject(err);
            });
        })
        .catch ( errors => {
          reject({status: false, validacion: true, errors});
      });
  });



};

exports.borrarUsuario = function(id) {

  return new Promise( function(accept, reject) {

    let _id;

    try {
      _id = new ObjectId(id);
    }
    catch ( e ) {
      reject('El Id no tiene el formato correcto');
    }

    Usuarios.findByIdAndDelete(id)
      .then(resultado => {

        if (resultado) {
          accept(resultado);
        }
        else {
          reject('No existe un Usuario con el ID especificado');
        }

      })
      .catch(error => {
        reject(error);
      });
  });
};

exports.validarNuevoUsuario = validarNuevoUsuario;
exports.validarUsuarioExistente = validarUsuarioExistente;
exports.usuarioNoExiste = usuarioNoExiste;
