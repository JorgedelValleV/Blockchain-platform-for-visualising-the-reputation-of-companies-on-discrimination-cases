/* eslint-disable */
import React, { useState, useContext, useEffect } from "react";
import { NavLink, useParams  } from 'react-router-dom';
import { context } from '../../../contextProvider.js';
import MaterialTable , { MTableToolbar, MTableFilterRow, MTablePagination } from "material-table";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { toString as uint8ArrayToString } from 'uint8arrays/to-string';
import axios from 'axios';


// material-ui
import { Grid } from '@mui/material';

// project imports
import ReportButtonCard from './ReportButtonCard';
import ReputationCard from './ReputationCard';
import { gridSpacing } from 'store/constant';
import ReputationControl from '../../../ReputationControl.json';
import { makeStyles } from '@material-ui/core/styles';
import HeaderCard from './HeaderCard'
import CompanyTable from './CompanyTable'
import ChartsCard from './ChartsCard'
import { Button } from '@material-ui/core';
import TableCard from './TableCard'
import TotalIncomeDarkCard from '../../dashboard/Default/TotalIncomeDarkCard';



const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.primary.main
    },
  
  
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 1000,
    },
    paperTable: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 1200,
      backgroundColor: '#bbdefb',
    },
    paperGraphics: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 1200,
      backgroundColor: '#bbdefb'
    },
    button: {
      color: '#bbdefb' , 
      backgroundColor: '#6495ED'
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
  }));
// ==============================|| DEFAULT DASHBOARD ||============================== //

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");


const Company = () => {

    const [isLoading, setLoading] = useState(true);
    const { id } = useParams();
    const [totalComplaints, setTotalComplaints] = useState(0);
    const [ourReputation, setOurReputation] = useState(0);
    const [reputation, setReputation] = useState("");
    const [complaintsHashes, setComplaintsHashes] = useState([]);
    const [complaints, setComplaints] = useState([]);
    const nameCompany = id; //Obtener el nombre de la empresa de la url de la pagina
    const Context = React.useContext(context);
    const classes = useStyles();
    
    useEffect(() => {
        setLoading(false);
        Context.contract.methods.getCompanyComplaints(nameCompany).call().then(response => setComplaintsHashes(response));
        Context.contract.methods.getReputation(nameCompany).call().then(response => setOurReputation(response));
        Context.contract.methods.getTotalComplaints().call().then(response  => setTotalComplaints(response));
    }, []);

    useEffect(async () => {
        let comps = [];
        for(const cid of complaintsHashes){
            for await (const chunk of client.cat(cid)) {
            // do something with buf
                let json = JSON.parse(uint8ArrayToString(chunk));
                comps.push({
                    type: json.type,
                    denunciada: json.previousComplaints == "true" ? "Sí" : json.previousComplaints == "false" ? "No" : "-----", 
                    media: json.media,
                    date: json.date,
                    gender : json.gender,
                    age : json.age,
                    relation : json.relation,
                    text: json.text
                })

                console.log(json.relation);
            }
        }
       
        setComplaints(comps);
    }, [complaintsHashes]);


    useEffect(() => {
        //Dar peso a las denuncias segun el numero que haya
        let j = 3;
        if(totalComplaints < 10){
            j = 0;
        }
        else if (totalComplaints < 30){
            j = 1;
        }
        else if(totalComplaints < 50){
            j = 2;
        }

        axios.get(`${process.env.REACT_APP_SERVER_URL}/getMetrics/${nameCompany.toLowerCase()}`, { withCredentials : true})
            .then((response) => { 
                var result = 0;
                response.data.map((elem) => {result += (elem * Context.pesos[j][0])});
                //result += (Context.pesos[j][1] * (10 - 0.01*ourReputation));
                result += (Context.pesos[j][1] * ((5*(Math.exp(-ourReputation/20)) + 5*(1-ourReputation/totalComplaints))));
                setReputation(result.toFixed(2));
        });
    },[ourReputation, totalComplaints]); 

    return (
        // dos filas
        <Grid container spacing={gridSpacing}>
            {/* fila 1 */}
            <Grid item xs={12}>
                {/* 3 columnas */}
                <Grid container spacing={gridSpacing}>
                    {/* columna 1 */}
                    <Grid item lg={8} md={12} sm={12} xs={12}>
{/*                         <HeaderCompany name = {nameCompany} isLoading={isLoading} />
 */}                    
                            <HeaderCard name = {nameCompany} isLoading={isLoading} />
                    </Grid>
                        
                    {/* columna 3 */}
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        {/* 2 filas en la 3ยบ columna */}
                        <Grid container spacing={gridSpacing}>
                            {/* fila 1 en la 3ยบ columna */}
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                    <ReportButtonCard isLoading={isLoading} />
                            </Grid>
                            {/* fila 2 en la 3ยบ columna */}
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <ReputationCard isLoading={isLoading} reputation = {reputation}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} sm = {12}>
                 {/* 2 columnas */}
                <Grid container spacing={gridSpacing}>
                    {/* columna 1 */}
                    <Grid item xs={12} md={8} sm = {12}>
                        <TableCard complaints = {complaints}/>
                        
                    </Grid>
                    {/* columna 2 */}
                    <Grid item xs={12} md={4} >
                        <ChartsCard isLoading={isLoading} complaints = {complaints}/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Company;