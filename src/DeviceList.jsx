import React, { useState, useEffect } from 'react';
import { Table , TableBody , TableCell , TableContainer , TableHead ,TableRow , Paper , Grid } from '@material-ui/core';
import {createUseStyles} from 'react-jss';
import EditIcon from '@material-ui/icons/Edit';


export default function DeviceList(props) {
    

    const [count, setCount] = useState(0);
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
    // Update the document title using the browser API
        document.title = `You clicked ${count} times`;
    });
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
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>
        Click me
        </button>
        <Grid container spacing={2} justify="center" className={classes.tableContainer} >
            <Grid item xs={11}>
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
                                    <TableCell align="center" component="th" scope="row">
                                        {row.name+''+row.serial}
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