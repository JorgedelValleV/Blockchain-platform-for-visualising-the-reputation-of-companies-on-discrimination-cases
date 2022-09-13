import PropTypes from 'prop-types';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import {  Box, Grid, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';

// assets

import Logo from 'assets/images/blockchain.png'

const CardWrapper = styled(MainCard)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    color: '#fff',
    overflow: 'hidden',
    position: 'relative'
}));


const TarjetPrincipal = ({ isLoading }) => {
    const theme = useTheme();



    return (
        <>
            {isLoading ? (
                <SkeletonEarningCard />
            ) : (
                <CardWrapper border={false} content={false}>
                    <Box sx={{ p: 2.25 }}>
                        <Grid container direction="column">
                            <Grid item>
                            </Grid>
                            <Grid item>
                                <Grid container alignItems="center">
                                    <Grid item>
                                        <Typography sx={{ fontSize: '3.125rem', fontWeight: 800, mr: 1, mt: 1.75, mb: 0.75 }}>
                                            VOICECHAIN
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <img src={Logo} alt="logo"
                                             width='100'
                                             height="100" 
                                        />
                                      
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item sx={{ mb: 1.25 }}>
                                <Typography
                                    sx={{
                                        fontSize: '1rem',
                                        fontWeight: 500,
                                        color: theme.palette.secondary[200]
                                    }}
                                >
                                    Cuenta tu historia. Ayuda al resto. Alza tu voz.
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </CardWrapper>
            )}
        </>
    );
};

TarjetPrincipal.propTypes = {
    isLoading: PropTypes.bool
};

export default TarjetPrincipal;
