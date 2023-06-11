import React from "react";
import TopBar from "../components/TopBar";
import {getItems} from "../api/generic-crud";
import {ENDPOINTS} from "../api/constants";
import NewAccountsTable from "../components/NewAccountsTable";
import ExistingAccountsTable from "../components/ExistingAccountsTable";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ExistingSubjectsTable from "../components/ExistingSubjectsTable";
import ForgotPasswordTable from "../components/ForgotPasswordTable";

export default function AdminPage(props) {
    const {userId} = props;
    const [refreshes, setRefreshes] = React.useState(0);

    const refreshUsers = () => {
        setRefreshes(refreshes + 1);
    }

    return (<>
        <div style={{backgroundColor: '#7fd3e2', minHeight: '100vh'}}>
            <TopBar/>
            <Grid container
                  spacing={2}
                  direction="column"
                  justifyContent="center"
                  alignItems="center">

                <NewAccountsTable refresh={refreshUsers}/>
                <ExistingAccountsTable refreshIfIncreased={refreshes}/>
                <ExistingSubjectsTable/>
                <ForgotPasswordTable/>

            </Grid>
        </div>
    </>);
}
