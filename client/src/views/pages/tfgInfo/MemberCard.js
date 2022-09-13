import React, {useContext, useState, useEffect } from 'react'

import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react'
import Member from './Member'
import MainCard from 'ui-component/cards/MainCard';
// material-ui
import { styled } from '@mui/material/styles';
import {  Box, Grid, Typography } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles'
import {GoogleSpreadsheet} from "google-spreadsheet";
// project imports
import Button from 'semantic-ui-react';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';

import { context } from '../../../contextProvider.js';



// styles
const CardWrapper = styled(MainCard)(({ theme }) => ({
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
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 1000,
        backgroundColor: '#fff '
    },
  }));

// ==============================|| DASHBOARD - TOTAL ORDER LINE CHART CARD ||============================== //

const MemberCard = ({ isLoading, id }) => {
 
    const Context = useContext(context);



    console.log(id)
    return (
        <>
        {isLoading ? (
            <SkeletonEarningCard />
        ) : (
                <CardWrapper border={false} content={false}>
                        
                        {Context.miembros?.filter((member) => member.id==(id) )
                        .map((member ) => (
                            <Member
                            nombre = {member.nombre}
                            foto={member.foto}
                            linkedin={member.linkedin}
                            rol = {member.rol}
                            />
                            
                            
                        ))}

                </CardWrapper>)}
        </>
            
    );
};



export default MemberCard;

