import React, {useEffect} from 'react'
import {whoAmI} from "../api/whoami";
import {ACCOUNT_TYPE, COOKIES} from "../constants";
import Login from "./Login";
import AdminPage from "./AdminPage";
import StudentPage from "./StudentPage";
import ProfessorPage from "./ProfessorPage";
import Cookies from "universal-cookie";
import {Navigate} from "react-router-dom";
// import HomepageAdmin from "./homepage-admin";
// import HomepageTeacher from "./homepage-teacher";
// import HomepageStudent from "./homepage-student";

const cookies = new Cookies();

export default function MainPage() {

    const [accountType, setAccountType] = React.useState(ACCOUNT_TYPE.NONE);
    const [userId, setUserId] = React.useState('');
    const [mail, setUserMail] = React.useState('');
    const [hasError, setHasError] = React.useState(false);

    const isLoggedIn = cookies.get(COOKIES.TOKEN_KEY);
    if (!isLoggedIn) {
        console.log("Redirecting back to login since not logged in.")
        return <Navigate to="/login" replace={true}/>
    }

    const successfulWhoAmI = (json, status) => {
        setAccountType(ACCOUNT_TYPE[json.type]);
        setUserId(json.userId);
        setUserMail(json.email);
    }

    const onError = (error, status) => {
        setHasError(true);
    }

    const getWhoAmI = () => {
        whoAmI(successfulWhoAmI, onError);
    };


    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => getWhoAmI(), []);

    return (
        <>
            {accountType === ACCOUNT_TYPE.NONE && <Login/>}
            {accountType === ACCOUNT_TYPE.ADMIN && <AdminPage userId={userId}/>}
            {accountType === ACCOUNT_TYPE.STUDENT && <StudentPage userId={userId}/>}
            {accountType === ACCOUNT_TYPE.PROFESSOR && <ProfessorPage userId={userId}/>}
            {/*{accountType === ACCOUNT_TYPE.STUDENT && <HomepageStudent/>}*/}
            {/*{accountType === ACCOUNT_TYPE.PROFESSOR && <HomepageTeacher/>}*/}
        </>

    )

}