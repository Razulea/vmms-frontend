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
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Copyright from "../components/Copyright";
import Cookies from "universal-cookie";
import {COOKIES} from "../constants";
import {login} from "../api/login";
import {Navigate, useNavigate} from "react-router-dom";

const cookies = new Cookies();

const defaultTheme = createTheme();

export default function Login() {

    useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [hasError, setHasError] = useState(false);

    function onLogin() {
        login(username, password, successfulLogin, onErrorLogin)
    }

    function successfulLogin(json, status) {
        if (status === 200) {
            const expirationDate = new Date();
            expirationDate.setTime(expirationDate.getTime() + (60 * 60 * 1000));
            cookies.set(COOKIES.TOKEN_KEY, json.token, {expires: expirationDate});

            setHasError(false);
            setLoggedIn(true);
        } else {
            cookies.remove(COOKIES.TOKEN_KEY);
            setHasError(true);
        }
    }

    function onErrorLogin(status) {
        setHasError(true);
    }

    function changeUsername(event) {
        setUsername(event.target.value)
    }

    function changePassword(event) {
        setPassword(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            username: data.get('username'), password: data.get('password'),
        });
    };
    const navigate = useNavigate();


    return (!loggedIn ? <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
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
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            onChange={changePassword}
                            autoComplete="current-password"
                        />
                        {
                            hasError &&
                            <Typography component="h1" color="error">
                                Invalid username or password, please try again.
                            </Typography>
                        }
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                            onClick={onLogin}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2" onClick={() => navigate("/forgot-password")}>
                                    Forgot password?
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
        </ThemeProvider> : (<Navigate to="/" replace={true}/>)

    );
}