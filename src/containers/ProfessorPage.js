import React, {useEffect} from "react";
import TopBar from "../components/TopBar";
import Grid from "@mui/material/Grid";
import ProfessorSubjectTable from "../components/ProfessorSubjectTable";
import {getUserProfile} from "../api/user";
import {getItems} from "../api/generic-crud";
import {ENDPOINTS} from "../api/constants";


export default function ProfessorPage(props) {
    const {userId} = props;

    return (<>
        <TopBar/>
        <Grid container
              spacing={2}
              direction="column"
              justifyContent="center"
              alignItems="center">
            {<ProfessorSubjectTable userId={userId}/>}
        </Grid>
    </>);
}
