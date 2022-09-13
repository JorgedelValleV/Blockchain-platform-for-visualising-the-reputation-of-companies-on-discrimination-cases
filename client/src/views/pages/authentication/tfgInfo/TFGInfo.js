/* eslint-disable */

import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';
// project imports

import DonationCard from './DonationCard';
import { gridSpacing } from 'store/constant';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const TFGInfo = () => {
/*     const [isLoading, setLoading] = useState(true);
 */    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        // dos filas
        <Grid container spacing={gridSpacing}>
            {/* fila 1 */}
            <Grid item xs={12}>
                {/* 3 columnas */}
                <Grid container spacing={gridSpacing}>
                    {/* columna 1 */}
                    <Grid item lg={4} md={6} sm={6} xs={12}>
{/*                         <EarningCard isLoading={isLoading} />
 */}                    </Grid>
                    {/* columna 2 */}
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                            <h1>HOLA</h1>
{/*                         <DonationCard isLoading={isLoading} />
 */}                    </Grid>
                    {/* columna 3 */}
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        {/* 2 filas en la 3º columna */}
                        <Grid container spacing={gridSpacing}>
                            {/* fila 1 en la 3º columna */}
                            <Grid item sm={6} xs={12} md={6} lg={12}>
{/*                                 <TotalIncomeDarkCard isLoading={isLoading} />
 */}                            </Grid>
                            {/* fila 2 en la 3º columna */}
                            <Grid item sm={6} xs={12} md={6} lg={12}>
{/*                                 <TotalIncomeLightCard isLoading={isLoading} />
 */}                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {/* fila 2 */}
            <Grid item xs={12}>
                 {/* 2 columnas */}
                <Grid container spacing={gridSpacing}>
                    {/* columna 1 */}
                    <Grid item xs={12} md={8}>
{/*                         <TotalGrowthBarChart isLoading={isLoading} />
 */}                    </Grid>
                    {/* columna 2 */}
                    <Grid item xs={12} md={4}>
{/*                         <PopularCard isLoading={isLoading} />
 */}                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default TFGInfo;