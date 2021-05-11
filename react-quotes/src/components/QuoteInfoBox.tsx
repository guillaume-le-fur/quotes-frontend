import React, {useState} from "react";
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Chip,
    Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle,
    makeStyles,
    Typography
} from "@material-ui/core";
import Quote from "../types/quote";
import TextFieldsOutlinedIcon from '@material-ui/icons/TextFieldsOutlined';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined';

import {SpeedDial, SpeedDialAction, SpeedDialIcon} from "@material-ui/lab";
import { RouteComponentProps, withRouter } from 'react-router';
import useWindowDimensions from "../hooks/useWindowDimensions";
import {MOBILE_WIDTH} from "../constants";

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
        marginRight: 4,
        marginTop: 10
    },
    chipsPlaceholder :{
        marginRight: 4,
        marginTop: 10,
        padding: "12px 0"
    },
    actionButton: {
        margin: theme.spacing(1),
    }
}));

interface QuoteInfoBoxProps {
    quote: Quote,
    onQuoteDelete: Function
}

const QuoteInfoBox = ({quote, onQuoteDelete, history}: QuoteInfoBoxProps & RouteComponentProps) => {
    const classes = useStyles();

    const width = useWindowDimensions().width;

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [speedDialOpen, setSpeedDialOpen] = useState(false);

    const copyText = () => navigator.clipboard.writeText(quote.text)
    const copyCitationInfo = () => navigator.clipboard.writeText([quote.author, quote.book].join(", "));

    const handleCloseDeleteDialog = () => setDeleteDialogOpen(false);
    const handleOpenDeleteDialog = () => setDeleteDialogOpen(true);

    const handleSpeedDialOpen = () => setSpeedDialOpen(true);
    const handleSpeedDialClose = () => setSpeedDialOpen(false);

    const goToEdit = () => {
        if(quote.id !== undefined) {
            history.push('/edit/'.concat(quote.id.toString()))
        }
    }

    const speedDialElements = [
        { icon: <TextFieldsOutlinedIcon />, name: 'Copy text', onClick: copyText},
        { icon: <FileCopyOutlinedIcon />, name: 'Copy citing info', onClick: copyCitationInfo},
        { icon: <EditOutlinedIcon />, name: 'Edit', onClick: goToEdit},
        { icon: <DeleteOutlined />, name: 'Delete', onClick: handleOpenDeleteDialog},
    ]

    return (
        <Card style={{margin: width < MOBILE_WIDTH ? "0 5px" : "0"}}>
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
                {quote.tags.length > 0 ? quote.tags.map(tag => <Chip key={tag} label={tag} className={classes.chips} size="small"/>) :
                    <div className={classes.chipsPlaceholder}/>
                }
            </CardContent>
            <CardActions>
                <div className={classes.header}>
                    <SpeedDial
                        ariaLabel={"actions"}
                        open={speedDialOpen}
                        onOpen={handleSpeedDialOpen}
                        icon={<SpeedDialIcon openIcon={<MoreHorizOutlinedIcon />} icon={<MoreVertOutlinedIcon/>}/>}
                        onClose={handleSpeedDialClose}
                        direction="right"
                        FabProps={{size: "small"}}
                    >
                        {speedDialElements.map(element => (
                            <SpeedDialAction
                                key={element.name}
                                icon={element.icon}
                                onClick={element.onClick}
                                tooltipTitle={element.name}
                            />
                        ))}
                    </SpeedDial>
                </div>
            </CardActions>
            <Dialog
                open={deleteDialogOpen}
                onClose={handleCloseDeleteDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Confirm quote deletion?</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      This will permanently delete the quote from the database.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={() => {onQuoteDelete(quote); handleCloseDeleteDialog()}} color="primary" autoFocus>
                      Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>
    )
}


export default withRouter(QuoteInfoBox);