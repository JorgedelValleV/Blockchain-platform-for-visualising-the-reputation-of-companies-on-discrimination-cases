import PropTypes from 'prop-types';
import React from 'react';
import { useContext, useEffect, useState } from 'react';
import {  Card, Image } from 'semantic-ui-react';
import { Button} from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { context } from '../../../contextProvider.js';

const CompanyItem = ({ name, reputation }) => {
  const Context = useContext(context);
  return (
    <Card>
      <Card.Content>
        {Context.empresas?.filter((company) => ((company.idNombre) == name)).map((company ) => (

          <img   src={ company.url_imagen }
            alt="logo"
            style={{ maxWidth: 150, maxHeight: 150 }}

          />

   
        ))}
        <p></p>
        <Card.Header>{name}</Card.Header>
        <Card.Meta>Reputación: <strong>{reputation.substring(0,3)}/10</strong></Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
            
            <NavLink to={`/views/pages/company/${name}`}>
              <Button  style={{backgroundColor:"#EDE7F6", fontSize:"12px"}}  variant="contained" >Ver empresa</Button>
            </NavLink>

        </div>
      </Card.Content>
    </Card>
  )
}
CompanyItem.propTypes = {
  isLoading: PropTypes.bool
};


export default CompanyItem;
