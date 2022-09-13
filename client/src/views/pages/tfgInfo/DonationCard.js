/* eslint-disable */
import PropTypes from 'prop-types';


// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, Button, Grid, Typography } from '@mui/material';


import { useEffect, useState, useContext } from 'react';
import { context } from '../../../contextProvider.js';
import { ethers } from "ethers";

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonTotalOrderCard from 'ui-component/cards/Skeleton/EarningCard';


// assets
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const CardWrapper = styled(MainCard)(({ theme }) => ({
    backgroundColor: theme.palette.primary.dark,
    color: '#fff',
    overflow: 'hidden',
    position: 'relative',
    '&>div': {
        position: 'relative',
        zIndex: 5
    },
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: theme.palette.primary[800],
        borderRadius: '50%',
        zIndex: 1,
        top: -85,
        right: -95,
        [theme.breakpoints.down('sm')]: {
            top: -105,
            right: -140
        }
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        zIndex: 1,
        width: 210,
        height: 210,
        background: theme.palette.primary[800],
        borderRadius: '50%',
        top: -125,
        right: -15,
        opacity: 0.5,
        [theme.breakpoints.down('sm')]: {
            top: -155,
            right: -70
        }
    }
}));

// ==============================|| DASHBOARD - TOTAL ORDER LINE CHART CARD ||============================== //

const DonationCard = ({ isLoading, amount }) => {
    const theme = useTheme();

    const Context = useContext(context);

    return (
        <>
            {isLoading ? (
                <SkeletonTotalOrderCard />
            ) : (
                <CardWrapper border={false} content={false}>
                    <Box sx={{ p: 4.25 }}>
                        <Grid container direction="column">
                                <Grid container alignItems="center">
                                    <Grid item>
                                            <Typography sx={{ fontSize: '1.7rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
                                                {amount.substring(0,6)} ETH
                                            </Typography>
                                        
                                    </Grid>
                                    
                                    <Grid item xs={12}>
                                        <Typography
                                            sx={{
                                                fontSize: '1.1rem',
                                                fontWeight: 800,
                                                color: theme.palette.primary[200]
                                            }}
                                        >
                                            Total Recaudado
                                        </Typography>
                                            
                                    </Grid>
                                    
                            </Grid>
                        </Grid>
                    </Box>
                </CardWrapper>
            )}
        </>
    );
};

DonationCard.propTypes = {
    isLoading: PropTypes.bool
};

export default DonationCard;