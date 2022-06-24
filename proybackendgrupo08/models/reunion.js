const mongoose = require('mongoose');
const {Schema} = mongoose;
const Oficina= require('./oficina');
const Recurso= require('./recurso');
const ReunionSchema = new Schema({
    fecha:{type: String,required:true},
    horaInicio:{type: String,required:true},
    horaFin:{type: String,required:true},
    oficina :{type: Schema.Types.ObjectId,ref: Oficina, required:true},
    tipoReunion: {type: String,required:true},
    estadoReunion: {type:String,required:true},
    recursos :[{type: Schema.Types.ObjectId,
                ref: Recurso            
    }]
})

module.exports = mongoose.models.Reunion || mongoose.model('reunion', ReunionSchema)