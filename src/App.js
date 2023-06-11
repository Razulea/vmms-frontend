import './App.css';
// import {Router} from "react-router-dom";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from "./containers/Login"
import Logout from "./containers/Logout";
import MainPage from "./containers/MainPage";
import ForgotPassword from "./containers/ForgotPassword";
import SignUp from "./containers/SingUp";

function App() {
    return (<Router>
            <Routes>
                <Route exact path='/' element={<MainPage/>}/>
                <Route exact path='/login' element={<Login/>}/>
                <Route exact path='/logout' element={<Logout/>}/>
                <Route exact path='/forgot-password' element={<ForgotPassword/>}/>
                <Route exact path='/sign-up' element={<SignUp/>}/>
            </Routes>
        </Router>);
}

export default App;
