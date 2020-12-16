const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ObjectId = mongoose.Types.ObjectId;

var pedido = new Schema({
  cliente: {
    _id: { type: ObjectId },
    nombre: { type: String },
    apellidos: { type: String },
    email: { type: String },
    telefono: { type: String },
    direccion: { type: String }
  },
  fecha: { type: Date },
  direccion: { type: String },
  estado: { type: String },
  lineas: [{
    articulo: {
      _id: {type: ObjectId},
      referencia: { type: String, required: true },
      nombre: { type: String, required: true  },
      fabricante: { type: String, required: true  },
      descripcion: { type: String  },
      precio: { type: Number, min: 0 }
    },
    _cantidad: { type: Number },
    _descuento_linea: { type: Number },
    _total_linea: { type: Number }
  }],
  descuento_comercial: {type: Number},
  iva: { type: Number},
  total_pedido: { type: Number }
});


var Pedido = mongoose.model('Pedido', pedido);

module.exports = Pedido;
