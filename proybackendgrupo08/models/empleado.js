const mongoose = require('mongoose');
const {Schema} = mongoose;
const EmpleadoSchema = new Schema({
    empApellido: {type: String, required: true},
    empLegajo: {type: Number, required: true},
    empNombre: {type:String, required: true},
    empEmail: {type:String, required:true},
    dependecia: {type: Schema.Types.ObjectId, ref: Dependecia, required:true}
})
module.exports = mongoose.models.Empleado || mongoose.model('Empleado', EmpleadoSchema);