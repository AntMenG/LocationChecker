const thinky = require('../../config/thinky');
const r = thinky.r;
const type = thinky.type;

const Edificio = thinky.createModel('Edificio', {
  id: Number,
  nombre: String,
  aula: String
});

module.exports = Edificio;

// example on how to add relations
// var Comment = require('./comment');
// Edificio.hasMany(Comment, 'comments', 'id', 'Usuario_id');
