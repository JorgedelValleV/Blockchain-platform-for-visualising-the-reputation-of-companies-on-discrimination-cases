// prettier-ignore	
import React, {  useEffect, useState, useContext } from 'react';
import { context } from '../../../contextProvider.js';
import { ethers } from "ethers";
import Joyride, {  STATUS } from 'react-joyride';
import { steps } from "../../utilities/Steps";
import axios from 'axios';

// material-ui
import { Grid } from '@mui/material';
import {CardGroup } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';

// project imports
import TarjetPrincipal from './TarjetPrincipal';
import RankingCard from './RankingCard';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TarjetaInfo from './TarjetaInfo';
import { gridSpacing } from 'store/constant';
import CompanyItem from './CompanyItem';
import Carousel, { Divider } from 'semantic-ui-carousel-react';
import DataGraphics from './DataGraphics.js'

const Dashboard = () => {

    const [balance, setBalance] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [notDone, setnotDone] = useState(true);
    const [elements, setElements] = useState([]);
    const [companiesAndReputations, setCompaniesAndReputations] = useState([]);

    const Context = React.useContext(context);

    //window.localStorage.setItem('notDone', true)
    if(localStorage.getItem('notDone') == 'false'){
        localStorage.setItem('notDone','false');
    }
    else {localStorage.setItem('notDone', 'true')}

    //Calcular todas las reputaciones, tras haber obtenido las nuestras.
    function buildReputations(companies, reputations, totalComplaints){
        return new Promise((resolve,reject) =>{
            let j = 3;
            if(totalComplaints < companies.length){
                j = 0;
            }
            else if (totalComplaints < 3*companies.length){
                j = 1;
            }
            else if(totalComplaints < 5*companies.length){
                j = 2;
            }

            let aux = Promise.all(
                companies.map(async (company, index) =>{
                    const metrics = await axios.get(`${process.env.REACT_APP_SERVER_URL}/getMetrics/${company.toLowerCase()}`, { withCredentials : true});
                    var result = 0;
                    metrics.data.map((elem) => {result += (elem * Context.pesos[j][0])});
                    //result += (Context.pesos[j][1] * (10 - 0.01*reputations[index]));
                    result += (Context.pesos[j][1] * ((5*(Math.exp(-reputations[index]/20)) + 5*(1-reputations[index]/totalComplaints))));
                    return [company,result.toFixed(2)];
                })

            )
            resolve(aux);
        });
    }

    useEffect(async () => {
        setLoading(false);
        const [companies, ourReputations, totalComplaints] = await Promise.all([ //Practicamente instantaneo(son gets)
            await Context.contract.methods.getCompaniesNames().call(),
            await Context.contract.methods.getAllReputations().call(),
            await Context.contract.methods.getTotalComplaints().call()
        ]); 
        

        const cards = await buildReputations(companies, ourReputations, totalComplaints);
        console.log("cards");
        const ndiv = 4;
        const nGroups = Math.floor(companies.length/ndiv);
        const rest = companies.length%ndiv;
        let aux = [];

        for(let i = 0; i < nGroups; ++i){
            aux.push( {render:() =>{
                return (
                    <div className="ui four column grid">
                    <div className="row">
                        <CardGroup itemsPerRow={ndiv}>
                        <div className="column"></div>
                        {cards.slice(ndiv*i,ndiv*(i+1)).map((item) =>
                                <CompanyItem key={item[0]} name={item[0]} reputation={item[1]}/>
                        )}
                        </CardGroup>
                    </div>
                    </div>
                )}
            });
        }
        if(rest>0){
            aux.push({render:() =>{
                return (
                <div className="ui four column grid">
                <div className="row">
                    <CardGroup itemsPerRow={rest}>
                    <div className="column"></div>
                    {cards.slice(ndiv*nGroups, ndiv*nGroups + rest).map((item)=>
                        <CompanyItem key={item[0]} name={item[0]} reputation={item[1]}/>
                    )}
                    </CardGroup>
                </div>
                </div> )}});
        }
        setElements(aux);
        setCompaniesAndReputations(cards);
    }, []);


    return (
        <div>
              <Joyride
                continuous={true}  
                callback={(data) => {
                    const { status } = data;

                    if ([STATUS.FINISHED].includes(status) || [STATUS.SKIPPED].includes(status)) {
                        localStorage.setItem('notDone', 'false');
                        setnotDone(false);
                    } 
                    
                }} 
                scrollToFirstStep={true} //el botoncito
                showProgress={true}
                showSkipButton={true}
                run = {localStorage.getItem('notDone') == 'true' ? (true):(false)}
                steps={steps}
                styles={{
                    
                    buttonClose: {
                        display: 'none',
                    },
                    options: {
                        zIndex: 10000,
                        primaryColor: '#099',
                      },
                }}
            />
        <Grid container spacing={gridSpacing}>
            {/* fila 1: titulo + donar + recaudado */}
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>

                    {/* columna 1 de 12 ocupa 8 (mas ancha)*/}
                    <Grid item lg={8} md={6} sm={6} xs={12}>
                        <TarjetPrincipal isLoading={isLoading} />
                    </Grid>

                    {/* columna 2= tarjetas peq*/}
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <Grid container spacing={1.5}>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <div className = "denunciar">
                                    <TotalIncomeDarkCard isLoading={isLoading} />
                                </div>
                            </Grid>
                            <Grid item sm={6} xs={12} md={6} lg={12}> 
                                <div className="informacion">
                                    <TarjetaInfo isLoading={isLoading}/>  
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            {/* fila 2*/}
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    {/* columna 1= carousel+ graf*/}
                    <Grid item lg={8} md={12} sm={12} xs={12}>
                        <Grid container spacin={gridSpacing}>
                            <Grid item sm={12} xs={12} md={6} lg={12}>
                            <div className = "empresa">
                                <Carousel 
                                isLoading={isLoading}
                                elements = {elements}
                                duration ={6000}
                                animation = 'slide left'
                                showNextPrev = {false}
                                showIndicators = {true}  
                                margin="1.5"

                                />
                            </div>
                            
                            </Grid>
                       
                            <Grid item sm={4} xs={12} md={6} lg={12}>
                                <p></p>
                                <p></p>
                                <p></p>
                                <DataGraphics /> 
                            </Grid>
                        
                        </Grid>
                    </Grid>
                  
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <RankingCard isLoading={isLoading} cr = {companiesAndReputations}/>
                    </Grid>
                </Grid>

            </Grid>
        </Grid>
        </div>
    );
};

export default Dashboard;
