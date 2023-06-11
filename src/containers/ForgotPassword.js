import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PasswordIcon from '@mui/icons-material/Password';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Copyright from "../components/Copyright";
import Cookies from "universal-cookie";
import {COOKIES} from "../constants";
import {forgotPassword} from "../api/login";
import {Navigate, useNavigate} from "react-router-dom";

const cookies = new Cookies();

const defaultTheme = createTheme();

export default function ForgotPassword() {

    useState([]);
    const [username, setUsername] = useState('');
    const [success, setSuccess] = useState(false);
    const [hasError, setHasError] = useState(false);

    function onForgotPassword() {
        forgotPassword(username, successfulRequest, onErrorLogin)
    }

    function successfulRequest(status) {
        if (status === 200) {
            setSuccess(true);
            setHasError(false);
        } else {
            setSuccess(false);
            setHasError(true);
        }
    }

    function onErrorLogin(status) {
        setHasError(true);
    }

    function changeUsername(event) {
        setUsername(event.target.value)
    }
    const navigate = useNavigate();

    return (<ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center',
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <PasswordIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Forgot password
                </Typography>
                <Box component="form" onSubmit={(event) => {event.preventDefault()}} noValidate sx={{mt: 1}}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        onChange={changeUsername}
                        autoFocus
                    />
                    {
                        hasError &&
                        <Typography component="h1" color="error">
                            Username or email not found
                        </Typography>
                    }
                    {
                        success &&
                        <Typography component="h1" color="#006400">
                        An email will be sent with a new password in a few days.
                        </Typography>
                    }
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                        onClick={onForgotPassword}
                    >
                        Request new password
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2" onClick={() => navigate("/login")}>
                                Login instead
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2" onClick={() => navigate("/sign-up")}>
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{mt: 8, mb: 4}}/>
        </Container>
    </ThemeProvider>);
}