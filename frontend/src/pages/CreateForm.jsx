import React , { useContext,useEffect,useState} from 'react';
import {Button,
TextField,
Dialog,
DialogActions,
DialogContent,
DialogTitle,
Grid} from '@material-ui/core';
import { useHistory} from "react-router-dom";
import { Formik, Form } from 'formik';
import GlobalContext from '../store/GlobalContext';
import * as actions from '../store/GlobalActions';
import axios from 'axios';

export default function CreateForm(props) {
const history = useHistory();
  const {globalState,globalDispatch} = useContext(GlobalContext);
  const handleClose = () => {
    actions.setCreateFormDisplay(false,globalDispatch);
    history.push('/devices');
  };
  return (
        <Formik
            enableReinitialize
            initialValues={{ name: "" , note: "",deviceModel:"",serial:"" }}
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
                axios.post(`${globalState.link}api/devices/`,values);
                actions.setCreateFormDisplay(false,globalDispatch);
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

                    <Dialog open={globalState.createFormDisplay} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Create Device :</DialogTitle>
                        <Form>
                            <DialogContent>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField 
                                            label='Serial' 
                                            name="serial" 
                                            value={values.serial}
                                            onChange={handleChange}
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
                                            label='Model' 
                                            name="deviceModel" 
                                            value={values.deviceModel}
                                            onChange={handleChange}
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
