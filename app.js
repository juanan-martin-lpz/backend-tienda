// Requires
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./db/conexionBD');

const checkToken = require('./interceptores/token.js').checkToken;
const key = require('./key/key');

key.readKey();

function startServer() {
  // Inicializar variables
  const app = express();

  // CORS
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
  });


  app.disable('x-powered-by');

  // Body Parser
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use(cors());


  // Importar rutas
  var usuariosRoutes = require('./rutas/usuarios');
  var storeRoutes = require('./rutas/store');
  var productosRoutes = require('./rutas/productos');
  var pedidosRoutes = require('./rutas/pedidos.js');
  var loginRoutes = require('./rutas/login');

  //app.use(checkToken);

  // Rutas
  app.use('/login', loginRoutes);
  app.use('/usuarios', checkToken, usuariosRoutes);
  app.use('/store', checkToken);  // Faltan las rutas
  app.use('/productos', productosRoutes);  // Faltan las rutas
  app.use('/pedidos', checkToken, pedidosRoutes);  // Faltan las rutas
  app.use('/store/catalog', storeRoutes);  // Faltan las rutas

  // Escuchar peticiones
  app.listen(3000, () => {
    console.log('Express server puerto 3000: \x1b[32m%s\x1b[0m', 'online');
  });

}

db.conectarBBDD(startServer);
