//const mongoDB = require("mongodb");
const mongoose = require('mongoose');

exports.conectarBBDD = function(callback) {

  //let url1 = "mongo-replica-svc-a:27017";
  //let url2 = "mongo-replica-svc-b:27017";
  //let url3 = "mongo-replica-svc-c:27017";

  let url1 = "172.18.0.10";
  let url2 = "172.18.0.11";
  let url3 = "172.18.0.12";

  //mongodb://mongo-replica-svc-a:27017,mongo-replica-svc-b:27017,mongo-replica-svc-c:27017/your_db?replicaSet=my_replica_set

  let url = `mongodb://${url1},${url2},${url3}/gestiontienda?replicaSet=local-rs`;
  //let url = `mongodb://${url2}:27017`;
  //'db' es un objeto que representa al servidor MongoDB

// Conexión a la base de datos
  mongoose.connect(url, { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true }) //function(error, dbs){
    .then(() => {

      mongoose.set('returnOriginal', false);

      console.log('Base de Datos: \x1b[32m%s\x1b[0m', 'online');
      callback();
    })
    .catch(error => {
      console.log(error);
      return;
    });
};


