const express = require('express');
const router = express.Router();
const key = require('../key/key.js');

const jwt = require('jsonwebtoken');

const negocio = require('../negocio/login.js');

router.post('/', (req, res) => {

  let login = req.body.login;
  let password = req.body.password;

  // Validamos por la capa de negocio y generamos el token

  negocio.login(login, password)
    .then((usuario) => {

      if (usuario) {

        let token = jwt.sign({ nombre: usuario.nombre, apellidos: usuario.apellidos, login: usuario.login, rol: usuario.rol, email: usuario.email, idioma: usuario.idioma }, key.privateKey, { algorithm: 'RS256'} );

        usuario.password = null;
        //
        res.status(200).json({
          status: true,
          usuario: usuario,
          token: token
        });
      }
      else {
        res.status(401).json({
          status: false,
          error: "Las credenciales proporcionadas no son validas"
        });
      }
    })
    .catch( error => {
      res.status(500).json({
        status: false,
        error: error
      });
    });
});

module.exports = router;
