import React, { useState, useEffect } from 'react';
import { Table , TableBody , TableCell , TableContainer , TableHead ,TableRow , Paper , Grid } from '@material-ui/core';
import {createUseStyles} from 'react-jss';
import EditIcon from '@material-ui/icons/Edit';


export default function DeviceList(props) {
    
    const useStyles = createUseStyles((theme) => ({
        myTable: {
            width: '100%',
            margin: '2% 0 2% 0'
            
        },
        tableContainer:{
            backgroundColor: '#f5f5f5'
        }
        
    }));

    const classes = useStyles();

    function handleEdit(i){
        console.log(i)
        props.setFormOpen(true,i);
    }  
  return (
    <div>
        <Grid container spacing={2} justify="center" className={classes.tableContainer} >
            <Grid item xs={12}>
                <TableContainer component={Paper}>
                    <Table className={classes.myTable}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">NAME & SERIAL</TableCell>
                                <TableCell align="center">MODEL</TableCell>
                                <TableCell align="center">NOTE</TableCell>
                                <TableCell ></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.devices.map((row,i) => (
                                <TableRow key={i}>
                                    <TableCell align="center" columnSpan={2}>
                                        {row.name}
                                        <br />
                                        <br />
                                        {row.serial}
                                    </TableCell>
                                    <TableCell align="center">{row.model}</TableCell>
                                    <TableCell align="center">{row.note}</TableCell>
                                    <TableCell align="center" onClick={()=>handleEdit(i)}><EditIcon color="primary"/>EDIT</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    </div>

  );
}