//defino controlador para el manejo de CRUD
const empleadoCtrl = require('./../controllers/empleado.controller');
//creamos el manejador de rutas
const express = require('express');
const router = express.Router();
//definimos las rutas para la gestion de agente
router.get('/', empleadoCtrl.getEmpleados);
router.post('/', empleadoCtrl.createEmpleado);
router.get('/:id', empleadoCtrl.getEmpleado);
router.put('/:id', empleadoCtrl.editEmpleado);
router.delete('/:id', empleadoCtrl.deleteEmpleado);
router.post('/:id/dependencia', empleadoCtrl.addDependencia);
//exportamos el modulo de rutas
module.exports = router;