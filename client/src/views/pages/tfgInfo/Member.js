import React, { useState, useEffect } from 'react'
import {  Box, Grid, Typography } from '@mui/material';



const Member = ({ foto, linkedin, frase, nombre, rol }) => {
    return (
        <Box sx={{ p: 1 }} margin = {2}>
            <a href={linkedin}  >
                <Typography
                    margin = {2}
                    sx={{
                        fontSize: '1.5rem',
                        fontWeight: 500,
                        color: '#276fe6 '
                    }}
                    align='center'
                >
                    {nombre}
                </Typography>
            
                <p></p>
                <Box 
                    margin = {4}
                    display="flex" 
                    alignItems="center"
                    justifyContent="center"
                >
                    <img  src={foto} 
                        alt="logo"
                        width='150'
                        height="150" 
                    />
                </Box>
            </a>
        <Typography
            margin = {2}
            sx={{
                fontSize: '1rem',
                fontWeight: 500,
                color: '#4f87e4 '
            }}
            align='center'
        >
            {rol}
        </Typography>
        
        
    </Box>

    );
};



export default Member;

