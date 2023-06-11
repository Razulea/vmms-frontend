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

function generatePassword() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';

    for (let i = 0; i < 12; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters.charAt(randomIndex);
    }

    return password;
}
export default function ForgotPasswordTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(100);
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
        getItems(ENDPOINTS.USERS, page, rowsPerPage, "forgotPassword==true", null, null, dataSuccess, dataError)
    }

    useEffect(() => getInactiveUsers(page, rowsPerPage), []);

    function Row(props) {
        const {row} = props;
        const [password, setPassword] = React.useState('');


        return (<React.Fragment>
            <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.email}
                </TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell align="center">
                    {
                        password.length > 0 ? (password) :
                            (
                                <Button
                                    variant="contained"
                                    onClick={() => {

                                        row.forgotPassword = false;
                                        row.password = generatePassword();
                                        setPassword(row.password);
                                        updateItem(ENDPOINTS.USERS, row.userId, row, () => {

                                        }, () => {
                                            setIsError(true);
                                            setErrorMessage("Failed to set password for " + row.name);
                                        })
                                    }}
                                    color="primary">
                                    Reset password
                                </Button>
                            )
                    }
                </TableCell>
            </TableRow>
        </React.Fragment>);
    }

    return (<>
        <TableContainer component={Paper} style={{marginTop: "5vh", marginBottom: "5vh", width: "100vh"}}>
            <Typography component="h2" variant="h6" marginLeft={2} marginTop={1}>
                Forgot password
            </Typography>

            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
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