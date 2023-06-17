import React, {useEffect, useState} from 'react';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {makeStyles} from '@mui/styles';
import Button from "@mui/material/Button";
import {getUserProfile} from "../api/user";
import TextField from "@mui/material/TextField";
import {updateItem} from "../api/generic-crud";
import {ENDPOINTS} from "../api/constants";
import Typography from "@mui/material/Typography";


const modalStyle = makeStyles((theme) => ({
    center: {
        flexDirection: 'column', alignItems: 'center', display: 'flex',
    }
}));
export default function UserProfileModal(props) {
    const modalClasses = modalStyle();

    const {open, onClose} = props;
    const [userId, setUserId] = React.useState("");
    const [name, setName] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [type, setType] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [hasError, setHasError] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [isValid, setIsValid] = useState(false);
    const [invalidFields, setInvalidFields] = useState({
        username: false,
        email: false,
        name: false,
        password: false
    });
    const [fieldsModified, setFieldsModified] = useState({
        username: false,
        email: false,
        name: false,
        password: false
    });


    const successfulUserProfile = (json, status) => {
        setUserId(json.userId);
        setName(json.name);
        setUsername(json.username);
        setEmail(json.email);
        setType(json.type);
    }
    const onError = (error, status) => {
        setHasError(true);
        setError(error);
        console.log(status);
        console.log(error);
    }
    const save = () => {
        let newPassword = password.length === 0 ? null : password;
        updateItem(ENDPOINTS.USERS, userId, {
            name: name,
            username: username,
            email: email,
            type: type,
            password: newPassword
        }, () => onClose(), onError)
    }

    function changeUsername(event) {
        setUsername(event.target.value);
        setFieldsModified({...fieldsModified, username: true})
        validateForm(event.target.value, email, name, password);
    }

    function changeName(event) {
        setName(event.target.value);
        setFieldsModified({...fieldsModified, name: true})
        validateForm(username, email, event.target.value, password);
    }

    function changeEmail(event) {
        setEmail(event.target.value);
        setFieldsModified({...fieldsModified, email: true})
        validateForm(username, event.target.value, name, password);
    }

    function changePassword(event) {
        setPassword(event.target.value);
        setFieldsModified({...fieldsModified, password: true})
        validateForm(username, email, name, event.target.value);
    }

    function validateForm(username, email, name, password) {
        const newInvalidFields = {
            username : true,
            email : true,
            name : true,
            password : true
        }
        if(username.length > 2) {
            newInvalidFields.username = false;
        }
        if(email.length > 2 && email.includes("@") && email.includes(".")) {
            newInvalidFields.email = false;
        }
        if(name.length > 3) {
            newInvalidFields.name = false;
        }
        if(password.length > 2 || password.length === 0) {
            newInvalidFields.password = false;
        }
        setInvalidFields(newInvalidFields);

        if(!newInvalidFields.username && !newInvalidFields.name && !newInvalidFields.email && !newInvalidFields.password) {
            setIsValid(true);
        }
        else {
            setIsValid(false);
        }
    }

    const getUser = () => {
        getUserProfile(successfulUserProfile, onError);
    };


    useEffect(() => {
        if (open) {
            getUser();
        }
    }, [open]);

    return (<Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title" fullWidth>
        <DialogTitle id="form-dialog-title">
            User profile
        </DialogTitle>
        <DialogContent className={modalClasses.center}>
            <DialogContentText>
                Modify any field then press save in order to edit the user profile.
            </DialogContentText>

        </DialogContent>
        <TextField
            onBlur={changeUsername}
            onChange={changeUsername}
            error={fieldsModified.username && invalidFields.username}
            margin="dense"
            id="username"
            label="Username"
            type="text"
            required
            value={username}
            // error={!valid}
            // helperText={!valid ? errorMessage : ""}
            fullWidth
        />
        <TextField
            onBlur={changeName}
            onChange={changeName}
            error={fieldsModified.name && invalidFields.name}
            margin="dense"
            id="name"
            label="Name"
            type="text"
            required
            value={name}
            // error={!valid}
            // helperText={!valid ? errorMessage : ""}
            fullWidth
        />
        <TextField

            onBlur={changeEmail}
            onChange={changeEmail}
            error={fieldsModified.email && invalidFields.email}
            margin="dense"
            id="email"
            label="Email"
            type="text"
            required
            value={email}
            // error={!valid}
            // helperText={!valid ? errorMessage : ""}
            fullWidth
        />

        <TextField
            onBlur={changePassword}
            onChange={changePassword}
            error={fieldsModified.password && invalidFields.password}
            margin="dense"
            id="email"
            label="New password"
            type="password"
            required
            value={password}
            // error={!valid}
            helperText="Only change if you want to update your password"
            fullWidth
        />

        {
            hasError &&
            <Typography component="h1" color="error">
                {error}
            </Typography>
        }


        <DialogActions>
            <Button onClick={onClose} color="secondary">
                Cancel
            </Button>
            <div style={{flex: '1 0 0'}}/>
            <Button
                disabled={!isValid}
                onClick={event => save()}
                color="primary">
                Save
            </Button>
        </DialogActions>
    </Dialog>);
}
