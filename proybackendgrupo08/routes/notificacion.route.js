const notificacionCtrl = require ('../controllers/notificacion.controller');
const express = require('express');
const router = express.Router();
router.get('/:id', notificacionCtrl.getNotificacionesEmpleado);
router.post('/', notificacionCtrl.createNotificacion);
router.delete('/:id', notificacionCtrl.deleteNotificacion);
router.put('/:id',notificacionCtrl.updateLeido);

module.exports = router;