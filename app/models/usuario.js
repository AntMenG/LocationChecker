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

var Horario = require('./horario');
Usuario.hasMany(Horario, 'horarios', 'id', 'usuario_id');

