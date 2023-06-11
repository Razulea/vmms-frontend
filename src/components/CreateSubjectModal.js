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
export default function CreateSubjectModal(props) {
    const modalClasses = modalStyle();

    const {open, onClose} = props;
    const [name, setName] = React.useState("");
    const [hasError, setHasError] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [valid, setValid] = React.useState(false);


    const onError = (error, status) => {
        setHasError(true);
        setError(error);
        console.log(status);
        console.log(error);
    }
    const save = () => {
        createItem(ENDPOINTS.SUBJECTS, {
            name: name,
        }, () => onClose(), onError)
    }

    const refreshValid = (name) => {
        if (name.length > 0) {
            setValid(true);
        } else {
            setValid(false);
        }
    }

    return (<Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title" fullWidth>
        <DialogTitle id="form-dialog-title">
            Create subject
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
            error={!valid}
            onChange={(event) => {
                setName(event.target.value);
                refreshValid(event.target.value);
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
                Add
            </Button>
        </DialogActions>
    </Dialog>);
}
