const express = require('express');
const router = express.Router();

const tools = require('../lib/tools.js');
const checkToken = require('../interceptores/token.js').checkToken;

const negocio = require('../negocio/productos');
const Producto = require('../modelos/producto-mongoose.js');

router.get('/', (req, res) => {

  if (Object.keys(req.query).length > 0 ) {
    let q = {};

    for (let p in req.query) {

      if (p != 'existencias' || p != 'precio') {
        q[p] = req.query[p];
      }
      else {
        q[p] = parseFloat(req.query[p]);
      }
    }

    negocio.buscarProductos(q)
      .then( productos => {
        return res.status(200).json({
          status: true,
          productos: productos
        });
      })
      .catch( err => {
        return res.status(500).json({
          error: err
        });
      });
  }
  else {
    negocio.listarProductos()
      .then( productos => {
        res.status(200).json({
          status: true,
          productos: productos
        });
      })
      .catch( err => {
        res.status(500).json({
          error: err
        });
      });
  }
});


router.get('/:id', (req, res) => {

  let id = req.params.id;

  negocio.buscarProductoPorId(id)
    .then( producto => {
      res.status(200).json({
        status: true,
        producto: producto
      });
    })
    .catch( err => {
      res.status(500).json({
        error: err
      });
    });
});

router.get('/:campo/:valor', (req, res) => {

  let campo = req.params.campo;
  let valor = req.params.valor;


  if (campo == '_id') {

    try {

      valor = new mongodb.ObjectId(req.params.valor);

    }
    catch (ex) {
      res.status(500).json({
        error: 'El Id especificado no es valido'
      });
    }
  }

  let criterio = {};

  criterio[campo] = valor;


  negocio.buscarProducto(criterio)
    .then( producto => {
      res.status(200).json({
        status: true,
        producto: producto
      });
    })
    .catch( err => {
      res.status(500).json({
        error: err
      });
    });
});

router.post('/', checkToken, (req, res) => {

  let producto = req.body;

  /*
  if (!tools.checkBody(Producto, producto)) {
    return res.status(404).json({
      status: false,
      error: 'Formato de registro invalido'
    });
  }
  */

  //let usuario = new Usuarios( null,body.nombre, body.apellidos, body.login, body.password, body.email, body.telefono,  body.rol, body.imagen, body.idioma);

  negocio.insertarProducto(producto)
    .then( respuesta => {
      res.status(200).json({
        status: true,
        producto: respuesta
      });
    })
    .catch( err => {
      res.status(500).json({
        status: false,
        error: err
      });
    });
});

router.put('/:id', checkToken, (req, res) => {


  let id = req.params.id;
  let producto = req.body;

  if (!id) {
      res.status(404).json({
        errors: 'Id de Usuario no valido'
      });
  }

  /*
  if ( body._id != id ) {
    res.status(400).json({
      status: false,
      errors: "Datos invalidos"
    });

    return;
  }

  if ( body.rol == 'CLIENTE' && body._id != id ) {
    res.status(401).json({
      status: false,
      errors: "No tiene permisos para la operacion"
    });

    return;
  }
  */

  negocio.modificarProducto(id, producto)
    .then( respuesta => {
      if (respuesta) {

        res.status(200).json({
          status: true,
          producto: respuesta
        });
      }
      else {
        res.status(404).json({
          error: 'No se encuentra Producto con el ID especificado'
        });
      }
    })
    .catch( err => {
      res.status(500).json({
        errors: err
      });
    });
});

router.delete('/:id', checkToken, (req, res) => {

  let id = req.params.id;

  negocio.borrarProducto(id)
    .then( respuesta => {
      if (respuesta) {
        res.status(200).json({
          status: true,
          producto: respuesta
        });
      }
      else {
        res.status(404).json({
          status: false,
          errors: 'No se encuentra Producto con el ID especificado'
        });
      }
    })
    .catch( err => {
      res.status(500).json({
        errors: err
      });
    });
});


module.exports = router;
