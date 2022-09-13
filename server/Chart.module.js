const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Esquema para los objetos que representan categorias
const ChartDataSchema = new Schema({ 
    category : { type : String},
    value : { type : Number }
});

ChartDataSchema.set('autoIndex', false);

//Esquema para representar las graficas (que contienen categorias)
const ChartSchema = new Schema({
  chart_name : { type : String, required : true, unique : true},
  data : [ChartDataSchema]
}, { collection : 'chartData' });

//Definicion del modelo
const Chart = new mongoose.model('chartData', ChartSchema);
module.exports = Chart;