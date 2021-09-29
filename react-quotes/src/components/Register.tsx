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
    addTag: {
        display: "flex",
        alignItems: "flex-end",
    },
    tagItem: {
        margin: "0 3px"
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


const Register = ({history}: RouteComponentProps) => {
    const width = useWindowDimensions().width;
    const styles = useStyles();

    const [currentUsername, setCurrentUsername] = useState("");
    const [currentEmail, setCurrentEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [currentPasswordConfirmation, setCurrentPasswordConfirmation] = useState("");

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

    async function submitRegister() {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if ( !re.test(currentEmail) ) {
            setSnackBarText("Invalid email address");
            setSnackBarOpen(true);
            return;
        }
        if (currentPassword !== currentPasswordConfirmation){
            setSnackBarText("Passwords don't match")
            setSnackBarOpen(true);
            return;
        }
        authenticationService.register(currentUsername, currentPassword, currentEmail)
            .then(
                (message) => {
                    if (message === undefined){
                        const {from} = {from: {pathname: "/"}};
                        history.push(from)
                    } else {
                        setSnackBarText(message)
                        setSnackBarOpen(true);
                    }
                }
            )
    }

    return (
        <Card style={{margin: width < MOBILE_WIDTH ? "5px" : "20px 500px"}}>
            <CardContent>
                <h1 className={styles.title}>Welcome to Quotes</h1>
                <h2>Register</h2>
                <form className={styles.form}>
                    <TextField
                        id="register-email"
                        value={currentEmail}
                        label='Email'
                        variant='standard'
                        type='email'
                        onChange={(event: any) => handleChange(event, setCurrentEmail)}
                    />
                    <TextField
                        id="register-username"
                        value={currentUsername}
                        label='Username'
                        variant='standard'
                        onChange={(event: any) => handleChange(event, setCurrentUsername)}
                    />
                    <TextField
                        id="register-password"
                        value={currentPassword}
                        label='Password'
                        variant='standard'
                        type='password'
                        onChange={(event: any) => handleChange(event, setCurrentPassword)}
                    />
                    <TextField
                        id="register-password-confirm"
                        value={currentPasswordConfirmation}
                        label='Confirm password'
                        variant='standard'
                        type='password'
                        onChange={(event: any) => handleChange(event, setCurrentPasswordConfirmation)}
                    />
                </form>
            </CardContent>
            <CardActions className={styles.cardActionsStyle}>
                <Button
                    color="primary"
                    size="small"
                    variant="contained"
                    className={styles.largeButton}
                    onClick={submitRegister}
                >
                    Register
                </Button>
                <Link href={"/login"}>Already have an account ? Login here.</Link>
            </CardActions>
            <Snackbar open={snackBarOpen} autoHideDuration={3000} onClose={handleCloseSnackBar}>
                <Alert elevation={6} variant="filled" severity={"error"} onClose={handleCloseSnackBar}>
                    {snackBarText}
                </Alert>
            </Snackbar>
        </Card>
    )
}

export default withRouter(Register);