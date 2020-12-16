const Producto = require('../modelos/producto-mongoose.js');
const ObjectId = require('mongoose').Types.ObjectId;


let Validator = require('validatorjs');
Validator.useLang('es');

exports.listarProductos = function() {

  return new Promise( function(accept, reject) {

    try {

      Producto.find({})
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


exports.buscarProductos = function(criterio) {

  return new Promise( function(accept, reject) {

    try {
      console.log(criterio);

      Producto.find(criterio)
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

exports.buscarProductoPorId = function(id) {

  return new Promise( function(accept, reject) {

      Producto.findById(id)
        .then(usuario => {
          accept(usuario);
        })
        .catch(me => {
          reject(me.message);
        });
  });


};


function productoNoExiste(producto) {

      return new Promise( function(accept, reject) {

        Producto.findOne({ referencia: producto.referencia })
          .then(resultado => {
            if (resultado) {
              reject('El Producto ya existe');
            }
            else {
              accept();
            }
          })
          .catch( error => {
            reject(error);
          });
      });
};

function validarNuevoProducto(usuario) {

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

function validarProductoExistente(usuario) {

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


exports.insertarProducto = function(producto) {

  return new Promise( function(accept, reject) {

    productoNoExiste(producto)
      .then(() => {
        let prod = new Producto(producto);
        return prod.save();
      })
      .then(resultado => {
        accept(resultado);
      })
      .catch ( errors => {
        reject(errors);
      });

  });
};

exports.modificarProducto = function(id, producto) {

    return new Promise( function(accept, reject) {

      let _id;

      try {
         _id = new ObjectId(id);
      }
      catch ( e ) {
        reject('El Id no tiene el formato correcto');
      }

      Producto.findOneAndUpdate(
        { _id: id } , producto )
        .then(resultado => {

          accept(resultado);

        })
        .catch(err => {

          reject(err);
        });
});



};

exports.borrarProducto = function(id) {

  return new Promise( function(accept, reject) {

    let _id;

    try {
      _id = new ObjectId(id);
    }
    catch ( e ) {
      reject('El Id no tiene el formato correcto');
    }

    Producto.findByIdAndDelete(id)
      .then(resultado => {

        if (resultado) {
          accept(resultado);
        }
        else {
          reject('No existe un Producto con el ID especificado');
        }

      })
      .catch(error => {
        reject(error);
      });
  });
};

exports.validarNuevoProducto = validarNuevoProducto;
exports.validarProductoExistente = validarProductoExistente;
exports.productoNoExiste = productoNoExiste;
