const reunionCtrl = require('./../controllers/reunion.controller');
//creamos el manejador de rutas
const express = require('express');
const router = express.Router();
//definimos las rutas para la gestion de agente
router.get('/', reunionCtrl.getReuniones);
router.post('/', reunionCtrl.createReunion);
router.get('/:id', reunionCtrl.getReunion);
router.put('/:id', reunionCtrl.editReunion);
router.delete('/:id',reunionCtrl.deleteReunion);
router.put('/:id/recurso/:idrecurso', reunionCtrl.addRecurso);
router.delete('/:id/recurso/:idrecurso',reunionCtrl.deleteRecurso);
router.put('/:id/participante/:idparticipante',reunionCtrl.addParticipante);
router.delete('/:id/participante/:idparticipante',reunionCtrl.deleteParticipante);
/* router.get('/filtro/:p1/:p2/:p3',reunionCtrl.getReunionesFiltro); */
//exportamos el modulo de rutas
module.exports = router;