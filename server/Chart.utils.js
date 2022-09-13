const Chart = require('./Chart.module.js');

//Función para respuesta a la hora de actualizar la coleción de datos para gráficas.
const chartsResponse = (err, doc) =>{
    if(err) console.log(err.message);
    else if(doc){
      console.log("Actualización exitosa de la colección chartData.");
    }
};
  
  
//Función para poblar la colección de gráficas inicialmente
const initChartData = () => {

    Chart.count((err, count) => {
        if(err)  console.log(err.message);
        else {
          if(count == 0) {
            var new_chart;

            new_chart = new Chart({ 'chart_name' : 'graficaRelacion' , 
            data : [ 
                { 'category' : 'sigo trabajando' , 'value' : 0 }, 
                { 'category' : 'me despidieron' , 'value' : 0 },
                { 'category' : 'he dimitido' , 'value' : 0 },
                { 'category' : 'otro' , 'value' : 0 },
                { 'category' : 'prefiero no responder' , 'value' : 0 } 

            ]});
            new_chart.save((err, doc) => { chartsResponse(err,doc)});

            new_chart = new Chart({ 'chart_name' : 'graficaGenero' , 
            data : [ 
                { 'category' : 'femenino' , 'value' : 0 }, 
                { 'category' : 'masculino' , 'value' : 0 }, 
                { 'category' : 'no binario' , 'value' : 0 },
                { 'category' : 'otro' , 'value' : 0 },
                { 'category' : 'prefiero no responder' , 'value' : 0 } 
            ] });
            new_chart.save((err, doc) => { chartsResponse(err,doc)});

            new_chart = new Chart({ 'chart_name' : 'graficaEdad' , 
            data : [ 
                { 'category' : '16-20' , 'value' : 0 }, 
                { 'category' : '21-30' , 'value' : 0 }, 
                { 'category' : '31-40' , 'value' : 0 },
                { 'category' : '41-50' , 'value' : 0 },
                { 'category' : '51-60' , 'value' : 0 },
                { 'category' : '61-70' , 'value' : 0 },
                { 'category' : '71-80' , 'value' : 0 },
                { 'category' : 'más de 80' , 'value' : 0 },
                { 'category' : 'prefiero no responder' , 'value' : 0 }
            ] });
            new_chart.save((err, doc) => { chartsResponse(err,doc)});

            new_chart = new Chart({ 'chart_name' : 'graficaTipo' , 
            data : [ 
                { 'category' : 'racismo' , 'value' : 0 }, 
                { 'category' : 'discriminación por género' , 'value' : 0 }, 
                { 'category' : 'orientación sexual' , 'value' : 0 },
                { 'category' : 'religión' , 'value' : 0 },
                { 'category' : 'edad' , 'value' : 0 },
                { 'category' : 'discapacidad' , 'value' : 0 },
                { 'category' : 'otro' , 'value' : 0 },
            ] });
            new_chart.save((err, doc) => { chartsResponse(err,doc)});
          }
        }
    });
}

//Función para actualizar el documento que contiene la información de una gráfica
const updateChartData = (chartName, _category) => {

    return Chart.findOne({ 'chart_name' : chartName , data : { $elemMatch : { 'category' : _category } } }, (err, doc)=>{
        if(err) {
            console.log(err.message); 
            return false; 
        }
        else {
            if(doc) {        
                Chart.updateOne( { 'chart_name' : chartName, 'data.category': _category }, { $inc: { 'data.$.value' : 1}  }, 
                (err, doc) => { chartsResponse(err,doc)});
                return true;
            }
            else {
                console.log("No existe esa base de datos o colección");
                return false;
            }
        }
    });
}

//Se exportan las funciones de inicializacion y actualizacion
module.exports = { 'initChartData' : initChartData , 'updateChartData' : updateChartData };
