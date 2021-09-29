import React, {ChangeEvent, useState} from "react";
import {
    Button, Card,
    CardActions,
    CardContent,
    Chip,
    IconButton,
    Snackbar,
    TextField,
    Typography,
    Alert
} from "@mui/material";
import useWindowDimensions from "../hooks/useWindowDimensions";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { RouteComponentProps, withRouter } from 'react-router';
import {MOBILE_WIDTH} from "../constants";
import {makeStyles} from "@mui/styles";
import {authenticationService} from "../services/authentication.service";

const useStyles = makeStyles(() => ({
    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: 'stretch',
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
    }
}))

const AddQuote = ({history}: RouteComponentProps) => {
    const width = useWindowDimensions().width;
    const styles = useStyles();

    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarText, setSnackBarText] = useState("");

    const [currentText, setCurrentText] = useState("");
    const [currentAuthor, setCurrentAuthor] = useState("");
    const [currentBook, setCurrentBook] = useState("");
    const [currentTags, setCurrentTags] = useState(Array<string>());
    const [currentNewTag, setCurrentNewTag] = useState('');


    function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, func: Function) {
        if (event.target !== undefined) {
            func(event.currentTarget.value)
        }
    }

    async function submitEdit() {
        console.log(`Current user ID : ${authenticationService.currentUserValue.id}`)
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                text: currentText,
                author: currentAuthor,
                book: currentBook,
                tags: currentTags,
                creator_id: authenticationService.currentUserValue.id
            })
        };
        await fetch('/quote/0', requestOptions)
            .then(response => {
                // TODO Handle error
                if(response.ok) {
                    history.push('/');
                }else{
                    console.log("failed");
                }
            });
    }

    const handleCloseSnackBar = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
        setSnackBarOpen(false);
        setSnackBarText("");
    };

    const handleAddIcon = () => {
        if (currentTags.indexOf(currentNewTag) > -1) {
            setSnackBarText("The tag you are trying to add already exists");
            setSnackBarOpen(true);
            setCurrentNewTag("");
            return;
        }
        if (currentNewTag.length === 0){
            setSnackBarText("The tag cannot be empty");
            setSnackBarOpen(true);
            return;
        }
        setCurrentTags(currentTags.concat([currentNewTag]));
        setCurrentNewTag("");
    }

    const handleDelete = (tag: string) => {
        setCurrentTags(currentTags.filter(tagName => tagName !== tag))
    }

    return (
        <Card style={{margin: width < MOBILE_WIDTH ? "5px" : "30px"}}>
            <CardContent>
                <form className={styles.form}>
                    <Typography variant={"body1"} className={styles.fieldTitle}>Text</Typography>
                    <TextField
                        multiline
                        maxRows={4}
                        id="quote-edit-text"
                        value={currentText}
                        onChange={(event) => handleChange(event, setCurrentText)}
                    />
                    <Typography variant={"body1"} className={styles.fieldTitle}>Author</Typography>
                    <TextField
                        id="quote-edit-author"
                        value={currentAuthor}
                        onChange={(event) => handleChange(event, setCurrentAuthor)}
                    />
                    <Typography variant={"body1"} className={styles.fieldTitle}>Book</Typography>
                    <TextField
                        id="quote-edit-book"
                        value={currentBook}
                        onChange={(event) => handleChange(event, setCurrentBook)}
                    />
                    <Typography variant={"body1"} className={styles.fieldTitle}>Tags</Typography>
                    <div className={styles.tagEditor}>
                        {currentTags.map(tag => (
                            <Chip key={tag} label={tag} className={styles.tagItem} onDelete={() => handleDelete(tag)}
                                  color="primary"/>
                        ))}
                        <div className={styles.addTag}>
                            <TextField
                                id="quote-edit-tag"
                                label="Add tag"
                                placeholder={"science, philosophy, ..."}
                                value={currentNewTag}
                                onChange={e => setCurrentNewTag(e.target.value)}
                            />
                            <IconButton aria-label="add" size="small" onClick={handleAddIcon}>
                                <AddCircleRoundedIcon fontSize="small"/>
                            </IconButton>
                        </div>
                        <Snackbar open={snackBarOpen} autoHideDuration={3000} onClose={handleCloseSnackBar}>
                            <Alert elevation={6} variant="filled" severity={"error"} onClose={handleCloseSnackBar}>
                                {snackBarText}
                            </Alert>
                        </Snackbar>
                    </div>
                </form>
            </CardContent>
            <CardActions>
                <Button
                    color="primary"
                    size="small"
                    startIcon={<SaveOutlinedIcon />}
                    onClick={submitEdit}
                >
                    Submit
                </Button>
            </CardActions>
        </Card>
    )
}


export default withRouter(AddQuote);