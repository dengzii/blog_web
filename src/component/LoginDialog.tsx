import React, {useState} from 'react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@material-ui/core";

interface LoginDialogProp {
    open: boolean,
    onClose: () => void,
    onLogin: (username: string, password: string) => void
}

const emptyLoginField = {username: "", password: ""};

export default function LoginDialog(props: LoginDialogProp) {

    const [loginField, setLoginField] = useState(emptyLoginField);

    return (<div>
        <Dialog open={props.open} onClose={props.onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">User Login</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please fill in email address and password.
                    if you don't have an account yet, please register.
                </DialogContentText>
                <TextField autoFocus margin="dense" id="name" label="UserName" type="text" fullWidth onChange={e => {
                    loginField.username = e.target.value;
                    setLoginField(loginField)
                }}/>
                <TextField autoFocus margin="dense" id="password" label="Password" type="password" fullWidth
                           onChange={e => {
                               loginField.password = e.target.value;
                               setLoginField(loginField)
                           }}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose} color="primary">Cancel</Button>
                <Button onClick={() => {
                    props.onLogin(loginField.username, loginField.password)
                }} color="primary">Login</Button>
            </DialogActions>
        </Dialog>
    </div>)
}