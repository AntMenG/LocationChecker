// Example model
const thinky = require('../../config/thinky');
const r = thinky.r;
const type = thinky.type;

const Horario = thinky.createModel('Horario', {
  usuario_id: String,
  hora: String,
  dia: String,
  edificio: String
});

module.exports = Horario;

var Usuario = require('./usuario');
Horario.belongsTo(Usuario, "usuario", "usuario_id", "id");