/* eslint-disable */

import React, { useEffect, useState, useContext } from 'react';
import { context } from '../../../contextProvider.js';
import { ethers } from "ethers";

// material-ui
import { Grid } from '@mui/material';
// project imports
import DonationCard from './DonationCard';
import DonationButtonCard from './DonationButtonCard';
import DonationTextCard from './DonationTextCard';
import TextCard from './TextCard';
import MemberCard from './MemberCard';
import HeaderCard from './HeaderCard';
import EmpresasCard from './EmpresasCard';
import ReputationInfoCard from './ReputationInfoCard';
import { gridSpacing } from 'store/constant';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const tfgInfo = () => {
    const [isLoading, setLoading] = useState(true);
    const [amountDonated, setAmountDonated] = useState("0");

    const Context = React.useContext(context);

    useEffect(() => {
        setLoading(false);
        Context.contract.methods.getAmountDonated().call()
            .then((response) => { console.log(response); setAmountDonated(response)});
    }, []);

    return (
        // dos filas
        <Grid container spacing={gridSpacing}>
            {/* fila 1 */}
            <Grid item xs={12}>
                {/* 3 columnas */}
                <Grid container spacing={gridSpacing}>
                    {/* columna 1 */}
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                        <HeaderCard isLoading={isLoading} />
                    </Grid>
                    {/* columna 2 */}
                    <Grid item lg={3} md={12} sm={12} xs={12}>
                        <Grid item sm={6} xs={12} md={6} lg={12}>
                            <DonationTextCard isLoading={isLoading} />
                        </Grid>
                    </Grid>
                    <Grid item lg={3} md={12} sm={12} xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <DonationCard isLoading={isLoading} amount = {amountDonated}/>
                            </Grid>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <DonationButtonCard isLoading={isLoading} amountDonated = {amountDonated} addDonation = {(amount) => {
                                    setAmountDonated((parseFloat(amountDonated) + amount).toString());
                                }} />
                            </Grid>
                        </Grid>
                    </Grid>
                 
                </Grid>
            </Grid>
            {/* fila 2 */}
            <Grid item xs={12}>
                 {/* 2 columnas */}
                <Grid container spacing={gridSpacing}>
                    {/* col 1: texto tfg */}
                    <Grid item lg={6} xs={28} md={4}>
                        {/* miembros del proyecto */}
                        <Grid container spacing={gridSpacing}>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TextCard isLoading={isLoading} />
                            </Grid> 
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <EmpresasCard id={4} isLoading={isLoading} />
                            </Grid>
                        </Grid>
                    </Grid>
                    
                    {/* col 2 y 3 : personas */}
                    <Grid item lg={6} xs={28} md={4}>
                        {/* segunda columna, tiene una fila con la card de reputacion, y otra fila con dos columnas */}
                        <Grid container spacing={gridSpacing}>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <ReputationInfoCard isLoading={isLoading} />
                            </Grid> 
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <Grid container spacing={gridSpacing}>
                                    <Grid item lg={6} xs={28} md={4}>
                                        {/* miembros del proyecto */}
                                        <Grid container spacing={gridSpacing}>
                                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                                <MemberCard id={0} isLoading={isLoading} />
                                            </Grid>
                                        
                                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                                <MemberCard id={2} isLoading={isLoading} />
                                            </Grid>
                                        
                                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                                <MemberCard id={4} isLoading={isLoading} />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid lg={6} item xs={12} md={4}>
                                        {/* miembros del proyecto */}
                                        <Grid container spacing={gridSpacing}>
                                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                                <MemberCard id={1} isLoading={isLoading} />
                                            </Grid>
                                        
                                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                                <MemberCard id={3} isLoading={isLoading} />
                                            </Grid>
                                        
                                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                                <MemberCard id={5} isLoading={isLoading} />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                
                            </Grid>
                        </Grid>
                        
                        

                    </Grid>


                    
                </Grid>
            </Grid>
        </Grid>
    );
};


export default tfgInfo;