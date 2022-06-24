//defino controlador para el manejo de CRUD
const oficinaCtrl = require('./../controllers/oficina.controller');
//creamos el manejador de rutas
const express = require('express');
const router = express.Router();
//definimos las rutas para la gestion de agente
router.get('/', oficinaCtrl.getOficinas);
router.post('/', oficinaCtrl.createOficina);
router.get('/:id', oficinaCtrl.getOficina);
router.put('/:id', oficinaCtrl.editOficina);

//exportamos el modulo de rutas
module.exports = router;