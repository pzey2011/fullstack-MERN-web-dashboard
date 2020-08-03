import React , {useState} from 'react';
import {Button,
TextField,
Dialog,
DialogActions,
DialogContent,
DialogTitle,
Grid} from '@material-ui/core';
import { Formik, Form, Field, ErrorMessage } from 'formik';

export default function FormDialog(props) {

  const handleClose = () => {
    props.setOpen(false);
  };
  

  return (
        <Formik
            enableReinitialize
            initialValues={{ name: props.device.name , note: props.device.note }}
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
                
                props.updateDevice(values);
                props.setOpen(false);
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
           
                    <Dialog open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Device {props.device.name} :</DialogTitle>
                        <Form>
                            <DialogContent>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField 
                                            disabled 
                                            label='Serial' 
                                            name="serial" 
                                            defaultValue={props.device.serial} 
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
