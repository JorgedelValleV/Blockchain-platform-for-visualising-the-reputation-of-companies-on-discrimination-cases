import React from 'react'
import { Button, Card, Image } from 'semantic-ui-react'
// import { useHistory } from "react-router-dom";


const CompanyItem =({name,reputation,urlimg}) =>{
  /* let history = useHistory();

  const company = () => {
    history.push('/company')
  } */
  return(
    <Card>
      <Card.Content>
        <Image
          floated='right'
          size='small'
          src={'../../../Images/telefonica.png'}
        />
        <Card.Header>Mi experiencia:</Card.Header>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='blue' onClick = 'views/pages/company' >
            Cerrar
          </Button>
        </div>
      </Card.Content>
    </Card>
  )
}

export default CompanyItem;