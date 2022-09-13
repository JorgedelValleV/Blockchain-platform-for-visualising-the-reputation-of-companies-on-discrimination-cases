import PropTypes from 'prop-types';
import React, { useState, useEffect } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// material-ui
import { useTheme } from '@mui/material/styles';
import {  CardContent, Grid,  Box, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';
import { create as ipfsHttpClient } from "ipfs-http-client";
import { toString as uint8ArrayToString } from 'uint8arrays/to-string';
// assets
import CircularGraph from './CircularGraph';

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //
const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");


function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

const coloresGenders = ['#87CEEB','#98FB98','#9370DB','#DDA0DD','#483D8B'];
const coloresRelations = ['#87CEEB','#98FB98','#9370DB','#DDA0DD','#483D8B'];
const coloresTypes = [ '#7fb3d5' , '#2980b9' , '#1f618d' , '#154360','#7fb8d5' , '#2960b9' , '#1f718d' , '#134960','#6fb3d5' , '#8980b9'];
const coloresAges = ["#87CEFA", "#00BFFF","#1E90FF","#4169E1","#0000FF","#0000CD","#00008B","#000080", "#191970"];


//IMPORTANTE: DATA DEBE SER [{"category" : ... , "value": x}]
//EN CIRCULARGRAPH YA SE ARREGLA PARA QUE LO LEA LA GRAFICA.
//SE HACE ASI PORQUE EN HOME LOS DATOS SE OBTIENEN DE LA BBDD Y ESTA LOS DEVUELVE ASI



const typesNames = ["racismo", "discriminación por género", "orientación sexual", "religión", "edad", "discapacidad", "otro"];
const gendersNames = ["femenino", "masculino", "no binario", "otro", "prefiero no responder"];
const relationNames = ["sigo trabajando", "me despidieron", "he dimitido", "otro", "prefiero no responder"];
const ageNames = ["16-20", "21-30", "31-40", "41-50", "51-60", "61-70", "71-80", "más de 80", "prefiero no responder"];


const ChartsCard = ({ isLoading, complaints }) => {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    let typeDicc = {"racismo" : 0, "discriminación por género" : 0, "orientación sexual" : 0, "religión" : 0, "edad" : 0, "discapacidad" : 0, "otro" : 0};
    let genderDicc = {"femenino" : 0, "masculino" : 0, "no binario" : 0 , "otro" : 0, "prefiero no responder" : 0};
    let relationDicc = { "sigo trabajando" : 0 , "me despidieron" : 0, "he dimitido" : 0, "otro" : 0, "prefiero no responder" : 0};
    let ageDicc = { "16-20" : 0, "21-30" : 0, "31-40" : 0, "41-50" : 0, "51-60" : 0, "61-70" : 0, "71-80" : 0, "más de 80" : 0, "prefiero no responder" : 0};

    for(let c of complaints){ //Contruir los diccionarios
        //Valores seguros
        typeDicc[c.type] += 1;
        genderDicc[c.gender] += 1;
        relationDicc[c.relation] += 1;
        ageDicc[c.age] += 1;
    }

    let dataTypes = [];
    let dataGenders = [];
    let dataRelations = [];
    let dataEdad = [];
    
    for(let elem of typesNames){
        dataTypes.push({
            "category" : elem,
            "value" : typeDicc[elem]
        })
    }

    for(let elem of gendersNames){
        dataGenders.push({
            "category" : elem,
            "value" : genderDicc[elem]
        })
    }
    
    for(let elem of relationNames){
        dataRelations.push({
            "category" : elem,
            "value" : relationDicc[elem]
        })
    }

    for(let elem of ageNames){
        dataEdad.push({
            "category" : elem,
            "value" : ageDicc[elem]
        })
    }
    
    console.log(dataTypes);
    console.log(dataGenders);
    console.log(dataRelations);
    console.log(dataEdad);


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    
    return (
        <>
            {isLoading ? (
                <SkeletonPopularCard />
            ) : (
                <MainCard content={false}>
                    <CardContent>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <Grid container alignContent="center" justifyContent="space-between">
                                    <Grid item>
                                        <Typography color = "#2196f3" variant="h4">Gráficas de las denuncias</Typography>
                                    </Grid>
                                    
                                </Grid>
                            </Grid>
                            <Grid container alignContent="right" item xs={12} sx={{ pt: '16px !important' }}>
                            <Box sx={{ width: '100%' }}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <Tabs
                                        value={value}
                                        onChange={handleChange}
                                        variant="scrollable"
                                        scrollButtons="auto"
                                        aria-label="scrollable  auto disable tabs example"
                                    >
                                    {/*  OJO, SE HACE DISABLE SI NO HAY DATOS DE ESAS DENUNCIAS  */}  
                                    <Tab label="Nº de cada tipo" {...a11yProps(0) } />
                                    <Tab label="Género" {...a11yProps(1)} />
                                    <Tab label="Edad" {...a11yProps(2)} />
                                    <Tab label="Relación actual con la empresa" {...a11yProps(3)} />
                                    </Tabs>
                                </Box>
                                <TabPanel value={value} index={0} >
                                    <CircularGraph ancho={400} alto={400} data = {dataTypes} colores = {coloresTypes}/>
                                </TabPanel>
                                <TabPanel value={value} index={1}>
                                    <CircularGraph ancho={400} alto={400} data = {dataGenders} colores = {coloresGenders}/>
                                </TabPanel>
                                <TabPanel value={value} index={2}>
                                    <CircularGraph ancho={400} alto={400} data = {dataEdad} colores = {coloresAges}/>
                                </TabPanel>
                                <TabPanel value={value} index={3}>
                                    <CircularGraph ancho={400} alto={400} data = {dataRelations} colores = {coloresRelations}/>
                                </TabPanel>
                            </Box>
                                
                            </Grid>
                            
                        </Grid>
                     </CardContent>      
                                
                </MainCard>
            )}
        </>
    );
};

ChartsCard.propTypes = {
    isLoading: PropTypes.bool
};

export default ChartsCard;