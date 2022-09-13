/* eslint-disable */
import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, Grid, Menu, MenuItem, Typography } from '@mui/material';
import {  Header } from 'semantic-ui-react'

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';

import CompanyTable from './CompanyTable'

const CardWrapper = styled(MainCard)(({ theme }) => ({
    backgroundColor: '#fff',
    color:  theme.palette.secondary.dark,
    overflow: 'hidden',
    position: 'relative'
}));

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const TableCard = ({ isLoading, complaints }) => {
    const theme = useTheme();



    return (
        <>
            {isLoading ? (
                <SkeletonEarningCard />
            ) : (
                <CardWrapper border={false} content={false}>
                    <Box sx={{ p: 4.25 }}>
                        <Grid container direction="column">
                            <Grid item margin = '1.5rem 1.5rem 1.5rem'>
                                <h1 >
                                    Denuncias registradas
                                </h1>
                            </Grid>
                            <p></p>
                            <Grid item xs={12} margin = '0 1.2rem'>
                                <CompanyTable complaints = {complaints}/>
                            </Grid>
                            
                            
                        </Grid>
                    </Box>
                </CardWrapper>
            )}
        </>
    );
};

TableCard.propTypes = {
    isLoading: PropTypes.bool
};

export default TableCard;