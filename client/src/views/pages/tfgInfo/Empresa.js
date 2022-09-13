import React, { useState, useEffect } from 'react'
import {  Box, Grid, Typography } from '@mui/material';

import { styled } from '@mui/material/styles';
import MainCard from 'ui-component/cards/MainCard';

const CardWrapper = styled(MainCard)(({ theme }) => ({
    color: theme.palette.secondary.dark,
    backgroundColor: '#fff',
    overflow: 'hidden',
    position: 'relative',
    span:"1.1rem" ,
    margin:"1rem 0 1rem" ,
}));

const Empresa = ({ foto, link, nombre }) => {
    return (
         <CardWrapper sx={{
                p: 1,
                width: '100%',
                height: 170,
                backgroundColor: '#fff',
                '&:hover': {
                backgroundColor: '#fff',
                opacity: [0.9, 0.8, 0.7],
                },
            }} border={false} content={false}>
             <Box 
                margin = {2} 
                span="2rem" 
                >
                <a href={link}  >
                    <Typography
                        margin = {2}
                        sx={{
                            fontSize: '0.8rem',
                            fontWeight: 500,
                            color: '#276fe6 '
                        }}
                        align='center'
                    >
                        {nombre}
                    </Typography>
                
                    <p></p>
                    <Box 
                        margin = {2}
                        display="flex" 
                        alignItems="center"
                        justifyContent="center"
                    >
                        <img  src={foto} 
                            style={{ maxWidth: 100, maxHeight: 80 }}
                            alt="logo"
                        />
                    </Box>
                </a>
        
            
            
        </Box>
     </CardWrapper>
 
    );
};



export default Empresa;

