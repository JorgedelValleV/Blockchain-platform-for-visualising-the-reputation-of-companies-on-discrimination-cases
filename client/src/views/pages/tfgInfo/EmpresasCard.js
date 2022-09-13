import React, { useState, useEffect,useContext } from 'react'

import PropTypes from 'prop-types';
import Member from './Member'
import MainCard from 'ui-component/cards/MainCard';
// material-ui
import { styled } from '@mui/material/styles';
import {  Box, Grid, Typography } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles'
import Empresa from './Empresa';
import {GoogleSpreadsheet} from "google-spreadsheet";
import { gridSpacing } from 'store/constant';

// project imports
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';
import { context } from '../../../contextProvider.js';




// styles
const CardWrapper = styled(MainCard)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.dark,
    color: '#fff',      
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: `linear-gradient(210.04deg, ${theme.palette.warning.dark} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
        borderRadius: '50%',
        top: -30,
        right: -180
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: `linear-gradient(140.9deg, ${theme.palette.warning.dark} -14.02%, rgba(144, 202, 249, 0) 70.50%)`,
        borderRadius: '50%',
        top: -160,
        right: -130
    }
}));


const useStyles = makeStyles((theme) => ({

    button: {
        color: '#bbdefb' , 
        backgroundColor: '#6495ED'
    },
    paper: {
        padding: theme.spacing(1),
        margin: 'auto',
        maxWidth: 1000,
        backgroundColor: '#fff '
    },
  }));

// ==============================|| DASHBOARD - TOTAL ORDER LINE CHART CARD ||============================== //

const EmpresasCard = ({ isLoading }) => {
    

    const Context = useContext(context);

    

    return (
        <>
        {isLoading ? (
            <SkeletonEarningCard />
        ) : (
             
                <CardWrapper border={false} content={false}>
                    <Box sx={{ p: 4.25 }}>
                        <Grid container direction="column">
                            <Grid item>
                                <Typography sx={{ fontSize: '2rem', fontWeight: 800, mr: 1, mt: 1.75, mb: 0.75 }}>
                                    Empresas disponibles:
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid container direction="column">
                            
                            
                            <Grid item lg={2} xs={28} md={4}>
                                <Grid container spacing={gridSpacing}>
                                        {Context.empresas?.map((company ) => (
                                                <Grid item lg={3}>
                                                    <Empresa
                                                        nombre = {company.nombre_empresa}
                                                        foto={company.url_imagen}
                                                        link={company.url}
                                                    />
                                                </Grid>
                                                
                                                
                                            ))}
                                     </Grid>
                            </Grid>
                                                
                            

                        </Grid>
                       
                        
                    </Box>
                </CardWrapper>)}
        </>
            
    );
};



export default EmpresasCard;

