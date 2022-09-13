import PropTypes from 'prop-types';

// material-ui
import { useTheme, styled } from '@mui/material/styles';

// project imports
import RankingItem from './RankingItem';
import { Grid, Typography } from '@mui/material';
import TotalIncomeCard from 'ui-component/cards/Skeleton/TotalIncomeCard';
import MainCard from 'ui-component/cards/MainCard';



const CardWrapper = styled(MainCard)(({ theme }) => ({
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.grey[900],
    overflow: 'hidden',
    position: 'center'
}));

const RankingComponent = ({ isLoading, titulo, companies }) => {
    const theme = useTheme();


    return (
        <>
            {isLoading ? (
                <TotalIncomeCard />
            ) : (
                <CardWrapper border={false} content={false}>
                <Grid container spacing={0.5} alignItems="center">
                    <Grid item align="center">
                        <Grid container alignItems="center">
                            <Grid item align="center">
                                <Typography sx={{ fontSize: '1.50rem', fontWeight: 700, mr: 2.75, mt: 1.75, mb: 0.75 }}>
                                    {titulo}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid container spacing={0.5}>
                        {companies.map((item, index) => { 
                            return( <Grid item sm={6} xs={12} md={6} lg={12}>
                                        <RankingItem isLoading= {isLoading} name={item[0]} reputation={item[1]} number={index}/>
                                    </Grid>)})}
                    </Grid>
                    </Grid>
                </CardWrapper>
            )}
        </>
    );
};

RankingComponent.propTypes = {
    isLoading: PropTypes.bool
};

export default RankingComponent;
