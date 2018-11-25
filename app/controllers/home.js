const express = require('express');
const router = express.Router();
const models = require('../models');
const Usuario = models.Usuario;
const bcrypt = require("bcrypt");
const session = require('express-session')
const saltRounds = 10;

module.exports = (app) => {
  app.use('/', router);
};

router.use(session({
  secret: 'buzzardTuTesh',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: false,
    maxAge: false
  }
}));

router.get('/insert', (req, res, next) => {
  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash('12tesh', salt, (err, hash) => {
      var registra = new Usuario({
        id: 1,
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
  if (user && user.tipo_usuario == 1)
    //Ventana de usuario registrado
    Usuario.run().then((Usuarios) => {
      res.render('home', {
        title: 'LocationChecker',
        Usuarios: Usuarios,
        user: user
      });
    });
  else
    //Ventana de login
    res.render('index', {
      title: 'LocationChecker'
    });
});

router.get('/registro', (req, res, next) => {
  Usuario.run().then((Usuarios) => {
    res.render('registro', {
      title: 'LocationChecker | registro',
      Usuarios: Usuarios
    });
  });
});

router.post('/registra', (req, res, next) => {
  var params = req.body;
  if (params.id && params.nombre && params.apellido && params.password)
    bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(params.password, salt, (err, hash) => {
        var registra = new Usuario({
          id: params.id,
          nombre: params.nombre,
          apellido: params.apellido,
          password: hash
        });
        registra.saveAll().then((usuario) => {
          res.send("Registrado!!!");
        }).catch((err) => {
          res.send("Error al registrar");
        });
      });
    });
  else
    res.send("Debes enviar todos loos datos");
});

router.post('/inicia', (req, res, next) => {
  var params = req.body;
  Usuario.filter({
    id : Number(params.id)
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
})

router.post('/cs', (req, res, next) => {
  req.session.destroy((err) => {
    res.send("");
  })
})