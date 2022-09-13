/* eslint-disable */
import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, Grid, Menu, MenuItem, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';


const CardWrapper = styled(MainCard)(({ theme }) => ({
    backgroundColor:  '#fff',
    color: theme.palette.secondary.dark,
    overflow: 'hidden',
    position: 'relative'
}));


// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const ReputationInfoCard = ({ isLoading }) => {
    const theme = useTheme();



    return (
        <>
            {isLoading ? (
                <SkeletonEarningCard />
            ) : (
                <CardWrapper border={false} content={false}>
                    <Box sx={{ p: 4. }}>
                        <Grid container direction="column">
                            <Grid item>
                                <Typography sx={{ fontSize: '2rem', fontWeight: 800, mr: 1, mt: 1.75, mb: 0.75 }}>
                                    ¿Cómo se calcula la reputación?
                                </Typography>
                            </Grid>
                            
                            <Grid item xs={12}>
                                <Typography 
                                    component = {'span'}
                                    sx={{
                                        fontSize: '1rem',
                                        fontWeight: 500,
                                        color: theme.palette.secondary.dark
                                    }}
                                    align='left'
                                    margin = {12}
                                >
                                    <p></p>
                                    
                                    <p color= '#3949ab'>
                                      La reputación mostrada en esta plataforma se calcula de acuerdo con tres valores reputacionales distintos. Los dos primeros son las reputaciones de las plataformas Indeed y Glasdoor de esas empresas. El tercero es una reputación interna que se calcula según el número de denuncias que recibe cada empresa en esta web, a más denuncias la reputación decrece. Para calcular la reputación final se asigna unos pesos a cada uno de los tres valores reputaciones, que en total suman 1, siendo los pesos de los valores de Indeed y Glassdoor siempre iguales. Estos pesos se ajustan según el número denuncias que se reciben en nuestro plataforma. Al inicio, cuando el número de denundias a través de esta plataforma es bajo, el peso de la reputación calculada en base a estas es bajo y va aumentando según el uso de la web aumenta y se reciben más denuncias.
                                    
                                    </p>
                                    
                                </Typography>
                            </Grid>
                            
                            
                        </Grid>
                    </Box>
                </CardWrapper>
            )}
        </>
    );
};

ReputationInfoCard.propTypes = {
    isLoading: PropTypes.bool
};

export default ReputationInfoCard;
