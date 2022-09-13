import React, { useState, useContext, useEffect } from "react";
import { context } from '../../../contextProvider.js';
import Web3 from 'web3';
import ReputationControl from '../../../ReputationControl.json';
import { useForm } from 'react-hook-form';
import * as data from './constantData';
import swal from 'sweetalert';
import Swal from 'sweetalert2';
import axios from 'axios';
import { create as ipfsHttpClient } from "ipfs-http-client";
import {Box, Button, Typography} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import levenshtein from 'js-levenshtein';

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");


const Formulario = () => {

  const { handleSubmit, register, formState: { errors, isSubmitting, isSubmitSuccessful }} = useForm(/*{ shouldUnregister : true}*/);
  const [companies, setCompanies] = useState([]);
  const [open, setOpen] = useState(true);

  const Context = React.useContext(context);
  let hash = "";

  useEffect(()=>{
    Context.contract.methods.getCompaniesNames().call().then(response => setCompanies(response));
  },[])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  //Obtener la fecha actual
  function formatoFecha(fecha, formato) {
    const map = {
        dd: fecha.getDate(),
        mm: fecha.getMonth() + 1,
        yy: fecha.getFullYear().toString().slice(-2),
        yyyy: fecha.getFullYear()
    }
    return formato.replace(/dd|mm|yy|yyy/gi, matched => map[matched])
  }
  

  //Función para realizar la transaccion al recibir los parametros
  async function newComplaint(transaction) {
      const tx = {
          to      : process.env.REACT_APP_CONTRACT_ADDRESS, //Dirección del contrato
          data    : transaction.encodeABI(),      //
          gas     : await transaction.estimateGas({from: process.env.REACT_APP_ADDRESS}),   //Se estima el coste en gas
          gasPrice: await Context.web3.eth.getGasPrice(),   //Precio del gas
          gaslimit: 0x1000000,   //Limite de gas que se puede gastar
          value   : 0,   //No se va a realizar una transferencia
      };
      console.log("transacción construida");
      //Se firma la transacción con la clave privada
      const signedTx  = await Context.web3.eth.accounts.signTransaction(tx, process.env.REACT_APP_ETH_PRIVATE_KEY);
      console.log("transacción firmada");
      //Se envia la transaccion firmada 
      await Context.web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  }


  const submitForm = async (data,e) => {
    e.preventDefault();

    //Comprobar que el usuario esta conectado a linkedin
    if(!Context.user){
      console.log("El usuario no está conectado");
      swal({
        title: "ERROR",
        text: "¡Debes estar conectado para enviar una denuncia!",
        icon: "error",
        button: "Aceptar"
      });
    }

    else{
      //Obtener fecha
      const fecha = new Date();
      fecha.toLocaleDateString();
      const date = formatoFecha(fecha, 'dd/mm/yy');

      Swal.fire({
        title: 'La denuncia está siendo cargada en la blockchain',
        timer: 1000000,
        timerProgressBar: false,
        didOpen: () => {
          Swal.showLoading()
        }
      });
      
      //Añadir datos a la bbdd para graficas generales
      let gender = data.gender.toLowerCase()

      const options= ["masculino", "hombre", "femenino", "mujer", "no binario",
      "lesbiana", "gay", "homosexual", "transexual", "bisexual", "polisexual", "Pansexual", "Omnisexual", "Skoliosexual", "Demisexual", "Grisexual", 
      "Asexual", "Poliamoroso", "Intersexual", "Agénero", "Género fluido", "Bigénero", "Trigénero", "Pangénero", "Poligénero", "Andrógino",
      "Intergénero", "non-conforming", "Homorromántico", "Birromántico", "Panromántico", "Arromántico", "Antrosexual", "Cisgénero", "Transgénero"];
      let m = 10;
      let index = 0;
      for(let i = 0; i< options.length;i++){
          let l=levenshtein(options[i],gender);
          if(l < m){
              m = l;
              index =i;
          }
      }
      if (gender=="")gender = "prefiero no responder";
      else if (m>3) gender = "otro";
      else {
        if (index <=1) gender = "masculino";
        else if (index <=3) gender = "femenino";
        else gender = "no binario";
      }

      let age = parseInt(data.age)
      let rangeAge;
      if(Number.isNaN(data.age))
        rangeAge = "prefiero no responder"
      else if(age>=81)
        rangeAge = "más de 80"
      else if(age>=71)
        rangeAge = "71-80"
      else if(age>=61)
        rangeAge = "61-70"
      else if(age>=51)
        rangeAge = "51-60"
      else if(age>=41)
        rangeAge = "41-50"
      else if(age>=31)
        rangeAge = "31-40"
      else if(age>=21)
        rangeAge = "21-30"
      else
        rangeAge = "16-21"
        
        let complaintJson = 
        {
          "text": data.text,
          "date": date,
          "type": data.type.toLowerCase(),
          "etnia": data.etnia,
          "gender": gender,
          "age": rangeAge,
          "relation": data.relation.toLowerCase(),
          "previousComplaints": data.previousComplaints !== null ? data.previousComplaints : "-",
          "media" : data.media,
        }

      hash = await client.add(JSON.stringify(complaintJson));
      
      //Relizar la denuncia
      try{
        await newComplaint(Context.contract.methods.newComplaint(data.company, hash.path));
        
        let complaintBBDD = {
          "type": data.type.toLowerCase(),
          "gender": gender,
          "age": rangeAge,
          "relation": data.relation.toLowerCase()
        }
  
        //Enviar datos de denuncia a BBDD para gráficas
        axios.post(`${process.env.REACT_APP_SERVER_URL}/charts`, complaintBBDD, { withCredentials : true})
        
        Swal.fire({
          title: "Denuncia cargada",
          text: "La denuncia ya ha sido registrada en la blockchain",
          icon: "success",
          timer: "10000"
        }).then(function () {//Volver a la pagina principal
          window.location.href = `http://localhost:3000`;
        });  
      
      }
      catch(err){
        console.log(err.message);
        swal({
          title: "ERROR",
          text: "Algo ha ido mal a la hora de subir la denuncia a la blockchain. Vuelva a intentarlo más tarde",
          icon: "error",
          button: "Aceptar"
        });
      }
      
      
      
      //Restaurar estado del formulario
      e.target.reset();
    }
  }


  return(
    <>
    <Dialog open={open} 
        onClose={handleClose} 
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">
          <Typography variant = "h3">
            Formulario de denuncia
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography variant = "h5">
            Recuerde que todos los datos incluídos se almacenan en la blockchain y en IPFS, un sistema de ficheros descentralizado. 
            Por tanto, son de caracter público. Debe seleccionar obligatoriamente la empresa, su situación actual con dicha compañía, 
            el tipo de denuncía y la descripción del suceso. Es libre de introducir el resto de datos que considere oportuno. Además, se utilizarán para elaborar las gráficas de la aplicación
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>Ok</Button>
        </DialogActions>
    </Dialog>

    <form className="ui form" onSubmit = {handleSubmit(submitForm)}>
    <h1 className="ui dividing header">Formulario de Denuncia</h1>
    <div className="field">
      <div className="two fields">

        {/*Nombre empresa*/}
        <div className="required field">
          <label>Nombre de la empresa</label>
          <select
            className="ui fluid selection dropdown"
            {...register("company", {
              validate : value => value !== "Seleccione la empresa"
            })}>
              <option hidden>Seleccione la empresa</option>
              {companies.map(item => <option value={item} key={item}>{item}</option>)}
          </select>
          {errors.company && <div className = "ui negative message">
                    <div className = "header">Debe seleccionar la empresa</div></div>}
        </div>
        
        
        {/*Relación con empresa*/}
        <div className="required field">
          <label>Relación actual con la empresa</label>
          <select 
            className="ui fluid selection dropdown" 
            {...register("relation", {
              validate : value => value !== "Seleccione la relación actual con la empresa"
            })}>
              <option hidden>Seleccione la relación actual con la empresa</option>
              {data.relations.map(item => <option value={item} key={item}>{item}</option>)}
          </select>
          {errors.relation && <div className = "ui negative message">
                    <div className = "header">Debe seleccionar la relación actual con la empresa</div></div>}
        </div>
      </div>
    </div>


    <div className="three fields">

      {/*Denunciado antes*/}
      <div className="inline fields">
        <label>¿Has denunciado anteriormente?</label>
        <div className="field">
          <div className="ui radio checkbox">
            <input 
              type="radio"
              {...register("previousComplaints")}
              value = {true}/>
            <label>Sí</label>
          </div>
        </div>

        <div className="field">
          <div className="ui radio checkbox">
            <input 
              type="radio"
              {...register("previousComplaints")}
              value = {false}/>
            <label>No</label>
          </div>
        </div>
      </div>

      {/*Mediante que medio denunciaste*/}
      <div className="field">
        <label>Medio</label>
        <input 
          type="text"
          {...register("media")} 
          placeholder="En caso afirmativo, ¿mediante qué medio?"/>
      </div>

      {/*Fecha del suceso*/}
      <div className="field">
      <label>Fecha aproximada del suceso o del inicio de este</label>
      <div className="two fields">
        <div className="field">
          <select 
            className="ui fluid search dropdown" 
            {...register("month")} >
              <option hidden>Seleccione el mes</option>
              {data.months.map(item => <option value={item} key={item}>{item}</option>)}
          </select>
        </div>

        <div className="field">
          <input 
            type="text"
            {... register('year', {
              valueAsNumber : true,
              maxLength : 4,
              minLength : 4
            })}  
            placeholder="Año"/>
          {errors.year && <div className = "ui negative message">
                    <div className = "header"> Debe escribir correctamente el año</div></div>}
        </div>
      </div>
      </div>
    </div>
      
  <div className="field">      
    {/*Tipo de denuncia*/}
    <div className="required field">
      <label>Tipo de denuncia</label>
      <select 
        className="ui fluid dropdown"
        {...register('type', {
          validate : value => value !== "Seleccione el tipo de denuncia"
        })}>
          <option hidden>Seleccione el tipo de denuncia</option>
          {data.complaintTypes.map(item => <option value={item} key={item}>{item}</option>)}
      </select>
    </div>
    {errors.type && <div className = "ui negative message">
                    <div className = "header">Debe seleccionar el tipo de denuncia</div></div>}
  </div>
  


  {/*El usuario deberá solo responder obligatoriamente a aquella relacionada con su tipo de denuncia. El resto son opcionales*/}
  <div className="five fields">
  <label>Introduzca los datos que considere oportunos</label>
    {/*Género*/}
    <div className="field">
    <input 
          type="text"
          {...register("gender")} 
          placeholder="Género"/>
    </div>

    {/*Discapacidad*/}
    <div className="field">
        <input 
          type="text"
          {...register("discapacidad")}
          placeholder="Discapacidad"/>
    </div>

    {/*País*/}
    <div className="field">
    <input 
          type="text"
          {...register("etnia")} 
          placeholder="Etnia"/>
    </div>

    {/*Edad*/}
    <div className="field">
      <input 
        type="text"
        {... register('age', {
          valueAsNumber : true,
          maxLength : 3
        })} 
        placeholder="Edad"/>
      {errors.age && <div className = "ui negative message">
                    <div className = "header"> Debe escribir correctamente su edad</div></div>}
    </div>

    {/*Religión*/}
    <div className="field">
      <input 
        type="text"
        {...register("religion")} 
        placeholder="Religión"/>
    </div>
  </div>    

  {/*El usuario contará su historia*/} 
  <div className="required field">
  <label >Descripción del suceso</label>
      <textarea  
        {...register('text', {
          required : true,
        })}
        placeholder="Cuéntanos tu historia"
        style={{ minHeight: 50 }}/>
  {errors.text && <div className = "ui negative message">
                    <div className = "header">Debe describir el suceso</div></div>}
  </div>

    {/*Botón para permitir compartir la historia. No es obligatorio para el usuario
    <div className="ui segment">
      <div className="field">
        <div className="ui checkbox">
          <input 
            type="checkbox"
            {...register("consent")}/>
          <label>Acepto que mi historia aparezca publicada de forma anónima</label>
        </div>
      </div>
    </div>
    
    
    
      */}
    <button className = "ui button" type = "submit">Enviar denuncia</button>
  </form>
  </>
  );
};
export default Formulario;
