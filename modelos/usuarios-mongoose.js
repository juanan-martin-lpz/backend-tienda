const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

var articulo = new Schema({
  _id: { type: ObjectId },
  referencia: { type: String, required: true },
  nombre: { type: String, required: true  },
  fabricante: { type: String, required: true  },
  imagen: { type: String },
  precio: { type: Number, min: 0 },
});


var cesta = new Schema({
  articulo: { type: articulo },
  cantidad: { type: Number, min: 0 },
  descuento_linea: { type: Number, min: 0 },
  total_linea: { type: Number, min: 0 }
});


var usuario = new Schema({
  nombre: { type: String  },
  apellidos: { type: String  },
  login: { type: String  },
  password: { type: String  },
  email: { type: String  },
  telefono: { type: String },
  imagen: { type: String },
  rol: { type: String  },
  idioma: { type: String  },
  direccion: { type: String },

  // Cesta
  cesta: [cesta],
  // Historico -> Fase 2
  historicoCesta: [cesta]
});

var Usuario = mongoose.model('Usuario', usuario);

module.exports = Usuario;
