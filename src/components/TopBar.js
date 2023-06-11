import React from "react";
import Typography from "@mui/material/Typography";
import MuiAppBar from '@mui/material/AppBar';
import {IconButton, Toolbar} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import {useNavigate} from "react-router-dom";
import UserProfileModal from "./UserProfileModal";
import {QuestionMarkRounded} from "@mui/icons-material";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import TutorialModal from "./TutorialProfileModal";


export default function TopBar() {
    const [userModalOpen, setUserModalOpen] = React.useState(false);

    const [tutorialModalOpen, setTutorialModalOpen] = React.useState(false);


    const handleUserModalClose = (event) => {
        setUserModalOpen(false);
        setTutorialModalOpen(false);
    };

    const handleTutorialModalClose = (event) => {
        setTutorialModalOpen(false);
    };


    const navigate = useNavigate();
    return (<>
        userModalOpen &&
        <UserProfileModal open={userModalOpen} onClose={handleUserModalClose}/>
        tutorialModalOpen &&
        <TutorialModal open={tutorialModalOpen} onClose={handleTutorialModalClose}/>
        <MuiAppBar position="absolute">
            <Toolbar>
                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    marginLeft={5}
                    sx={{flexGrow: 1}}
                >
                    Virtual Machine Management System
                </Typography>
                <IconButton color="inherit" onClick={() => setTutorialModalOpen(true)}>
                    <QuestionMarkIcon/>
                </IconButton>
                <IconButton color="inherit" style={{marginLeft: 10}} onClick={() => setUserModalOpen(true)}>
                    <PersonIcon/>
                    {/*<Typography variant="body1">John Doe</Typography>*/}
                </IconButton>
                <IconButton color="inherit" style={{marginLeft: 10}} onClick={() => navigate("/logout")}>
                    <LogoutIcon/>
                    {/*<Typography variant="body1">Logout</Typography>*/}
                </IconButton>
            </Toolbar>
        </MuiAppBar>        </>);
}
