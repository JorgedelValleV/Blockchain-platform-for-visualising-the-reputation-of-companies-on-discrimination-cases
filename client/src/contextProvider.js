import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Web3 from 'web3';
import { ethers } from "ethers";
import {GoogleSpreadsheet} from "google-spreadsheet";

import ReputationControl from './ReputationControl.json';

export const context = React.createContext({});

const ProviderA = (props) => {

    var [user, setUser] = useState(null);
    var [balance, setBalance] = useState(null);
    const pesos = [[0.5, 0], [0.45, 0.1], [0.4, 0.2], [0.325, 0.35]];
    const [hashIPFSdata, setHash] = useState("");
    const [data1, setData1] = useState([]); //para guardar los datos del googlesheet de miembros
    const [data2, setData2] = useState([]); //para guardar los datos del googlesheet de empresas
    //Si todavia no se ha conectado con Metamask entonces aparece un popup para la conexion
    const infuraUrl = process.env.REACT_APP_INFURA_URL;
    //Crea una instancia para comunicarse con el nodo indicado
    const web3 = new Web3(new Web3.providers.HttpProvider(infuraUrl));
    //Nos conectamos con el contrato
    const contract = new web3.eth.Contract(ReputationControl.abi, process.env.REACT_APP_CONTRACT_ADDRESS);
    const provider = ethers.getDefaultProvider("rinkeby");

    // Config variables
    const doc = new GoogleSpreadsheet(process.env.REACT_APP_SPREADSHEET_ID);
    
    useEffect(async () => {
        const readSpreadsheet = async () => {
            try {
                await doc.useServiceAccountAuth({
                client_email: process.env.REACT_APP_CLIENT_EMAIL,
                private_key: process.env.REACT_APP_PRIVATE_KEY,
            });
                // loads document properties and worksheets
                await doc.loadInfo();
                const sheet1 = doc.sheetsById[0];
                const sheet2 = doc.sheetsById[2017905833];
                const rows1 = await sheet1.getRows();
                const rows2 = await sheet2.getRows();
                setData1(rows1);
                setData2(rows2);
        
            } catch (e) {
                console.error('Error: ', e);
            }
            };
            readSpreadsheet();
        axios.get(`${process.env.REACT_APP_SERVER_URL}/getuser`, { withCredentials :true})
                .then((response) => {setUser(response.data);})
        
    }, []);
    return <context.Provider value={{ "user" : user, "web3" : web3, "contract": contract, "provider": provider, "miembros": data1, "empresas": data2, "pesos": pesos }}>{props.children}</context.Provider>;
}

export default ProviderA;
