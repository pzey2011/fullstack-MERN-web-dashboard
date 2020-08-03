import React from 'react';
import {Button,
TextField,
Dialog,
DialogActions,
DialogContent,
DialogTitle} from '@material-ui/core';
import { Formik, Form, Field, ErrorMessage } from 'formik';

export default function FormDialog(props) {
  

  const handleClickOpen = () => {
    props.setOpen(true);
  };

  const handleClose = () => {
    props.setOpen(false);
  };
  const handleSubmit = () =>{
  }

  return (
          
        <Formik
            initialValues={{ model: '', password: '' }}
            
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
                }, 400);
                props.updateDevice(values);
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    <Dialog open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Device {props.device.name} :</DialogTitle>
                        <DialogContent>
                            <TextField disabled id="standard-disabled" label='Serial' defaultValue="Hello World" value={props.device.serial} />
                            <TextField
                                autoFocus
                                type="string"
                                margin="dense"
                                label="Model"
                                name="model"
                                value = {props.device.model}
                            />
                            
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isSubmitting}>
                                Submit
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Form>
            )}
        </Formik>
  );
}
