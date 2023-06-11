import React, {useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button";
import {deleteItem, getItems, updateItem} from "../api/generic-crud";
import {ENDPOINTS} from "../api/constants";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";


export default function ExistingSubjectsTable() {
    const [nameFilter, setNameFilter] = React.useState('');
    const [emailFilter, setEmailFilter] = React.useState('');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [subjects, setSubjects] = React.useState([]);
    const [totalElements, seTotalElements] = React.useState(0);
    const [isError, setIsError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        getSubjects(newPage, rowsPerPage);
    };

    const handleChangeRowsPerPage = (event) => {
        let number = +event.target.value;
        setRowsPerPage(number);
        setPage(0);
        getSubjects(0, number);
    };

    const handleCloseError = () => {
        setIsError(false);
    }

    const dataSuccess = (page) => {
        setSubjects(page.content);
        seTotalElements(page.totalElements);
    }

    const dataError = () => {
        console.log("Error getting page");
    }

    const getSubjects = (page, rowsPerPage, nameFilter, emailFilter) => {
        let filter = 'isActive==true';
        if(nameFilter.length > 0) {
            filter += ';name=like=' + nameFilter;
        }
        if(emailFilter.length > 0) {
            filter += ';professorUser.email=like=' + emailFilter;
        }

        getItems(ENDPOINTS.SUBJECTS, page, rowsPerPage, filter, null, "creator", dataSuccess, dataError)
    }

    useEffect(() => getSubjects(page, rowsPerPage, '', ''), []);

    function Row(props) {
        const {row} = props;

        return (<React.Fragment>
            <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.professorUser.name}
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.professorUser.email}
                </TableCell>

                <TableCell align="center">
                    <Button
                        style={{marginLeft: 5}}
                        variant="contained"
                        onClick={event => {
                            deleteItem(ENDPOINTS.SUBJECTS, row.subjectId, () => getSubjects(page, rowsPerPage, nameFilter, emailFilter), () => {
                                setIsError(true);
                                setErrorMessage("Failed to delete subject " + row.name);
                            })
                        }}
                        color="secondary">
                        Delete
                    </Button>
                </TableCell>
            </TableRow>
        </React.Fragment>);
    }

    return (<>
        <TableContainer component={Paper} style={{marginTop: "5vh", width: "100vh"}}>
            <Typography component="h2" variant="h6" marginLeft={2} marginTop={1}>
                Existing subjects
            </Typography>

            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <TextField
                                margin="dense"
                                id="name"
                                label="Name"
                                type="text"
                                value={nameFilter}
                                onChange={(event) => {
                                    setNameFilter(event.target.value);
                                    setPage(0);
                                    getSubjects(0, rowsPerPage, event.target.value, emailFilter);
                                }}
                            />
                        </TableCell>
                        <TableCell>Professor</TableCell>
                        <TableCell>
                            <TextField
                                margin="dense"
                                id="email"
                                label="Email"
                                type="text"
                                value={emailFilter}
                                onChange={(event) => {
                                    setEmailFilter(event.target.value);
                                    setPage(0);
                                    getSubjects(0, rowsPerPage, nameFilter, event.target.value);
                                }}
                            />
                        </TableCell>
                        <TableCell align="center">Options</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {subjects.map((row) => (<Row key={row.subjectId} row={row}/>))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[2, 10, 25, 100]}
                component="div"
                count={totalElements}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
        <Snackbar open={isError} autoHideDuration={10000} onClose={handleCloseError}>
            <Alert onClose={handleCloseError} severity="error">
                {errorMessage}
            </Alert>
        </Snackbar>
    </>);
}