import React, {useEffect} from 'react';
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
    const [valid, setValid] = React.useState(true);


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

    const refreshValid = (username, name, email) => {
        if (username.length > 0 && name.length > 0 && email.length > 0) {
            setValid(true);
        } else {
            setValid(false);
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
            margin="dense"
            id="username"
            label="Username"
            type="text"
            required
            value={username}
            // error={!valid}
            // helperText={!valid ? errorMessage : ""}
            onChange={(event) => {
                setUsername(event.target.value);
                refreshValid(event.target.value, name, email);
            }}
            fullWidth
        />
        <TextField
            margin="dense"
            id="name"
            label="Name"
            type="text"
            required
            value={name}
            // error={!valid}
            // helperText={!valid ? errorMessage : ""}
            onChange={(event) => {
                setName(event.target.value);
                refreshValid(username, event.target.value, email);
            }}
            fullWidth
        />
        <TextField
            margin="dense"
            id="email"
            label="Email"
            type="text"
            required
            value={email}
            // error={!valid}
            // helperText={!valid ? errorMessage : ""}
            onChange={(event) => {
                setEmail(event.target.value)
                refreshValid(username, name, event.target.value);
            }}
            fullWidth
        />

        <TextField
            margin="dense"
            id="email"
            label="New password"
            type="password"
            required
            value={password}
            // error={!valid}
            helperText="Only change if you want to update your password"
            onChange={(event) => {
                setPassword(event.target.value)
            }}
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
                disabled={!valid}
                onClick={event => save()}
                color="primary">
                Save
            </Button>
        </DialogActions>
    </Dialog>);
}
