/* eslint-disable */

import React, {useContext, useState, useEffect } from 'react'
import {  Typography } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles'
import { Button, Box, Paper, Grid} from '@material-ui/core';
import { styled, useTheme } from '@mui/material/styles';
import {GoogleSpreadsheet} from "google-spreadsheet";
import { context } from '../../../contextProvider.js';


const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(4),
        //margin: '2rem',
        backgroundColor:'#fff  ',
    },
  }));

const HeaderCompany = ({ name }) => {
  const classes = useStyles();
  const theme = useTheme();
  const Context = useContext(context);


  return (

  <div>
    <div className="ui grid intro">
        <div className="row">
            <div className="column center aligned">


            <Grid container direction="column">
              <Grid item sx={{ mb: 0.75 }}>
                <Grid container alignItems="center">
                  <Grid item lg={9} xs={8}>
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
                        {name}
                      </h1>
                    </Typography>
                  </Grid>
                  <Grid item lg={3} xs={8}>
                    <Box 
                              display="flex" 
                              alignItems="center"
                              justifyContent="center"
                          >
                            {Context.empresas?.filter((company) => ((company.idNombre) == name)).map((company ) => (
                                              
                                <img src= {company.url_imagen}
                                    alt="logo"
                                    height="163"
                                    key = {company.idNombre}
                                />
                              ))}
                              
                    </Box>

                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            </div>
        </div>
    </div>
     
  </div>

)
  }

export default HeaderCompany


