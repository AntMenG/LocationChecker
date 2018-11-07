// Example model
const thinky = require('../../config/thinky');
const r = thinky.r;
const type = thinky.type;

const Horario = thinky.createModel('Horario', {
  hora: Date,
  dia: Number,
  edificio: String
});

module.exports = Horario;

// example on how to add relations
// var Comment = require('./comment');
// Horario.hasMany(Comment, 'comments', 'id', 'Horario_id');

