const Empleado = require('../models/empleado');
const Dependencia = require('../models/dependencia');
const empleadoCtrl = {}

 empleadoCtrl.getEmpleados = async (req, res) => {
    var empleados = await Empleado.find().populate('dependencias');
    res.json(empleados);
}

 empleadoCtrl.createEmpleado = async (req, res) => {
    var empleado = new Empleado(req.body);
    try {
        await empleado.save();
        res.json({
        'status': '1',
        'msg': 'Empleado guardado.'})
    } catch (error) {
        res.status(400).json({
        'status': '0',
        'msg': 'Error procesando operacion.'})
    }
}

 empleadoCtrl.getEmpleado = async (req, res) => {
    const empleado = await Empleado.findById(req.params.id).populate('dependencias');;
    res.json(empleado);
}

 empleadoCtrl.editEmpleado = async (req, res) => {
    const empleado = new Empleado(req.body);
    try {
        await Empleado.updateOne({_id: req.body._id}, empleado);
        res.json({
        'status': '1',
        'msg': 'Empleado updated'
        }) 
    } catch (error) {
        res.status(400).json({
        'status': '0',
        'msg': 'Error procesando la operacion'
        }) 
    }
}

 empleadoCtrl.deleteEmpleado = async (req, res)=>{
    try {
        await Empleado.deleteOne({_id: req.params.id});
        res.json({
        status: '1',
        msg: 'Empleado removed'
        }) 
    } catch (error) {
        res.status(400).json({
        'status': '0',
        'msg': 'Error procesando la operacion'
        }) 
    }
}

 empleadoCtrl.addDependencia = async(req,res)=>{
    const dependencia = new Dependencia(req.body);
    const idEmpleado = req.params.id;
    var empleado = await Empleado.findById(idEmpleado);
    console.log(dependencia);
    try{
        empleado.dependencias.push(dependencia);
        empleado.save();
        res.status(200).json({
             status:1,
             msg:"Dependencia Guardada"
        })
    }catch{
        res.status(400).json({
            status:0,
            msg:"Error"
       })

    }

 }


module.exports = empleadoCtrl;