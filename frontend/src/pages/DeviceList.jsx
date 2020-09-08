import React, {  useContext , useEffect } from 'react';
import { Table , TableBody , TableCell , TableContainer , TableHead ,TableRow , Paper , Grid, Button } from '@material-ui/core';
import {createUseStyles} from 'react-jss';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from "react-router-dom";
import GlobalContext from '../store/GlobalContext'
import * as actions from '../store/GlobalActions';
import useApiRequest from '../custom_hooks/useApiRequest';
import axios from 'axios';

export default function DeviceList(props) {
    const {globalState,globalDispatch} = useContext(GlobalContext);
    const history = useHistory();
    const [{ status, response }, makeRequest] = useApiRequest(
        `${globalState.link}api/devices/`,
        {
            method: 'get',
        }
    );

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

    const editDevice =(i,deviceIndex)=>{
        
        actions.setEditFormDisplay(true,globalDispatch);
        actions.setEditDeviceIndex(i,globalDispatch);
        history.push('/devices/'+i+'/edit');
    }
    const deleteDevice =async (i,deviceIndex)=>{
        await axios.delete(`${globalState.link}api/devices/${i}`);
        axios.get(globalState.link+'api/devices/').then(response=>{
            const devices = response.data.map(item=>{
                return { 
                    id:item._id,
                    name:item.name,
                    serial:item.serial,
                    model:item.deviceModel,
                    note:item.note,
                }
            })
            actions.setDevices(devices,globalDispatch)
        });
    }
    const addDevice = ()=>{
        actions.setCreateFormDisplay(true,globalDispatch);
        history.push('/devices/create');
    }
    useEffect( () => {
        axios.get(globalState.link+'api/devices/').then(response=>{
            const devices = response.data.map(item=>{
                return { 
                    id:item._id,
                    name:item.name,
                    serial:item.serial,
                    model:item.deviceModel,
                    note:item.note,
                }
            })
            actions.setDevices(devices,globalDispatch)
          });
    }, [])
    useEffect(() => {
        axios.get(globalState.link+'api/devices/').then(response=>{
            const devices = response.data.map(item=>{
                return { 
                    id:item._id,
                    name:item.name,
                    serial:item.serial,
                    model:item.deviceModel,
                    note:item.note,
                }
            })
            actions.setDevices(devices,globalDispatch)
          });
    }, [globalState.devices])
  return (
    <div>
        <Grid container spacing={2} justify="center" className={classes.tableContainer} >
            <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={() => addDevice()}>
                    Add Device
                    <AddIcon />
                </Button>
                <TableContainer component={Paper}>
                    <Table className={classes.myTable}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">NAME & SERIAL</TableCell>
                                <TableCell align="center">MODEL</TableCell>
                                <TableCell align="center">NOTE</TableCell>
                                <TableCell ></TableCell>
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
                                    <TableCell align="center"><Button onClick={()=>editDevice(i,row.id)}><EditIcon color="primary"/>EDIT</Button></TableCell>
                                    <TableCell align="center"><Button onClick={()=>deleteDevice(i,row.id)}><DeleteIcon color="primary"/>DELETE</Button></TableCell>
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