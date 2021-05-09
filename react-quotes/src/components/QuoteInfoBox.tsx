import React from "react";
import {Box, Button, Card, CardActions, CardContent, Chip, makeStyles, Typography} from "@material-ui/core";
import Quote from "../types/quote";
import TextFieldsOutlinedIcon from '@material-ui/icons/TextFieldsOutlined';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    header: {
        display: 'flex',
        justifyContent: "flex-end",
        alignItems: "flex-end",
        flexWrap: "wrap"
    },

    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 18,
    },
    pos: {
        marginTop: 12,
    },
    chips: {
        marginRight: 4
    },
    actionButton: {
        margin: theme.spacing(1),
    }
}));

const QuoteInfoBox = (quote: Quote) => {
    const classes = useStyles();
    return (
        <Card>
            <CardContent>
                <Box className={classes.title} fontStyle="italic" color="textSecondary">
                    {quote.text}
                </Box>
                <Typography color="textSecondary">
                    {quote.author}
                </Typography>
                <Typography className={classes.pos} variant="body2" component="p">
                    {quote.book}
                </Typography>
                 {quote.tags.map(tag => <Chip key={tag} label={tag} className={classes.chips} size="small"/>)}
            </CardContent>
            <CardActions>
                <div className={classes.header}>
                    <Button
                        color="primary"
                        size="small"
                        className={classes.actionButton}
                        startIcon={<TextFieldsOutlinedIcon />}
                      >
                        Copy text
                    </Button>
                    <Button
                        color="primary"
                        size="small"
                        component={Link}
                        to={quote.id !== undefined ?
                            '/edit/'.concat(quote.id.toString()) :
                            '/'
                        }
                        className={classes.actionButton}
                        startIcon={<FileCopyOutlinedIcon />}
                      >
                        Get citation
                    </Button>
                    <Button
                        color="primary"
                        size="small"
                        className={classes.actionButton}
                        startIcon={<EditOutlinedIcon />}
                      >
                        Edit
                    </Button>
                </div>
            </CardActions>
        </Card>
    )
}


export default QuoteInfoBox;