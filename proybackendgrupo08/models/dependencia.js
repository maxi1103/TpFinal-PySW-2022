const mongoose = require('mongoose');
const {Schema} = mongoose;
const DependenciaSchema = new Schema({
    depContable: {type: String, required: true},
    depPersonal: {type: String, required: true},
    depAuditoria: {type:String, required: true}
})
module.exports = mongoose.models.Dependencia || mongoose.model('Dependencia', DependenciaSchema);