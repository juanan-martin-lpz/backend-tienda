const Pedido = require('../modelos/pedido-moongoose.js');
const ObjectId = require('mongoose').Types.ObjectId;


let Validator = require('validatorjs');
Validator.useLang('es');

exports.listarPedidos = function() {

    return new Promise( function(accept, reject) {

    try {

      Pedido.find({})
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


exports.buscarPedidoById = function(id) {

  return new Promise( function(accept, reject) {

    try {

      Pedido.findById(id)
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

exports.buscarPedidoByCliente = function(cliente) {

  return new Promise( function(accept, reject) {

    try {

      Pedido.findOne({ "cliente._id": cliente  })
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

function pedidoNoExiste(pedido) {


      return new Promise( function(accept, reject) {

        if (pedido._id === undefined ) {
          accept();
          return;
        }

        Pedido.findOne({ _id: pedido._id, "cliente._id": pedido.cliente._id, estado: { $ne: "CONFIRMADO" } })
          .then(resultado => {
            if (resultado) {
              reject('Ya existe un pedido en curso para este cliente');
            }
            else {
              accept();
            }
          })
          .catch( error => {
            reject(error);
          });
      });
}

exports.insertarPedidos = function(pedido) {


  return new Promise( function(accept, reject) {

    pedidoNoExiste(pedido)
      .then(() => {
        let ped = new Pedido(pedido);

        ped.estado = "GUARDADO";

        console.log(ped);

        return ped.save();
      })
      .then(resultado => {
        accept(resultado);
      })
      .catch ( () => {

        Pedido.findByIdAndUpdate(pedido._id, pedido)
          .then(resultado => {
            console.log(resultado);

            accept(resultado);
          })
          .catch(errors => reject(errors));
      });

  });
};


exports.aceptarPedidos = function(pedido) {

};


exports.modificarPedidos = function(pedido) {

};


exports.borrarPedidos = function(id) {

};
