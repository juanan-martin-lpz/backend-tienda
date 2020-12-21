//
const { Direccion } = require('./direccion');

class Usuarios {

  constructor( _id, nombre, apellidos, login, password, email, telefono, rol, imagen, idioma, direccion ) {

    this._id = _id;
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.login = login;
    this.password = password;
    this.email = email;
    this.telefono = telefono;
    this.imagen = imagen;
    this.rol = rol;
    this.idioma = idioma;
    this.direccion = direccion;
    this.cesta = [];
    this.historicoCesta = [];
  }
}

module.exports.Usuarios = Usuarios;
