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


export default function NewAccountsTable(props) {
    const {refresh} = props;
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [users, setUsers] = React.useState([]);
    const [totalElements, seTotalElements] = React.useState(0);
    const [isError, setIsError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        getInactiveUsers(newPage, rowsPerPage);
    };

    const handleChangeRowsPerPage = (event) => {
        let number = +event.target.value;
        setRowsPerPage(number);
        setPage(0);
        getInactiveUsers(0, number);
    };

    const handleCloseError = () => {
        setIsError(false);
    }

    const dataSuccess = (page) => {
        setUsers(page.content);
        seTotalElements(page.totalElements);
    }

    const dataError = () => {
        console.log("Error getting page");
    }

    const getInactiveUsers = (page, rowsPerPage) => {
        getItems(ENDPOINTS.USERS, page, rowsPerPage, "isActive==false", null, null, dataSuccess, dataError)
    }

    useEffect(() => getInactiveUsers(page, rowsPerPage), []);

    const acceptSuccess = () => {
        getInactiveUsers(page, rowsPerPage);
        refresh();
    }

    function Row(props) {
        const {row} = props;

        return (<React.Fragment>
            <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell align="center">
                    <Button
                        variant="contained"
                        onClick={() => {
                            row.active = true;
                            updateItem(ENDPOINTS.USERS, row.userId, row, acceptSuccess, () => {
                                setIsError(true);
                                setErrorMessage("Failed to accept user " + row.name);
                            })
                        }}
                        color="primary">
                        Accept
                    </Button>
                    <Button
                        style={{marginLeft: 5}}
                        variant="contained"
                        onClick={event => {
                            deleteItem(ENDPOINTS.USERS, row.userId, () => getInactiveUsers(page, rowsPerPage), () => {
                                setIsError(true);
                                setErrorMessage("Failed to delete user " + row.name);
                            })
                        }}
                        color="secondary">
                        Reject
                    </Button>
                </TableCell>
            </TableRow>
        </React.Fragment>);
    }

    return (<>
        <TableContainer component={Paper} style={{marginTop: "10vh", width: "100vh"}}>
            <Typography component="h2" variant="h6" marginLeft={2} marginTop={1}>
                New Accounts
            </Typography>

            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell align="center">Options</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((row) => (<Row key={row.userId} row={row}/>))}
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