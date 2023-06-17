import React from 'react';
import {Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {makeStyles} from '@mui/styles';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {createItem} from "../api/generic-crud";
import {ENDPOINTS} from "../api/constants";
import Typography from "@mui/material/Typography";


const modalStyle = makeStyles((theme) => ({
    center: {
        flexDirection: 'column', alignItems: 'center', display: 'flex',
    }
}));
export default function CreateVmModal(props) {
    const modalClasses = modalStyle();

    const {open, onClose, userId, subjectId, isForAll} = props;
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [hasError, setHasError] = React.useState(false);
    const [error, setError] = React.useState("");
    const [valid, setValid] = React.useState(false);


    const onError = (error, status) => {
        setValid(true);
        setHasError(true);
        setError(error.message);
        console.log(status);
        console.log(error);
    }
    const save = () => {
        setValid(false);
        let endpoint = isForAll? ENDPOINTS.SUBJECTS + "/" + subjectId + "/virtual-machines" : ENDPOINTS.USERS + "/" + userId + "/virtual-machines";
        createItem(endpoint, {
            instanceName: name,
            description: description,
            subjectId: subjectId,
        }, () => onClose(), onError)
    }

    const refreshValid = (name, description) => {
        if (name.length > 5 && description.length > 0 && name.length < 50) {
            setValid(true);
        } else {
            setValid(false);
        }
    }

    return (<Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title" fullWidth>
        <DialogTitle id="form-dialog-title">
            Create VM
        </DialogTitle>
        <DialogContent className={modalClasses.center}>

        </DialogContent>
        <TextField
            margin="dense"
            id="name"
            label="Name"
            type="text"
            required
            value={name}
            onChange={(event) => {
                setName(event.target.value);
                refreshValid(event.target.value, description);
            }}
            fullWidth
        />
        <TextField
            margin="dense"
            id="description"
            label="Description"
            type="text"
            multiline
            required
            value={description}
            onChange={(event) => {
                setDescription(event.target.value);
                refreshValid(name, event.target.value);
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
                Create
            </Button>
        </DialogActions>
    </Dialog>);
}
