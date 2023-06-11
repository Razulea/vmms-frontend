import Link from '@mui/material/Link';
import React from "react";
import Typography from "@mui/material/Typography";

export default function Copyright() {
    return (<>
            <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © '}
                <Link color="inherit" href="https://netarazvan.com/">
                    Neta Razvan
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
            <Typography variant="body2" color="textSecondary" align="center">
                Version: {process.env.REACT_APP_VERSION}
            </Typography>
        </>
    );
}
