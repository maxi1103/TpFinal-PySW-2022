const mongoose = require('mongoose');
const {Schema} = mongoose;
const DependenciaSchema = new Schema({
    depTipoDependencia: {type: String, required: true}
})
module.exports = mongoose.models.Dependencia || mongoose.model('Dependencia', DependenciaSchema);