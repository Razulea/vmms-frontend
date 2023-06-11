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
import {register} from "../api/login";
import {Navigate, useNavigate} from "react-router-dom";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

const cookies = new Cookies();

const defaultTheme = createTheme();

export default function SignUp() {

    useState([]);
    const [registered, setRegistered] = useState(false);
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [type, setType] = useState('STUDENT');

    const [password, setPassword] = useState('');
    const [hasError, setHasError] = useState(false);

    function onLogin() {

        register({
            name: name,
            username: username,
            email: email,
            password: password,
            type: type
        }, successfulRegister, onErrorLogin)
    }

    function successfulRegister(status) {
        if (status === 200) {
            setHasError(false);
            setRegistered(true);
        } else {
            setHasError(true);
            setRegistered(false);
        }
    }

    function onErrorLogin(status) {
        setHasError(true);
        setRegistered(false);
    }

    function changeUsername(event) {
        setUsername(event.target.value)
    }

    function changeName(event) {
        setName(event.target.value)
    }

    function changeEmail(event) {
        setEmail(event.target.value)
    }

    function changeType(event) {
        setType(event.target.value)
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


    return (<ThemeProvider theme={defaultTheme}>
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
                        id="name"
                        label="Name"
                        name="name"
                        autoComplete="name"
                        onChange={changeName}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        onChange={changeEmail}
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
                    <FormControl variant="filled" sx={{m: 1, minWidth: 120}}>
                        <InputLabel id="type-simple-select-filled-label">Type</InputLabel>
                        <Select
                            labelId="type-simple-select-filled-label"
                            id="type-simple-select-filled"
                            value={type}
                            fullWidth
                            onChange={changeType}
                        >
                            <MenuItem value={"STUDENT"}>Student</MenuItem>
                            <MenuItem value={"PROFESSOR"}>Professor</MenuItem>
                        </Select>
                    </FormControl>
                    {
                        hasError &&
                        <Typography component="h1" color="error">
                            Failed to register, some fields are invalid or duplicated entry.
                        </Typography>
                    }
                    {
                        registered &&
                        <Typography component="h1" color="#006400">
                            Successfully registered, account will be available in a few days.
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
                            <Link href="#" variant="body2" onClick={() => navigate("/login")}>
                                Have an account? Log in
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2" onClick={() => navigate("/forgot-password")}>
                                Forgot password
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{mt: 8, mb: 4}}/>
        </Container>
    </ThemeProvider>);
}