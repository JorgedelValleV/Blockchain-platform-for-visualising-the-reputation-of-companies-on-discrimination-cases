import PropTypes from 'prop-types';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography, TextField, Button } from '@mui/material';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import { ethers } from "ethers";
import { context } from '../../../contextProvider.js';
import React, { useState, useEffect, useContext } from 'react';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import TotalIncomeCard from 'ui-component/cards/Skeleton/TotalIncomeCard';

// assets
import MoodIcon from '@mui/icons-material/Mood';
// styles
const CardWrapper = styled(MainCard)(({ theme }) => ({
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.light,
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: `linear-gradient(210.04deg, ${theme.palette.primary[200]} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
        borderRadius: '50%',
        top: -30,
        right: -180
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: `linear-gradient(140.9deg, ${theme.palette.primary[200]} -14.02%, rgba(144, 202, 249, 0) 77.58%)`,
        borderRadius: '50%',
        top: -160,
        right: -130
    }
}));

// ==============================|| DASHBOARD - TOTAL INCOME DARK CARD ||============================== //

const DonationButtonCard = ({ isLoading, amountDonated, addDonation }) => {
    const theme = useTheme();

    const [amount, setAmount] = React.useState(""); //cantidad a donar en ethers
    const [open, setOpen] = React.useState(false);
    const [unidades, setUnidades] = React.useState("wei");
    
    const Context = React.useContext(context);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
       setOpen(false);
    };

    const handleChangeUnities = (e) => {
        setUnidades(e.target.value);
    }

    const handleChangeAmount = (e) => {
        setAmount(e.target.value);
    }

    const handleDonation = async (e) => {
        try{
            if(!window.ethereum) //Para ver si el usuario tiene cartera
                throw new Error("No se encontro cartera de metamask.");
            await window.ethereum.send("eth_requestAccounts");
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            console.log("enviando transaccion")
            const tx = await signer.sendTransaction({
                to: process.env.REACT_APP_ADDRESS,
                value:  ethers.utils.parseUnits(amount, unidades),
                gasPrice: signer.getGasPrice(),
                gasLimit : 100000
            });
            setOpen(false);
            let amountInEthers;
            switch(unidades){
                case "wei":
                    amountInEthers = parseFloat(amount)/Math.pow(10,18);
                    break;
                case "gwei":
                    amountInEthers = parseFloat(amount)/Math.pow(10,9);
                    break;
                case "ether":
                    amountInEthers = parseFloat(amount);
                    break;
            }

            addDonation(amountInEthers);
            
            //Actualizar contrato inteligente:
            
            const transaction = Context.contract.methods.changeAmountDonated((parseFloat(amountDonated) + amountInEthers).toString());

            const ty = {
                to      : process.env.REACT_APP_CONTRACT_ADDRESS, //Dirección del contrato
                data    : transaction.encodeABI(),      //
                gas     : await transaction.estimateGas({from: process.env.REACT_APP_ADDRESS}),   //Se estima el coste en gas
                gasPrice: await Context.web3.eth.getGasPrice(),   //Precio del gas
                gaslimit: 0x1000000,   //Limite de gas que se puede gastar
                value   : 0,   //No se va a realizar una transferencia
            };
            const signedTx  = await Context.web3.eth.accounts.signTransaction(ty, process.env.REACT_APP_ETH_PRIVATE_KEY);
            const tyL = await Context.web3.eth.sendSignedTransaction(signedTx.rawTransaction);
            console.log(tyL);
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            {isLoading ? (
                <TotalIncomeCard />
            ) : (
                <CardWrapper border={false} content={false}>
                    <Box sx={{ p: 2 }}  onClick = {handleClick}>
                        <List sx={{ py: 0 }}>
                            <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
                                <ListItemAvatar >
                                    <Avatar
                                        variant="rounded"
                                        sx={{
                                            ...theme.typography.commonAvatar,
                                            ...theme.typography.largeAvatar,
                                            backgroundColor: theme.palette.primary[800],
                                            color: '#fff'
                                        }}
                                    >
                                        <MoodIcon fontSize="inherit" />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    sx={{
                                        py: 0,
                                        mt: 0.45,
                                        mb: 0.45
                                    }}
                                    primary={
                                        <Typography variant="h2" sx={{ color: '#fff' }}>
                                            DONAR
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography variant="subtitle2" sx={{ color: 'primary.light', mt: 0.25 }}>
                                            Gracias por tu ayuda 
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        </List>
                    </Box>
                    <Dialog
                    open={open}
                    onClose={handleClose}
                    disableEscapeKeyDown = {false}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  > 
                        <DialogTitle> Introduzca cantidad a donar </DialogTitle>
                        <DialogContent>
                        <Box
                            noValidate
                            component="form"
                            sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            m: 'auto',
                            width: 'fit-content',
                            }}
                        >
                            <FormControl sx={{ mt: 2, minWidth: 120 }}>
                            <InputLabel htmlFor="unidades">Unidades</InputLabel>
                            <Select
                                autoFocus
                                value={unidades}
                                onChange={handleChangeUnities}
                                label="maxWidth"
                                inputProps={{
                                name: 'unidades',
                                id: 'unidades',
                                }}
                            >
                                <MenuItem value="wei">wei</MenuItem>
                                <MenuItem value="gwei">gwei</MenuItem>
                                <MenuItem value="ether">ether</MenuItem>
                            </Select>
                            </FormControl>
                            <br/>
                            <TextField id="outlined-basic" label="Amount" value = {amount} onChange = {handleChangeAmount}/>
                        </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick = {handleDonation}>Donar</Button>
                            <Button onClick = {handleClose}>Cerrar</Button>
                        </DialogActions>
                  </Dialog>
                </CardWrapper>
            )}
        </>
    );
};

DonationButtonCard.propTypes = {
    isLoading: PropTypes.bool
};

export default DonationButtonCard;