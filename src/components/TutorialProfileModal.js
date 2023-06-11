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
export default function TutorialModal(props) {
    const modalClasses = modalStyle();

    const {open, onClose} = props;


    return (<Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title" fullWidth>
        <DialogContent className={modalClasses.center}>
            <h1>
                Students
            </h1>
            <DialogContentText>
                Use the "Enroll to subject" button to add a new subject from the list. When assigned a Virtual Machine, click it to view it's details. Open the "Remote desktop connection" app, enter your computer IP/DNS, then enter your username and password. Connect to your machine and work on your task.
            </DialogContentText>
            <h1>
                Professors
            </h1>
            <DialogContentText>
                Create a new subject pressing the "Create subject button" or add a new subject using "Add subject" button. On each subject, add student searching by their id. Add a new VM to each student using the "Add new" button, specifying it's name and description, or createa a new VM for all students in a class using "Add class VM" button. Refresh after a few minutes. Click on the VM for each student.  Open the "Remote desktop connection" app, enter your computer IP/DNS, then enter your username and password. Connect and configure the task.
            </DialogContentText>

        </DialogContent>



        <DialogActions>
            <Button onClick={onClose} color="secondary">
                Close
            </Button>
        </DialogActions>
    </Dialog>);
}
