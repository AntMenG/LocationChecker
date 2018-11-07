const thinky = require('../../config/thinky');
const r = thinky.r;
const type = thinky.type;

const Usuario = thinky.createModel('Usuario', {
  id: Number,
  nombre: String,
  apellido: String,
  password: String,
  tipo_usuario: Number,
  phone_id: String,
  carrera: String
});

module.exports = Usuario;

// example on how to add relations
// var Comment = require('./comment');
// Usuario.hasMany(Comment, 'comments', 'id', 'Usuario_id');

