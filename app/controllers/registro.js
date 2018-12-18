const express = require('express');
const router = express.Router();
const models = require('../models');
const Usuario = models.Usuario;
const Horario = models.Horario;
const Edificio = models.Edificio;
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = (app) => {
    app.use('/', router);
};

/*
  Usuario.filter({
    uid : 1
  }).run().then((usuario) => {
    if (usuario[0])
      res.send(`{
        "status" : "err",
        "text" : "Error usuario ya existe"
      }`);
    else

  }).catch((err) => {
    res.send("Error interno");
  });
*/

router.get('/insert', (req, res, next) => {  
  Usuario.filter({
    uid : 1
  }).run().then((usuario) => {
    if (usuario[0])
      res.send(`{
        "status" : "err",
        "text" : "Error usuario ya existe"
      }`);
    else
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
  }).catch((err) => {
    res.send("Error interno");
  });
});

router.post('/registra', (req, res, next) => {
    var params = req.body;
    Usuario.filter({
      uid : Number(params.id)
    }).run().then((usuario) => {
      if (usuario[0])
        res.send(`{
          "status" : "err",
          "text" : "Error usuario ya existe"
        }`);
      else
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
      }).catch((err) => {
        res.send("Error interno");
      });
  });



router.post('/registraEdificio', (req, res, next) => {
  let params = req.body;
  let nombre = params.nombre,
      coordenadas = JSON.parse(params.coordenadas);
  Edificio.filter({
    nombre : nombre
  }).run().then((usuario) => {
    if (usuario[0])
      res.send(`{
        "status" : "err",
        "text" : "Error el edificio ${nombre} ya existe"
      }`);
    else
      if (nombre && coordenadas) {
        var registra = new Edificio({
          nombre,
          coordenadas
        });
        registra.saveAll().then((edificio) => {  
          res.send(`{
            "status" : "done",
            "text" : "¡¡¡Edificio ${edificio.nombre} registrado!!!",
            "id" : "${edificio.id}"
          }`);
        }).catch((err) => {
          res.send(`{
            "status" : "err",
            "text" : "¡¡¡Error!!!"
          }`);
        });
      } else {
        res.send(`{
          "status" : "err",
          "text" : "Debes enviar todos los datos"
        }`);
      }
    }).catch((err) => {
      res.send("Error interno");
    });
});

router.post("/modificaEdificio", (req, res, next) => {
  let params = req.body;
  Edificio.get(params.id).run().then((edificio) => {
    edificio.nombre = params.nombre;
    edificio.saveAll().then((edificio) => {  
      res.send(`{
        "status" : "done",
        "text" : "¡¡¡Edificio ${edificio.nombre} modificado!!!",
        "id" : "${edificio.id}"
      }`);
    }).catch((err) => {
      res.send(`{
        "status" : "err",
        "text" : "¡¡¡Error!!!"
      }`);
    });
  }).catch((err) => {
    res.send(`{
      "text" : ${err}
    }`);
    console.log(err);
  });
});

router.post("/eliminaEdificio", (req, res, next) => {
  var params = req.body;
  Edificio
  .get(params.id)
  .run()
  .then(function(edificio) {
    edificio.deleteAll().then(function(result) {
      res.send(`{
        "status" : "done",
        "text" : "Edificio Eliminado"
      }`);
    });
  });
});