import React, {useEffect} from "react";
import TopBar from "../components/TopBar";
import StudentSubjectTable from "../components/StudentSubjectTable";
import Grid from "@mui/material/Grid";
import {getUserProfile} from "../api/user";
import {getItems} from "../api/generic-crud";
import {ENDPOINTS} from "../api/constants";
import SubjectEnrollTable from "../components/SubjectEnrollTable";


export default function StudentPage(props) {
    const {userId} = props;
    const [user, setUser] = React.useState(null);
    const [subjects, setSubjects] = React.useState(null);
    const [hasError, setHasError] = React.useState(false);
    const [error, setError] = React.useState(false);


    const successfulUserProfile = (userJson, status) => {
        setUser(userJson);
    }

    const successfulSubjects = (subjectsPage, status) => {
        setSubjects(subjectsPage.content);
    }
    const onError = (error, status) => {
        setHasError(true);
        setError(error);
        console.log(status);
        console.log(error);
    }


    useEffect(() => {
        getUserProfile(successfulUserProfile, onError);
        getItems(ENDPOINTS.SUBJECTS, 0, 200, null, null, "creator", successfulSubjects, onError);
    }, []);

    return (<>
        <TopBar/>
        <Grid container
              spacing={2}
              direction="column"
              justifyContent="center"
              alignItems="center">
            {user && subjects && <StudentSubjectTable user={user}
                                                      subjects={new Map(subjects.map((subject) => [subject.subjectId, subject]))}
            />}
            {
                user &&
                <SubjectEnrollTable user={user}/>
            }

        </Grid>
    </>);
}
