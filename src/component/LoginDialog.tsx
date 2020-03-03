import React from 'react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@material-ui/core";

export default function LoginDialog(props: { open: boolean, onClose: () => void }) {

    return (<div>
        <Dialog open={props.open} onClose={props.onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">User Login</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please fill in email address and password.
                    if you don't have an account yet, please register.
                </DialogContentText>
                <TextField autoFocus margin="dense" id="name" label="Email Address" type="email" fullWidth/>
                <TextField autoFocus margin="dense" id="password" label="Password" type="password" fullWidth/>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose} color="primary">Cancel</Button>
                <Button onClick={props.onClose} color="primary">Login</Button>
            </DialogActions>
        </Dialog>
    </div>)
}