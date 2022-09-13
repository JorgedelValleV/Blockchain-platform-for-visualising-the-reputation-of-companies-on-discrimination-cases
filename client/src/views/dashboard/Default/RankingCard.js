import PropTypes from 'prop-types';
// material-ui
import { useTheme } from '@mui/material/styles';
import {  CardContent, Grid,  Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';

// assets
import RankingComponent from './RankingComponent.js';

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //



const RankingCard = ({ isLoading, cr }) => {

    const theme = useTheme();
    const best = cr.sort((a,b) => (parseFloat(a[1]) > parseFloat(b[1]) ? 1 : parseFloat(a[1]) < parseFloat(b[1]) ? -1 : 0));

    return (
        <>
            {isLoading ? (
                <SkeletonPopularCard />
            ) : (
                <MainCard content={false} >
                    <CardContent>
                        
                        <Grid container alignContent="right" item xs={12} sx={{ pt: '16px !important' }}>
                            <Grid item  md={12} xs={12} >
                                <RankingComponent isLoading= {isLoading} titulo = "TOP 5 MEJOR VALORADAS" companies = {best.slice(-5).reverse()}/>
                            </Grid> 
                              
                        </Grid>
                        
                        <Grid container alignContent="right" item xs={12} sx={{ pt: '16px !important' }}>
                            <Grid item md={12} xs={12}>
                                <RankingComponent isLoading= {isLoading} titulo = "TOP 5 PEOR VALORADAS" companies = {best.slice(0,5)}/>
                            </Grid>
                        </Grid>
                
                     </CardContent>      
                                
                </MainCard>
            )}
        </>
    );
};

RankingCard.propTypes = {
    isLoading: PropTypes.bool
};

export default RankingCard;