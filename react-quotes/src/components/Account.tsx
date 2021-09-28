import React from 'react';
import {authenticationService} from "../services/authentication.service";
import Button from "@mui/material/Button";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import {RouteComponentProps, withRouter} from "react-router";

const Account = ({history}: RouteComponentProps) => {

    function logout() {
        authenticationService.logout();
        history.push('/login');
    }

    return(
        <div>
            <h1>Account information</h1>
            <p>Username : {authenticationService.currentUserValue.username}</p>
            <Button
                color="primary"
                size="small"
                startIcon={<SaveOutlinedIcon />}
                onClick={logout}
                >
                Logout
            </Button>
        </div>
    )
}

export default withRouter(Account);