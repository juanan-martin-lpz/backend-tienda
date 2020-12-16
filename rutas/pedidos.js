const express = require('express');
const router = express.Router();
const negocio = require('../negocio/pedidos.js');

router.get('/', (req, res) => {

  let cliente = req.query.cliente;

  if (cliente) {
    negocio.buscarPedidoByCliente(cliente)
         .then( pedido => {
           res.status(200).json({
             status: true,
             pedido: pedido
           });
         })
         .catch( err => {
           res.status(500).json({
             error: err
           });
         });
  }
  else {
     negocio.listarPedidos()
         .then( pedidos => {
           res.status(200).json({
             status: true,
             pedidos: pedidos
           });
         })
         .catch( err => {
           res.status(500).json({
             error: err
           });
         });
  }

});

router.post('/', (req, res) => {

  let pedido = req.body;

  negocio.insertarPedidos(pedido)
    .then( respuesta => {
      res.status(200).json({
        status: true,
        pedido: pedido
      });
    })
    .catch( err => {
      res.status(500).json({
        status: false,
        error: err
      });
    });

});

router.put('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id/aceptar', (req, res) => {

});

module.exports = router;
