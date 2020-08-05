import React, { useEffect , useContext } from 'react';
import { Table , TableBody , TableCell , TableContainer , TableHead ,TableRow , Paper , Grid, Button } from '@material-ui/core';
import {createUseStyles} from 'react-jss';
import EditIcon from '@material-ui/icons/Edit';
import { useHistory } from "react-router-dom";
import GlobalContext from './store/GlobalContext'
import * as actions from './store/GlobalActions';

export default function DeviceList(props) {
    const {globalState,globalDispatch} = useContext(GlobalContext);
    const history = useHistory();

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

    function handleEdit(id){
        actions.setSelectedDeviceIndex(id,globalDispatch);
        actions.setEditDisplay(true,globalDispatch);
        actions.setSelectedDevice(globalState.devices[id],globalDispatch);
        history.push('/devices/'+id+'/edit');
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
                            {globalState.devices.map((row,i) => (
                                <TableRow key={i}>
                                    <TableCell align="center" columnSpan={2}>
                                        {row.name}
                                        <br />
                                        <br />
                                        {row.serial}
                                    </TableCell>
                                    <TableCell align="center">{row.model}</TableCell>
                                    <TableCell align="center">{row.note}</TableCell>
                                    <TableCell align="center"><Button onClick={()=>handleEdit(i)}><EditIcon color="primary"/>EDIT</Button></TableCell>
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