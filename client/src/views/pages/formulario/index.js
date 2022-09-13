
import { useEffect , useState} from 'react';
import { Grid } from '@mui/material';
import 'semantic-ui-css/semantic.min.css';
import Formulario from './form';
import { gridSpacing } from 'store/constant';
import TotalGrowthBarChart from 'ui-component/cards/Skeleton/PopularCard';



const Form = () => {



    const [isLoading, setLoading] = useState(true);
    
    useEffect(() => {
        setLoading(false);
    }, []);
    


    return (
        isLoading ? (
            <TotalGrowthBarChart />
        ) :(
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Formulario/>
                </Grid>
            
            </Grid>
        )
    
    );
};

export default Form;
