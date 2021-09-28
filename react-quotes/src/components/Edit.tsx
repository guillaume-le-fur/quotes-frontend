import React, {ChangeEvent, useEffect, useState} from "react";
import useWindowDimensions from "../hooks/useWindowDimensions";
import {useParams} from "react-router-dom";
import {
    Alert,
    Button,
    Card,
    CardActions,
    CardContent,
    Chip,
    IconButton,
    Snackbar,
    TextField,
    Typography,
} from "@mui/material";
import useQuoteDetailService from "../hooks/useQuoteDetailSevice";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined"
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import EditableField from "./EditableField";
import {withRouter, RouteComponentProps} from "react-router";
import {MOBILE_WIDTH} from "../constants";
import {makeStyles} from "@mui/styles";

interface RouteParams {
    id: string
}

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
    valueInputs: {
        flexGrow: 2
    },
    tagItem: {
        margin: "0 3px"
    },
    submitButton: {
        display: "flex",
        justifyContent: "flex-end",
        margin: "0 10px"
    }
}))

const Edit = ({history}: RouteComponentProps) => {

    const params = useParams<RouteParams>();
    const styles = useStyles();
    const service = useQuoteDetailService(params.id);
    const width = useWindowDimensions().width;

    const [currentText, setCurrentText] = useState("");
    const [currentAuthor, setCurrentAuthor] = useState("");
    const [currentBook, setCurrentBook] = useState("");
    const [currentTags, setCurrentTags] = useState(Array<string>());
    const [currentNewTag, setCurrentNewTag] = useState('');

    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarText, setSnackBarText] = useState("");

    function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, func: Function) {
        if (event.target !== undefined) {
            func(event.currentTarget.value)
        }
    }

    async function submitEdit() {
        if (service.status === 'loaded' && service.payload.id !== undefined) {
            const requestOptions = {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    text: currentText,
                    author: currentAuthor,
                    book: currentBook,
                    tags: currentTags
                })
            };
            await fetch('/quote/'.concat(params.id), requestOptions)
                .then(response => {
                    // TODO Handle error
                    if(response.ok) {
                        history.push('/');
                    }else{
                        setSnackBarText("There was an error saving the quote.");
                        setSnackBarOpen(true);
                        console.log("failed");
                    }
                });
        }
    }

    useEffect(() => {
        if (service.status === 'loaded') {
            setCurrentText(service.payload.text)
            setCurrentAuthor(service.payload.author)
            setCurrentBook(service.payload.book)
            setCurrentTags(service.payload.tags)
        }
    }, [service])

    const handleDelete = (tag: string) => {
        setCurrentTags(currentTags.filter(tagName => tagName !== tag))
    }

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

    const handleCloseSnackBar = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
        setSnackBarOpen(false);
        setSnackBarText("");
    };

    return (
        <div>
            {service.status === 'loading' && <div>Loading...</div>}
            {service.status === 'loaded' && (
                <Card style={{margin: width < MOBILE_WIDTH ? "5px" : "30px"}}>
                    <CardContent>
                        <form className={styles.form}>
                            <EditableField
                                label="Text"
                                value={currentText}
                                editableComponent={
                                    <TextField
                                        multiline
                                        className={styles.valueInputs}
                                        maxRows={4}
                                        id="quote-edit-text"
                                        value={currentText}
                                        onChange={(event) =>
                                            handleChange(event, setCurrentText)
                                        }
                                    />
                                }
                            />
                            <EditableField
                                label="Author"
                                value={currentAuthor}
                                editableComponent={
                                    <TextField
                                        className={styles.valueInputs}
                                        id="quote-edit-author"
                                        value={currentAuthor}
                                        onChange={(event) => handleChange(event, setCurrentAuthor)}
                                    />
                                }
                            />
                            <EditableField
                                label="Book"
                                value={currentBook}
                                editableComponent={
                                    <TextField
                                        id="quote-edit-book"
                                        value={currentBook}
                                        onChange={(event) => handleChange(event, setCurrentBook)}
                                    />
                                }
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
                    <CardActions className={styles.submitButton}>
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

            )}
            {service.status === 'error' && <div>Error, the backend moved to the dark side.</div>}
        </div>

    )
}

export default withRouter(Edit);