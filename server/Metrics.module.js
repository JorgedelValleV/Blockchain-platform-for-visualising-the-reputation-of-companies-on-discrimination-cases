const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Se define el esquema que define a las empresas
const MetricsSchema = new Schema({
  company_name : { type : String, required : true, unique : true},
  rating : { type : Array, required : true, unique : false}
  
}, { collection : 'companyMetrics' });

//Se define el modelo
const Metrics = new mongoose.model('companyMetrics', MetricsSchema);
module.exports = Metrics;