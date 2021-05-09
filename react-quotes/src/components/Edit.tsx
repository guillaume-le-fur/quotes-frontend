import React, {useEffect, useState} from "react";
import useWindowDimensions from "../hooks/useWindowDimensions";
import {useParams} from "react-router-dom";
import {Card, CardContent, Chip, IconButton, makeStyles, TextField} from "@material-ui/core";
import useQuoteDetailService from "../hooks/useQuoteDetailSevice";
import DeleteIcon from "@material-ui/icons/Delete"
import AddIcon from "@material-ui/icons/Add";

interface RouteParams {
    id: string
}

const useStyles = makeStyles((theme) => ({
    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: 'flex-start'
    }
}))


const Edit = () => {
    const params = useParams<RouteParams>();
    const width = useWindowDimensions().width;
    const service = useQuoteDetailService(params.id);
    const styles = useStyles();

    const [tags, setTags] = useState(Array<string>());
    const [currentTag, setCurrentTag] = useState('');

    useEffect(() => {
        if (service.status === 'loaded') {
            setTags(service.payload.tags);
        }
    }, [service.status])

    const handleDelete = (tag: string) => {
        setTags(tags.filter(tagName => tagName !== tag))
    }

    const handleAddIcon = () => {
        setTags(tags.concat([currentTag]));
        setCurrentTag("");
    }

    return (
        <div>
            {service.status === 'loading' && <div>Loading...</div>}
            {service.status === 'loaded' &&
            <Card>
                <CardContent>
                    <form className={styles.form}>
                        <TextField id="quote-edit-text" label="Text" defaultValue={service.payload.text}/>
                        <TextField id="quote-edit-author" label="Author" defaultValue={service.payload.author}/>
                        <TextField id="quote-edit-book" label="Book" defaultValue={service.payload.book}/>
                        <div>
                            {tags.map(tag => (
                                <Chip key={tag} label={tag} onDelete={() => handleDelete(tag)} color="primary" />
                            ))}
                            <TextField id="quote-edit-tag" label="Add tag" placeholder={"science, philosophy, ..."} value={currentTag} onChange={e => setCurrentTag(e.target.value)}/>
                            <IconButton aria-label="add" size="small" onClick={handleAddIcon}>
                                <AddIcon fontSize="small" />
                            </IconButton>
                        </div>

                    </form>
                </CardContent>
            </Card>
            }
            {service.status === 'error' && <div>Error, the backend moved to the dark side.</div>}
        </div>
    )
}

export default Edit;