import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {Card, CardContent, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import FileCopyIcon from '@mui/icons-material/FileCopy';
import DownloadIcon from '@mui/icons-material/Download';
import copy from 'copy-to-clipboard';
import {saveAs} from 'file-saver';
import {vmAction} from "../api/vms";
import Button from "@mui/material/Button";
import {useEffect} from "react";
import {createItem, getItems} from "../api/generic-crud";
import {ENDPOINTS} from "../api/constants";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import CreateSubjectModal from "./CreateSubjectModal";
import CreateVmModal from "./CreateVmModal";


const generateRDCFile = (ip, password) => {
    const rdcContent = `full address:s:${ip}
username:s:admin`;
    const rdcBlob = new Blob([rdcContent], {type: 'application/x-rdp'});
    saveAs(rdcBlob, 'virtual_machine.rdp');
}

function CollapsedSubject(props) {
    const {users, subjectId, vms} = props;
    const [selectedUser, setSelectedUser] = React.useState("");
    const [selectedVm, setSelectedVm] = React.useState("");
    const [isError, setIsError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState(false);
    const [isSuccess, setIsSuccess] = React.useState(false);
    const [successMessage, setSuccessMessage] = React.useState(false);
    const [isCreateVMOpen, setIsCreatVMOpen] = React.useState(false);
    let labelId = subjectId + "-filled-label";


    console.log(users)
    return (<Box sx={{margin: 1}}>
        <FormControl variant="filled" sx={{m: 1, minWidth: 200}}>
            <InputLabel id={labelId}>Select user</InputLabel>
            <Select
                labelId={labelId}
                id={subjectId + "-select-filled"}
                value={selectedUser}
                fullWidth
                key={subjectId + "-select"}
                onChange={(event) => {
                    setSelectedUser(event.target.value)
                }}
            >
                <MenuItem key={subjectId + "none"} value={""}>None</MenuItem>
                {users.filter(user => {
                    console.log(user);
                    return user.type === "STUDENT";
                }).map(user => (
                    <MenuItem key={subjectId + user.userId}
                              value={user.userId}>{user.name}</MenuItem>))}
            </Select>
        </FormControl>

        {
            selectedUser !== "" && (
                <FormControl variant="filled" sx={{m: 1, minWidth: 200}}>
                    <InputLabel id={labelId + selectedUser}>Select VM</InputLabel>
                    <Select
                        labelId={labelId + selectedUser}
                        id={subjectId + selectedUser + "-select-filled"}
                        value={selectedVm}
                        fullWidth
                        key={subjectId + selectedUser + +"-select"}
                        onChange={(event) => {
                            setSelectedVm(event.target.value)
                        }}
                    >
                        <MenuItem key={subjectId + selectedUser + "none"} value={""}>None</MenuItem>
                        <MenuItem key={subjectId + selectedUser + "addNew"} value={""} onClick={() => {
                            setIsCreatVMOpen(true);
                        }}>Add new VM</MenuItem>
                        {vms.filter(vm => {
                            return vm.userId === selectedUser;
                        }).map(vm => (
                            <MenuItem key={subjectId + selectedUser + vm.virtualMachineId}
                                      value={vm.virtualMachineId}>{vm.instanceName}</MenuItem>))}
                    </Select>
                </FormControl>
            )
        }
        {
            isCreateVMOpen && (
                <CreateVmModal open={isCreateVMOpen} onClose={() => {
                    setIsCreatVMOpen(false)
                }}
                               subjectId={subjectId}
                               userId={selectedUser}

                />
            )
        }
        {vms.filter(vm => vm.virtualMachineId === selectedVm).map(vm => (
            <Card key={vm.virtualMachineId + "-card"}
                  sx={{border: '1px solid', borderRadius: '8px', marginTop: '1vh'}}>
                <CardContent>
                    <Typography variant="h6" sx={{marginBottom: '16px'}}>
                        Virtual Machine Details
                    </Typography>
                    <Typography variant="body1">Name: {vm.instanceName}</Typography>
                    <Typography variant="body1">State: {vm.state}</Typography>
                    <Typography variant="body1">Description: {vm.description}</Typography>
                    <Typography variant="body1">IP: {vm.publicIP}</Typography>
                    <Typography variant="body1">DNS: {vm.publicDNS}
                        <IconButton
                            onClick={() => {
                                copy(vm.publicDNS);
                            }}
                        >
                            <FileCopyIcon/>
                        </IconButton>
                    </Typography>
                    <Typography variant="body1">Password: {vm.password}
                        <IconButton
                            onClick={() => {
                                copy(vm.password);
                            }}
                        >
                            <FileCopyIcon/>
                        </IconButton>
                    </Typography>
                    <Typography variant="body1">Connect:
                        <IconButton
                            onClick={() => {
                                generateRDCFile(vm.publicDNS, vm.password);
                            }}
                        >
                            <DownloadIcon/>
                        </IconButton>
                    </Typography>
                    <Typography variant="body1">Options:
                        {
                            vm.state === "stopped" &&
                            <Button
                                style={{marginLeft: 5}}
                                variant="contained"
                                onClick={event => {
                                    vmAction({
                                        "actionType": "START",
                                        "instances": [
                                            vm.virtualMachineId
                                        ]
                                    }, () => {
                                        setIsSuccess(true);
                                        setSuccessMessage("Instance started.");
                                    }, () => {
                                        setIsError(true);
                                        setErrorMessage("Instance could not be started");
                                    });
                                }}
                                color="primary">
                                Start VM
                            </Button>
                        }
                        {
                            vm.state === "running" &&
                            <Button
                                style={{marginLeft: 5}}
                                variant="contained"
                                onClick={event => {
                                    vmAction({
                                        "actionType": "STOP",
                                        "instances": [
                                            vm.virtualMachineId
                                        ]
                                    }, () => {
                                        setIsSuccess(true);
                                        setSuccessMessage("Instance stopped.");
                                    }, () => {
                                        setIsError(true);
                                        setErrorMessage("Instance could not be stopped");
                                    });
                                }}
                                color="secondary">
                                Stop VM
                            </Button>
                        }
                        {
                            (vm.state === "running" || vm.state === "stopped") &&
                            <Button
                                style={{marginLeft: 5}}
                                variant="contained"
                                onClick={event => {
                                    vmAction({
                                        "actionType": "TERMINATE",
                                        "instances": [
                                            vm.virtualMachineId
                                        ]
                                    }, () => {
                                        setIsSuccess(true);
                                        setSuccessMessage("Instance terminated.");
                                    }, () => {
                                        setIsError(true);
                                        setErrorMessage("Instance could not be terminated");
                                    });
                                }}
                                color="error">
                                Terminate VM
                            </Button>
                        }
                    </Typography>

                </CardContent>
            </Card>))}

        <Snackbar open={isError} autoHideDuration={10000} onClose={() => setIsError(false)}>
            <Alert onClose={() => setIsError(false)} severity="error">
                {errorMessage}
            </Alert>
        </Snackbar>

        <Snackbar open={isSuccess} autoHideDuration={10000} onClose={() => setIsSuccess(false)}>
            <Alert onClose={() => setIsSuccess(false)} severity="success">
                {successMessage}
            </Alert>
        </Snackbar>
    </Box>)
}

export default function ProfessorSubjectTable(props) {
    const {userId} = props;
    const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
    const [subjects, setSubjects] = React.useState([]);
    const [error, setError] = React.useState(false);
    const [hasError, setHasError] = React.useState("");
    const successfulSubjects = (subjectsPage, status) => {
        setSubjects(subjectsPage.content);
    }
    const onError = (error, status) => {
        setHasError(true);
        setError(error);
        console.log(status);
        console.log(error);
    }
    const handleAddModalClose = (event) => {
        setIsAddModalOpen(false);
    };

    useEffect(() => {
        getItems(ENDPOINTS.SUBJECTS, 0, 200, "professor==" + userId, null, "creator,users,vm", successfulSubjects, onError);
    }, [])

    useEffect(() => {
        getItems(ENDPOINTS.SUBJECTS, 0, 200, "professor==" + userId, null, "creator,users,vm", successfulSubjects, onError);
    }, [isAddModalOpen])

    function Row(props) {
        const {row} = props;
        const [open, setOpen] = React.useState(false);
        console.log(row)
        let currentSubjectObj = subjects.filter(s => s.subjectId === row.subjectId);
        return (<React.Fragment>
            <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell>
                    <Button
                        style={{marginLeft: 5}}
                        variant="contained"
                        onClick={event => {
                            // enrollSubject(row.subjectId, () => {
                            //     enrolledSubjects.push(row.subjectId);
                            //     getSubjects(page, rowsPerPage, nameFilter);
                            // }, () => {
                            //     setIsError(true);
                            //     setErrorMessage("Failed to enroll to " + row.name);
                            // })
                        }}
                        color="primary">
                        Create VM for all users
                    </Button>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <CollapsedSubject users={currentSubjectObj.map(s => s.users)[0]} subjectId={row.subjectId}
                                          vms={currentSubjectObj.map(s => s.virtualMachines)[0]}/>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>);
    }


    return (<>
            {
                isAddModalOpen && <CreateSubjectModal open={isAddModalOpen} onClose={handleAddModalClose}/>
            }
            <TableContainer component={Paper} style={{marginTop: "5vh", width: "100vh"}}>
                <Typography component="h2" variant="h6" marginLeft={2} marginTop={2}>
                    Subjects, Users and VMs
                </Typography>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell/>
                            <TableCell>Subject name</TableCell>
                            <TableCell>Options</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {subjects.map((row) => (<Row key={row.subjectId} row={row}/>))}
                    </TableBody>
                </Table>
                <Button
                    variant="contained"
                    onClick={event => {
                        setIsAddModalOpen(true);
                    }}
                    color="primary">
                    Add new subject
                </Button>
            </TableContainer>
        </>
    );
}