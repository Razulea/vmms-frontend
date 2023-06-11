import React from 'react';
import {COOKIES} from "../constants";
import {Navigate} from "react-router-dom";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function Logout(props) {
    cookies.remove(COOKIES.TOKEN_KEY);
    return (<Navigate to="/login" replace={true}/>);

}
