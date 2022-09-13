import PropTypes from 'prop-types';
import React, {useContext } from 'react'

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { context } from '../../../contextProvider.js';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import TotalIncomeCard from 'ui-component/cards/Skeleton/TotalIncomeCard';
import StarIcon from '@mui/icons-material/Star';
import StarHalf from '@mui/icons-material/StarHalf';
import StarBorder from '@mui/icons-material/StarBorder';
import { NavLink } from 'react-router-dom';


// styles
const CardWrapper = styled(MainCard)(({ theme }) => ({
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: `linear-gradient(210.04deg, ${theme.palette.primary.dark} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
        borderRadius: '50%',
        top: -30,
        right: -180
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: `linear-gradient(140.9deg, ${theme.palette.primary.dark} -14.02%, rgba(144, 202, 249, 0) 70.50%)`,
        borderRadius: '50%',
        top: -160,
        right: -130
    }
}));



// ==============================|| DASHBOARD - TOTAL INCOME LIGHT CARD ||============================== //

const RankingItem = ({ isLoading, name, reputation, number }) => {
    const theme = useTheme();
    const Context = useContext(context);
    const fullStars=Math.floor(reputation/2);
    const medStars= (Math.trunc(reputation)%2)*fullStars +1;
  
    return (
        <>
            {isLoading ? (
                <TotalIncomeCard />
            ) : (
                <NavLink to={`/views/pages/company/${name}`}>
                <CardWrapper border={false} content={false}>
                    <Box sx={{ p: 1 }}>
                        <List sx={{ py: 0 }}>
                            <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
                                <ListItemAvatar>
                                {Context.empresas?.filter((company) => ((company.idNombre) == name)).map((company ) => (

                                    <img   src={ company.url_imagen }
                                    alt="logo"
                                    style={{ maxWidth: 50, maxHeight: 50 }}

                                    />


                                ))}

                                </ListItemAvatar>
                                <ListItemText
                                    sx={{
                                        py: 0,
                                        mt: 0.45,
                                        mb: 0.45
                                    }}
                                    primary={<Typography variant="h4">{name}</Typography>}
                                    secondary={
                                        <Typography
                                            variant="h5"
                                            sx={{
                                                color: theme.palette.grey[500],
                                                mt: 0.5
                                            }}
                                        >
                                            {reputation.substring(0,3)}/10 reputacion
                                        </Typography>
                                    }
                                />
                                 <ListItemAvatar>
                                     {
                                         [...new Array(5)].map((star,index)=>{
                                             
                                             return index < fullStars ? <StarIcon style={{fill: theme.palette.primary[800]}}/> : (index+1== medStars)? <StarHalf style={{fill: theme.palette.primary[800]}}/> : <StarBorder style={{fill: theme.palette.primary[800]}}/>
                                         })
                                    }
                                    
                                 </ListItemAvatar>
                                
                            </ListItem>
                        </List>
                    </Box>
                </CardWrapper>
                </NavLink>
            )}
        </>
    );
};

RankingItem.propTypes = {
    isLoading: PropTypes.bool
};

export default RankingItem;
