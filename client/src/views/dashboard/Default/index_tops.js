// prettier-ignore	
import React, {  useEffect, useState, useContext } from 'react';
import { context } from '../../../contextProvider.js';
import { ethers } from "ethers";
import Joyride, {  STATUS } from 'react-joyride';
import { steps } from "../../utilities/Steps";

// material-ui
import { Grid } from '@mui/material';
import {CardGroup } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';

// project imports
import EarningCard from './TarjetPrincipal';
import PopularCard from './PopularCard';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard from './TarjetaInfo';
import { gridSpacing } from 'store/constant';
import CompanyItem from './CompanyItem';
import Carousel from 'semantic-ui-carousel-react';
import RankingComponent from './RankingComponent.js';

const Dashboard = () => {

    const [companies, setCompanies] = useState([]);
    const [reputation, setReputation] = useState([]);
    const [balance, setBalance] = useState("");
    const Context = React.useContext(context);

    const [isLoading, setLoading] = useState(true);
    

    useEffect(() => {
        setLoading(false);
        Context.contract.methods.getCompaniesNames().call().then(response => setCompanies(response));
        Context.contract.methods.getAllReputations().call().then(response => setReputation(response));
        Context.provider.getBalance(process.env.REACT_APP_ADDRESS).then(response => setBalance(ethers.utils.formatEther(response)));
    }, []);


    let cards = companies.map((e, i) => [e, 10 - 0.01*reputation[i]]);
    let best = cards.sort((a,b) => (parseInt(a[1]) > parseInt(b[1]) ? 1 : parseInt(a[1]) < parseInt(b[1]) ? -1 : 0));
    let nGroups = Math.floor(companies.length/2);
    let rest = companies.length%2;
    let elements = [];

    for(let i = 0; i < nGroups; ++i){
        elements.push( {render:() =>{
            return (
                <div className="ui one column grid">
                <div className="row">
                    <CardGroup itemsPerRow={1}>
                    <div className="column"></div>
                    {cards.slice(2*i,2*(i+1)).map((item) =>
                            <CompanyItem key={item[0]} name={item[0]} reputation={item[0]}/>
                    )}
                    </CardGroup>
                </div>
                </div>
            )}
        });
    }
    if(rest>0){
        elements.push({render:() =>{
            return (
            <div className="ui one column grid">
            <div className="row">
                <CardGroup itemsPerRow={1}>
                <div className="column"></div>
                {cards.slice(2*nGroups, 2*nGroups + rest).map((item)=>
                    <CompanyItem key={item[0]} name={item[0]} reputation={item[1]}/>
                )}
                </CardGroup>
            </div>
            </div> )}});
    }

    return (
        <div>
            <Joyride
                continuous={true}  
                scrollToFirstStep={true} //el botoncito
                showProgress={true}
                showSkipButton={true}
                run = {true}
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
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={8} md={6} sm={6} xs={12}>
                        <EarningCard isLoading={isLoading} />
                    </Grid>
                    {/* <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TotalOrderLineChartCard isLoading={isLoading} />
                    </Grid> */}
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <div className = "denunciar">
                                    <TotalIncomeDarkCard isLoading={isLoading} />
                                </div>
                            </Grid>
                            <Grid item sm={6} xs={12} md={6} lg={12}> 
                                <TotalIncomeLightCard isLoading={isLoading} balance = {balance.slice(0,6)}/>  
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <RankingComponent isLoading= {isLoading} titulo = "TOP 5 MEJOR VALORADAS" companies = {best.slice(0,5)}/>
                    </Grid> 
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <RankingComponent isLoading= {isLoading} titulo = "TOP 5 PEOR VALORADAS" companies = {best.slice(-5)}/>
                    </Grid>
                    
                    <Grid item xs={12} md={4}>
                    <div className = "empresa">
                            <Carousel 
                            isLoading={isLoading}
                            elements = {elements}
                            duration ={3000}
                            animation = 'slide left'
                            showNextPrev = {false}
                            showIndicators = {true}   
                            />
                        </div>
                       
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        </div>
    );
};

export default Dashboard;
