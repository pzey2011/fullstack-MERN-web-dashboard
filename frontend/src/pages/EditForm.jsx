import React , { useContext,useEffect,useState} from 'react';
import {Button,
TextField,
Dialog,
DialogActions,
DialogContent,
DialogTitle,
Grid} from '@material-ui/core';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import GlobalContext from '../store/GlobalContext';
import * as actions from '../store/GlobalActions';
import { useHistory,useParams,useRouteMatch,useLocation } from "react-router-dom";
import axios from 'axios';

export default function EditForm(props) {
  const history = useHistory();
  const params = useParams();
  const {globalState,globalDispatch} = useContext(GlobalContext);
  const [device,setDevice] = useState({});
  const handleClose = () => {
    actions.setEditFormDisplay(false,globalDispatch);
    history.push('/devices');
  };
  useEffect((props)=>{
    const fetchDeviceById = async (i)=>{
      const responseData =  await axios.get(globalState.link+'api/devices/'+parseInt(i)).then(response=>{
        setDevice({name:response.data.name,model:response.data.deviceModel,serial:response.data.serial,note:response.data.note})
      });
        actions.setEditFormDisplay(true,globalDispatch);
    }
    fetchDeviceById(params.id);
  },[params.id])
  return (
        <Formik
            enableReinitialize
            initialValues={{ name: device.name , note: device.note }}
            validate={values => {
                const errors = {};
                if (!values.name) {
                    errors.name = 'Required';
                  } else if (values.name.length > 64) {
                    errors.name = 'Must be 64 characters or less';
                  }
                
                  if (values.note.length > 512) {
                    errors.note = 'Must be 512 characters or less';
                  }
                return errors;
              }}
            onSubmit={(values) => {
                
              axios.patch(`${globalState.link}api/devices/${globalState.editDeviceIndex}`,values).then(response=>{
               console.log(response)
              });
                actions.setEditFormDisplay(false,globalDispatch);
                history.push('/devices');
            }}
        >
           {({
         values,
         errors,
         touched,
         handleChange,
         handleBlur,
         handleSubmit,
         isSubmitting,
         /* and other goodies */
       }) => ( 

                    <Dialog open={globalState.editFormDisplay} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Device {device.name} :</DialogTitle>
                        <Form>
                            <DialogContent>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField 
                                            disabled 
                                            label='Serial' 
                                            name="serial" 
                                            value={device.serial} 
                                        />
                                    </Grid>
                                    <Grid item xs={12}>

                                        <TextField
                                            error = {errors && errors.name}
                                            autoFocus
                                            type="string"
                                            margin="2px"
                                            label="Device Name"
                                            name="name"
                                            onChange={handleChange}
                                            value = {values.name}
                                            helperText= {errors.name}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>

                                        <TextField
                                            error = {errors && errors.note}
                                            autoFocus
                                            type="string"
                                            margin="2px"
                                            label="Note"
                                            name="note"
                                            fullWidth
                                            multiline
                                            onChange={handleChange}
                                            value = {values.note}
                                            helperText= {errors.note}
                                        />
                                    </Grid>
                                </Grid>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                    Cancel
                                </Button>
                                <Button type="submit" >
                                Submit
                                </Button>
                            </DialogActions>
                        </Form>
                    </Dialog>
        )}
        </Formik>
  );
}
