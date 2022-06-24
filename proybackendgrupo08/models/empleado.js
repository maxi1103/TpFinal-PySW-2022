const mongoose = require('mongoose');
const {Schema} = mongoose;
const Dependencia = require('./dependencia');
const EmpleadoSchema = new Schema({
    empApellido: {type: String, required: true},
    empLegajo: {type: Number, required: true},
    empNombre: {type:String, required: true},
    empEmail: {type:String, required:true},
    dependencias:[{type: Schema.Types.ObjectId,
        ref: Dependencia }]
})
module.exports = mongoose.models.Empleado || mongoose.model('Empleado', EmpleadoSchema);