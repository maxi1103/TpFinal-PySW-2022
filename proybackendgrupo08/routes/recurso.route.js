const recursoCtrl = require('./../controllers/recurso.controller');
//creamos el manejador de rutas
const express = require('express');
const router = express.Router();
//definimos las rutas para la gestion de agente
router.get('/', recursoCtrl.getRecursos);
router.post('/', recursoCtrl.createRecurso);
router.get('/:id', recursoCtrl.getRecurso);
router.put('/:id', recursoCtrl.editRecurso);

//exportamos el modulo de rutas
module.exports = router;