var fs = require('fs');
const express = require('express');
const router = express.Router();
const models = require('../models');
const Usuario = models.Usuario;
const Edificio = models.Edificio;
const bcrypt = require("bcrypt");

const days = [
  {nombre:'Lunes'},
  {nombre:'Martes'},
  {nombre:'Miércoles'},
  {nombre:'Jueves'},
  {nombre:'Viérnes'}
];

const matutino = [
  {horaI:'7',horaF:'8'},
  {horaI:'8',horaF:'9'},
  {horaI:'9',horaF:'10'},
  {horaI:'10',horaF:'11'},
  {horaI:'11',horaF:'12'},
  {horaI:'12',horaF:'13'},
  {horaI:'13',horaF:'14'}
];

const vespertino = [
  {horaI:'14',horaF:'15'},
  {horaI:'15',horaF:'16'},
  {horaI:'16',horaF:'17'},
  {horaI:'17',horaF:'18'},
  {horaI:'18',horaF:'19'},
  {horaI:'19',horaF:'20'},
  {horaI:'20',horaF:'21'},
];

module.exports = (app) => {
  app.use('/', router);
};

router.get('/', (req, res, next) => {
  var user = req.session.user;
  if (
    (user && user.tipo_usuario == 1) ||
    (user && user.tipo_usuario == 2)
  )
    //Ventana de usuario registrado
    Usuario.run().then((Usuarios) => {
      Edificio.run().then((Edificios) => {
        res.render('home', {
          title: 'LocationChecker',
          Usuarios: Usuarios,
          Edificios: Edificios,
          EdificiosStr: JSON.stringify(Edificios),
          dias: days,
          matutino: matutino,
          vespertino: vespertino,
          user: user
        });
      });
    });
  else
    //Ventana de login
    Edificio.run().then((Edificios) => {
      res.render('index', {
        title: 'LocationChecker',
        EdificiosStr: JSON.stringify(Edificios),
      });
    });
});

router.post('/inicia', (req, res, next) => {
  var params = req.body;
  Usuario.filter({
    uid : Number(params.id)
  }).run().then((usuario) => {
    if (usuario[0])
      bcrypt.compare(params.password, usuario[0].password, (err, response) => {
        if (err)
          res.send("Usuario o contraseña incorrectos");
        if (response) {
          req.session.user = usuario[0];
          res.send("/");
        } else {
          res.send("Usuario o contraseña incorrectos");
        }
      });
    else
      res.send("El usuario no existe");
  }).catch((err) => {
    res.send("No existe");
  });
});

router.post('/photo', (req, res, next) => {
  if(req.session.user) {
    var img = req.body.image;
    var data = img.replace(/^data:image\/\w+;base64,/, "");
    var buf = new Buffer(data, 'base64');
    var id_u = req.session.user.id;
    fs.writeFileSync(`public/upload/user_pic/${id_u}.jpg`, buf);
    Usuario.get(id_u)
    //.getJoin()
    .run().then(function(user) {
      user.photo = true;
      req.session.user.photo = true;
      user.saveAll().then(function(user) {
        res.send("Listo");
      }).catch(function(error){
        res.send(error);
        console.log(error);
      });

    });
  } else {
    res.send("Error");
  }
});

router.post('/cs', (req, res, next) => {
  req.session.destroy((err) => {
    res.send("");
  })
});



router.get('/test', (req, res, next) => {
  Usuario.filter({uid:15090369})
  .getJoin()
  .run().then(function(user) {
      res.send(
        JSON.stringify(user)
      );
  });
});