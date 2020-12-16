const express = require('express');
const router = express.Router();
const mongodb = require("mongodb");

const tools = require('../lib/tools.js');

const negocio = require('../negocio/usuarios');

const checkToken = require('../interceptores/token.js').checkToken;

const { Usuarios } = require('../modelos/usuarios');

router.get('/', checkToken, (req, res) => {

  negocio.listarUsuarios()
    .then( usuarios => {
      res.status(200).json({
        status: true,
        usuarios: usuarios
      });
    })
    .catch( err => {
      res.status(500).json({
        error: err
      });
    });
});


router.get('/:id', checkToken, (req, res) => {

  let id = req.params.id;

  negocio.buscarUsuario(id)
    .then( usuario => {
      res.status(200).json({
        status: true,
        usuario: usuario
      });
    })
    .catch( err => {
      res.status(500).json({
        error: err
      });
    });
});

// Rutas para la cesta del usuario -----------------------------------

router.get('/:id/cesta', checkToken, (req, res) => {
  let id = req.params.id;

  negocio.getCestaUsuario(id)
    .then( cesta => {
      res.status(200).json({
        status: true,
        cesta: cesta
      });
    })
    .catch( err => {
      res.status(500).json({
        error: err
      });
    });
});

router.put('/:id/cesta', checkToken, (req,res) => {

  let id = req.params.id;
  let body = req.body;

  if (!id) {
      res.status(404).json({
        errors: 'Id de Usuario no valido'
      });
  }

  negocio.putCestaUsuario(id, body)
    .then( respuesta => {
      if (respuesta) {
        res.status(200).json({
          status: true,
          cesta: respuesta
        });
      }
      else {
        res.status(404).json({
          error: 'No se encuentra Usuario con el ID especificado'
        });
      }
    })
    .catch( err => {
      res.status(500).json({
        errors: err
      });
    });

});

// --------------------------------------------------------------------


router.get('/:campo/:valor', checkToken, (req, res) => {

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


  negocio.buscarUsuarios(criterio)
    .then( usuarios => {
      res.status(200).json({
        status: true,
        usuarios: usuarios
      });
    })
    .catch( err => {
      res.status(500).json({
        error: err
      });
    });
});

router.post('/', (req, res) => {

  let body = req.body;


  if (!tools.checkBody(Usuarios, body)) {
    return res.status(404).json({
      status: false,
      error: 'Formato de registro invalido'
    });
  }


  let usuario = new Usuarios( null,body.nombre, body.apellidos, body.login, body.password, body.email, body.telefono,  body.rol, body.imagen, body.idioma);


  negocio.insertarUsuario(usuario)
    .then( respuesta => {
//      console.log(respuesta);

      res.status(200).json({
        status: true,
        usuario: respuesta
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
  let body = req.body;

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

  let usuario = new Usuarios( id,body.nombre, body.apellidos, body.login, body.password, body.email, body.telefono, body.rol, body.imagen, body.idioma, body.direccion);

  negocio.modificarUsuario(id, usuario)
    .then( respuesta => {
      if (respuesta) {

        respuesta.password = null;

        res.status(200).json({
          status: true,
          usuario: respuesta
        });
      }
      else {
        res.status(404).json({
          error: 'No se encuentra Usuario con el ID especificado'
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

  negocio.borrarUsuario(id)
    .then( respuesta => {
      if (respuesta) {
        res.status(200).json({
          status: true,
          usuario: respuesta
        });
      }
      else {
        res.status(404).json({
          status: false,
          errors: 'No se encuentra Usuario con el ID especificado'
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
