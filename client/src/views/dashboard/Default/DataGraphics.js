import React, {  useEffect, useState } from 'react';
import axios from 'axios';
import { styled, useTheme } from '@mui/material/styles';
import BarChart from './composedChart';
import { Grid, Typography } from '@mui/material';
import CircularGraph from '../../pages/company/CircularGraph.js'
import MainCard from 'ui-component/cards/MainCard';


const coloresGenders = ['#87CEEB','#98FB98','#9370DB','#DDA0DD','#483D8B'];
const coloresGenero=["#2471A3","#6C3483","#BB8FCE","#F5B041 ","#F4D03F"];
const coloresRelations = ['#87CEEB','#98FB98','#9370DB','#DDA0DD','#483D8B'];
const coloresTypes = [ '#7fb3d5' , '#2980b9' , '#1f618d' , '#154360','#7fb8d5' , '#2960b9' , '#1f718d' , '#134960','#6fb3d5' , '#8980b9'];
const coloresAges = ["#87CEFA", "#00BFFF","#1E90FF","#4169E1","#0000FF","#0000CD","#00008B","#000080", "#191970"];
const coloresEdad=["#BB8FCE","#F5B041 ","#5DADE2","#EC7063","#F4D03F","#2471A3","#6C3483","#229954" ]


  export default function DataGraphics() {

    const [dataTypes, setDataTypes] = useState([]);
    const [dataGenders, setDataGenders] = useState([]);
    const [dataAges, setDataAges] = useState([]);
    const [dataRelations, setDataRelations] = useState([]);

    const theme = useTheme();

    const CardWrapper = styled(MainCard)(({ theme }) => ({
      backgroundColor: "#ffffff",
      color: '#fff',
      overflow: 'hidden',
      position: 'relative'
    }));
  

    useEffect(async() =>{
      const [graficaTipo, graficaGenero, graficaEdad, graficaRelacion] = await Promise.all([
        await axios.get(`${process.env.REACT_APP_SERVER_URL}/charts/graficaTipo`, { withCredentials : true}),
        await axios.get(`${process.env.REACT_APP_SERVER_URL}/charts/graficaGenero`, { withCredentials : true}),
        await axios.get(`${process.env.REACT_APP_SERVER_URL}/charts/graficaEdad`, { withCredentials : true}),
        await axios.get(`${process.env.REACT_APP_SERVER_URL}/charts/graficaRelacion`, { withCredentials : true})
      ])
      
      setDataTypes(graficaTipo.data);
      setDataGenders(graficaGenero.data);
      setDataAges(graficaEdad.data);
      setDataRelations(graficaRelacion.data);
    },[])

    return (
      <CardWrapper>
        <Typography sx={{ fontSize: '1.5rem',fontWeight: 400, color: theme.palette.secondary[800]}}>
             Estadísticas sobre denuncias 
        </Typography>
      <Grid container spacing={1}>
          <Grid item xs={6}>
              <h3 style={{"color" : "#4527a0", "margin-top" : "10px"}}>Por género</h3>
              <Grid sm={1} md={1}  lg={3} >
                    { dataGenders.length > 0
                      ? <CircularGraph ancho={410} alto={200} data={dataGenders} colores={coloresGenero} tipo = "gender"/>
                      : <h4> Cargando la gráfica... </h4>
                    }
              </Grid>
              <h3 style={{"color" : "#4527a0", "margin-top" : "10px"}}>Por edad</h3>
              <Grid sm={1}  md={1}  lg={3}>
                    { dataAges.length > 0
                      ? <BarChart colorBarra={theme.palette.primary.main} legend="Edad de denunciantes" data = {dataAges} title="Rango de edad"/>
                      : <h4> Cargando la gráfica... </h4>
                    }
                    
                
            </Grid>
             
          </Grid>

          <Grid item xs={6}>
            <h3 style={{"color" : "#4527a0", "margin-top" : "10px"}}>Por relación con la empresa</h3>
            <Grid sm={1} md={1} lg={3}  >
                  { dataRelations.length > 0
                    ?  <CircularGraph ancho={410} alto={200} data={dataRelations} colores={coloresRelations} tipo = "consent"/>
                    :  <h4> Cargando la gráfica... </h4>
                  }
                  
            </Grid>
            <h3 style={{"color" : "#4527a0", "margin-top" : "10px"}}>Por tipo de denuncia</h3>
            <Grid sm={1} md={1} lg={3}  >
                    { dataTypes.length > 0
                      ? <BarChart colorBarra={theme.palette.secondary.dark} legend="denuncias" data = {dataTypes} title="Tipología"/>
                      : <h4> Cargando la gráfica... </h4>
                    }
               
                </Grid>
          </Grid>
      </Grid>
      </CardWrapper>
    );
  }
