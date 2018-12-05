var fs = require('fs');
const express = require('express');
const router = express.Router();
const models = require('../models');
const Usuario = models.Usuario;
const Horario = models.Horario;
const bcrypt = require("bcrypt");
const saltRounds = 10;

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

router.get('/insert', (req, res, next) => {
  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash('12tesh', salt, (err, hash) => {
      var registra = new Usuario({
        uid: 1,
        nombre: 'Majocama',
        apellido: 'Sabritas',
        password: hash,
        tipo_usuario: 1
      });
      registra.saveAll().then((usuario) => {
        res.send("Registrado!!!");
      }).catch((err) => {
        res.send("Error al registrar");
      });
    });
  });
});

router.get('/', (req, res, next) => {
  var user = req.session.user;
  if (
    (user && user.tipo_usuario == 1) ||
    (user && user.tipo_usuario == 2)
  )
    //Ventana de usuario registrado
    Usuario.run().then((Usuarios) => {
      res.render('home', {
        title: 'LocationChecker',
        Usuarios: Usuarios,
        dias: days,
        matutino: matutino,
        vespertino: vespertino,
        user: user
      });
    });
  else
    //Ventana de login
    res.render('index', {
      title: 'LocationChecker'
    });
});

router.post('/registra', (req, res, next) => {
  var params = req.body;
  if (params.id && params.nombre && params.apellido && params.tipo_usuario && params.carrera)
    bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(params.id, salt, (err, hash) => {
        var registra = new Usuario({
          uid: params.id,
          password: hash,
          nombre: params.nombre,
          apellido: params.apellido,
          carrera: params.carrera,
          tipo_usuario: params.tipo_usuario
        });
        registra.saveAll().then((usuario) => {
          if (usuario) {
            if (params.horario) {
              params.horario.map(function(a) {
                a.usuario_id = usuario.id;
              })
              console.log(params);
              Horario.save(params.horario).then(function(result) {
                res.send(`{
                  "status" : "done",
                  "text" : "¡¡¡Registrado!!!"
                }`);
              }).error(function(error) {
                res.send(`{
                  "status" : "err",
                  "text" : "Error al registrar horarios"
                }`);
              });
            } else {
              res.send(`{
                "status" : "done",
                "text" : "¡¡¡Registrado!!!"
              }`);
            }
          } else {
            res.send(`{
              "status" : "err",
              "text" : "Error al registrar usuario"
            }`);
          }            
        }).catch((err) => {
          res.send(`{
            "status" : "err",
            "text" : "¡¡¡Error!!!"
          }`);
          console.log(err);
        });
      });
    });
  else
    res.send(`{
      "status" : "err",
      "text" : "Debes enviar todos los datos"
    }`);
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
})