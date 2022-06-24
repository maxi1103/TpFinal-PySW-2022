const Reunion= require ('../models/reunion');
const Recurso= require ('../models/recurso')
const reunionCtrl={}

reunionCtrl.getReuniones= async (req,res)=>{
    var reunion= await Reunion.find().populate('recursos').populate('oficina');
    res.json(reunion);
}
reunionCtrl.createReunion= async(req,res)=>{
    
    var reunion=new Reunion(req.body);
    console.log(reunion);
    try{
        await reunion.save();
        res.json({
            'status' : '1',
            'msg' : 'Reunion Guardada Correctamente',
        })
    }catch(error){
      res.status(400).json({
        'error' : error,
        'status' : '0',
        'msg': 'Error procesando operacion al guardar una renuion'
      })  

    }
}
reunionCtrl.getReunion = async(req,res)=>{
    const reunion= await Reunion.findById(req.params.id);
    res.json(reunion);
}
reunionCtrl.editReunion = async (req, res) => {
    const reunion = new Reunion(req.body);
    try {
    await Reunion.updateOne({_id: req.body._id}, reunion);
    res.json({
    'status': '1',
    'msg': 'reunion actualizado'
    }) 
    } catch (error) {
    res.status(400).json({
    'status': '0',
    'msg': 'Error procesando la operacion'
    }) 
    }
    
    }
reunionCtrl.addRecurso = async (req,res)=>{
    const idRecurso= req.params.idrecurso;
    const idReunion = req.params.id;
    var reunion= await Reunion.findById(idReunion);
    var recurso=await Recurso.findById(idRecurso);
    console.log(req.params.idrecurso);
    try{
        reunion.recursos.push(recurso);
        reunion.save();
        res.status(200).json({
            status : 1,
            msg: "Recurso Agregado"
        })
    }catch{
        res.status(400).json({
            status: 0,
            msg: "Error al procesar operacion"
        })
    }
}
reunionCtrl.deleteRecurso= async(req,res)=>{
    const idReunion= req.params.id;
    const reunion= await Reunion.findById(idReunion);
    const idRecurso = req.params.idrecurso;

    try{
        reunion.recursos.pull(idRecurso);
        await Reunion.updateOne({_id:idReunion},reunion);
        res.status(200).json({
            status:1,
            msg:"Recurso Eliminado"
        })
    }
    catch{
        res.status(400).json({
            status:0,
            msg:"Error al procesar operacion"
        })
    }
}


module.exports= reunionCtrl;