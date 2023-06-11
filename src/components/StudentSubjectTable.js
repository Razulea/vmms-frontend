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


const generateRDCFile = (ip, password) => {
    const rdcContent = `full address:s:${ip}
username:s:admin`;
    const rdcBlob = new Blob([rdcContent], {type: 'application/x-rdp'});
    saveAs(rdcBlob, 'virtual_machine.rdp');
}

function CollapsedSubject(props) {
    const {user, subjectId} = props;
    const [selectedVM, setSelectedVM] = React.useState("");


    let labelId = subjectId + "-filled-label";
    return (<Box sx={{margin: 1}}>
            <FormControl variant="filled" sx={{m: 1, minWidth: 420}}>
                <InputLabel id={labelId}>Select virtual machine</InputLabel>
                <Select
                    labelId={labelId}
                    id={subjectId + "-select-filled"}
                    value={selectedVM}
                    fullWidth
                    key={subjectId + "-select"}
                    onChange={(event) => {
                        setSelectedVM(event.target.value)
                    }}
                >
                    <MenuItem key={subjectId + "none"} value={""}>None</MenuItem>
                    {user.virtualMachines.filter(vm => vm.subjectId === subjectId).map(vm => (
                        <MenuItem key={subjectId + vm.virtualMachineId}
                                  value={vm.virtualMachineId}>{vm.instanceName}</MenuItem>))}
                </Select>
                {user.virtualMachines.filter(vm => vm.virtualMachineId === selectedVM).map(vm => (
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

                        </CardContent>
                    </Card>))}
            </FormControl>
        </Box>)
}

export default function StudentSubjectTable(props) {
    const {user, subjects} = props;
    console.log(user)

    function Row(props) {
        const {row} = props;

        const subject = subjects.get(row.subjectId);
        const [open, setOpen] = React.useState(false);

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
                        {subject.name}
                    </TableCell>
                    <TableCell>{subject.professorUser.name}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <CollapsedSubject user={user} subjectId={row.subjectId}/>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>);
    }

    return (
        <TableContainer component={Paper} style={{marginTop: "5vh", width: "100vh"}}>
            <Typography component="h2" variant="h6" marginLeft={2} marginTop={2}>
                Subjects & VMs
            </Typography>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell/>
                        <TableCell>Subject name</TableCell>
                        <TableCell>Professor</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {user.subjects.map((row) => (<Row key={user.userId + row.subjectId} row={row}/>))}
                </TableBody>
            </Table>
        </TableContainer>);
}