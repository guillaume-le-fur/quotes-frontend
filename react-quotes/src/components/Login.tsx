import React, {ChangeEvent, useState} from "react";
import {
    Alert,
    Button,
    Card,
    CardActions,
    CardContent, Link, Snackbar,
    TextField,
} from "@mui/material";
import useWindowDimensions from "../hooks/useWindowDimensions";
import {MOBILE_WIDTH} from "../constants"
import {authenticationService} from "../services/authentication.service";
import {RouteComponentProps, withRouter} from "react-router";
import {makeStyles} from "@mui/styles";


const useStyles = makeStyles(() => ({
    title: {
        textAlign: "center"
    },
    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: 'stretch',
        gap: '10px'
    },
    fieldTitle: {
        marginTop: "20px"
    },
    tagEditor: {
        display: "flex",
        flexWrap: "wrap",

        alignItems: "flex-end",
        justifyContent: "flex-start",

    },
    cardActionsStyle: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: '20px'
    },
    largeButton: {
        width: "100%",
    }
}))


const Login = ({history}: RouteComponentProps) => {
    const width = useWindowDimensions().width;
    const styles = useStyles();

    const [currentUsername, setCurrentUsername] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");

    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarText, setSnackBarText] = useState("");

    function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, func: Function) {
        if (event.target !== undefined) {
            func(event.currentTarget.value)
        }
    }

    const handleCloseSnackBar = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
        setSnackBarOpen(false);
        setSnackBarText("");
    };

    async function submitLogin() {
        authenticationService.login(currentUsername, currentPassword)
            .then(
                (value) => {
                    if (value === undefined){
                        const {from} = {from: {pathname: "/"}};
                        history.push(from);
                    } else {
                        setSnackBarText(value);
                        setSnackBarOpen(true);
                    }
                }
            )
    }

    return (
        <Card style={{margin: width < MOBILE_WIDTH ? "5px" : "20px 500px"}}>
            <CardContent>
                <h1 className={styles.title}>Welcome to Quotes</h1>
                <h2>Login</h2>
                <form className={styles.form}>
                    <TextField
                        id="login-username"
                        value={currentUsername}
                        label='Username'
                        variant='standard'
                        onChange={(event: any) => handleChange(event, setCurrentUsername)}
                    />
                    <TextField
                        id="login-password"
                        value={currentPassword}
                        label='Password'
                        variant='standard'
                        type='password'
                        onChange={(event: any) => handleChange(event, setCurrentPassword)}
                    />
                </form>
            </CardContent>
            <CardActions className={styles.cardActionsStyle}>
                <Button
                    color="primary"
                    size="small"
                    variant="contained"
                    className={styles.largeButton}
                    onClick={submitLogin}
                >
                    Login
                </Button>
                <Link href={"/register"}>Don't have an account yet ? Register here.</Link>
            </CardActions>
            <Snackbar open={snackBarOpen} autoHideDuration={3000} onClose={handleCloseSnackBar}>
                <Alert elevation={6} variant="filled" severity={"error"} onClose={handleCloseSnackBar}>
                    {snackBarText}
                </Alert>
            </Snackbar>
        </Card>
    )
}

export default withRouter(Login);