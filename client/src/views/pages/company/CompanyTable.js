import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { toString as uint8ArrayToString } from 'uint8arrays/to-string';

import MaterialTable , { MTableToolbar, MTableFilterRow, MTablePagination } from "material-table";

import {Grid, Button} from '@material-ui/core';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { styled, useTheme } from '@mui/material/styles';

import { makeStyles } from '@material-ui/core/styles'

import { 
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    TablePagination,
    TableFooter
 } from '@material-ui/core';


  import { Avatar } from '@mui/material';


const useStyles = makeStyles((theme) => ({
    table: {
      minWidth: 650,
    },
    tableContainer: {
        borderRadius: 15,
        margin: '10px 10px',
        maxWidth: 950
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        backgroundColor: '#5e35b1',
        color: theme.palette.getContrastText(theme.palette.primary.main)
    },
    avatar: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.getContrastText(theme.palette.primary.main)
    },
    tipo: {
        fontWeight: 'bold',
        color: theme.palette.primary.dark,
    },
    status: {
        fontWeight: 'bold',
        fontSize: '0.75rem',
        color: 'white',
        backgroundColor: 'grey',
        borderRadius: 8,
        padding: '3px 10px',
        display: 'inline-block'
    }
  }));

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

const CompanyTable = ({ complaints }) => {

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [open, setOpen] = React.useState(false);
  const [indexToShow, setIndexToShow] = useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

 
  return (
    <TableContainer  className={classes.tableContainer}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeaderCell}>Tipo de Denuncia</TableCell>
            <TableCell className={classes.tableHeaderCell}>Denunciada antes</TableCell>
            <TableCell className={classes.tableHeaderCell}>Fecha</TableCell>
            <TableCell className={classes.tableHeaderCell}>Descripción</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/*filas.slice(page*rowsPerPage, page*rowsPerPage + complaints.length%rowsPerPage)*/}
          {complaints.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row,index) => (
            <TableRow key={index}>
              <TableCell>
                  <Grid container>
                      <Grid item lg={2}>
                          <Avatar alt={row.type.charAt(0).toUpperCase() + row.type.slice(1)} src='.' className={classes.avatar}/>
                      </Grid>
                      <Grid item lg={10}>
                          <Typography   variant="subtitle1" className={classes.tipo}>{row.type.charAt(0).toUpperCase() + row.type.slice(1)}</Typography>
                      </Grid>
                  </Grid>
                </TableCell>
              <TableCell>
                  <Typography color="primary" variant="subtitle2">{row.denunciada}</Typography>
                  <Typography color="textSecondary" variant="body2">{row.media}</Typography>
                </TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>
                <Button onClick={()=>{setIndexToShow(index); setOpen(true)}}>
                  <Typography 
                    variant="button"
                    className={classes.status}
                    style={{
                        backgroundColor: 
                        'green'
                     }}
                  >{"Leer Experiencia"}</Typography>
                  </Button>
                  {indexToShow == index &&
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"Experiencia de este usuario:"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        {row.text}
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose} autoFocus>Cerrar</Button>
                    </DialogActions>
                  </Dialog>}
                </TableCell>
            </TableRow>
                    ))}
        </TableBody>
        <TableFooter>
        <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={complaints.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export default CompanyTable;