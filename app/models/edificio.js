const thinky = require('../../config/thinky');
const r = thinky.r;
const type = thinky.type;

const Edificio = thinky.createModel('Edificio', {
  nombre: String,
  coords: []
});

module.exports = Edificio;

// example on how to add relations
// var Comment = require('./comment');
// Edificio.hasMany(Comment, 'comments', 'id', 'Usuario_id');

