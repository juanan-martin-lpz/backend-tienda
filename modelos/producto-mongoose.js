const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var producto = new Schema({
  referencia: { type: String, required: true },
  categoria: { type: String, required: true },
  nombre: { type: String, required: true  },
  fabricante: { type: String, required: true  },
  descripcion: { type: String  },
  imagen: { type: String },
  existencias: { type: Number, min: 0 },
  precio: { type: Number, min: 0 }
});

producto.index({referencia: 1, type: 1}, { unique: true });
producto.index({categoria: 1, type: 1});
producto.index({fabricante: 1, type: 1});

producto.index({ fabricante: 'text',
                 nombre: 'text',
                 descripcion: 'text'});

producto.index({existencias: 1, type: 1});

var Producto = mongoose.model('Producto', producto);

module.exports = Producto;
