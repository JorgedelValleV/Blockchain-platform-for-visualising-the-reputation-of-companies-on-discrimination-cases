/* eslint-disable */

import React from 'react';
import {  Typography } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles'
import { Button, Box, Paper, Grid} from '@material-ui/core';
import Logo from 'assets/images/blockchain.png'
import { styled, useTheme } from '@mui/material/styles';


const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(4),
        //margin: '2rem',
        backgroundColor:'#fff  ',
    },
  }));

const HeaderExampleUsersIcon = () => {
  const classes = useStyles();
  const theme = useTheme();


  return (

  <div>
    <div className="ui grid intro">
        <div className="row">
            <div className="column center aligned">


            <Grid container direction="column">
              <Grid item sx={{ mb: 0.75 }}>
                <Grid container alignItems="center">
                  <Grid item lg={10} xs={6}>
                    <Typography
                              component = {'span'}
                              sx={{
                                  fontSize: '1.4rem',
                                  fontWeight: 500,
                                  color: theme.palette.secondary.dark
                              }}
                              align='left'
                          >
                    <h1 >                 
                      Plataforma Blockchain 
                      </h1>
                    </Typography>
                  </Grid>
                  <Grid item lg={2} xs={6}>
                    <Box 
                              display="flex" 
                              alignItems="center"
                              justifyContent="center"
                          >
                              <img src={Logo} 
                                  alt="logo"
                                  width='112'
                                  height="112" 
                              />
                    </Box>

                  </Grid>
                </Grid>
              </Grid>
            </Grid>



                  <Typography
                      component = {'span'}
                      sx={{
                          fontSize: '1.4rem',
                          fontWeight: 500,
                          color: theme.palette.secondary.dark
                      }}
                      align='left'
                  >
                    <h3>Reputación de empresas sobre casos de Discriminación</h3>
                  </Typography>

            </div>
        </div>
    </div>
     
  </div>

)
  }

export default HeaderExampleUsersIcon


