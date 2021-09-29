import React, {useState} from "react";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Theme,
    Typography
} from "@mui/material";
import Quote from "../types/quote";
import TextFieldsOutlinedIcon from '@mui/icons-material/TextFieldsOutlined';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";
import {RouteComponentProps, withRouter} from 'react-router';
import useWindowDimensions from "../hooks/useWindowDimensions";
import {GOLD1, MOBILE_WIDTH} from "../constants";
import QuoteInfoBoxActions from "./QuoteInfoBoxActions";
import {makeStyles} from "@mui/styles";
import {authenticationService} from "../services/authentication.service";

const useStyles = makeStyles((theme: Theme) => ({
    header: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText
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
    chipsPlaceholder: {
        marginRight: 4,
        marginTop: 10,
        padding: "12px 0"
    },
    author: {
        textAlign: "right"
    }
}));

interface QuoteInfoBoxProps {
    quote: Quote,
    onQuoteDelete: Function,
}

export interface speedDialElementProps {
    icon: any,
    name: string,
    onClick: any
}

const QuoteInfoBox = ({quote, onQuoteDelete, history}: QuoteInfoBoxProps & RouteComponentProps) => {
    const classes = useStyles();

    const width = useWindowDimensions().width;

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const copyText = () => navigator.clipboard.writeText(quote.text)
    const copyCitationInfo = () => navigator.clipboard.writeText([quote.author, quote.book].join(", "));

    const handleCloseDeleteDialog = () => setDeleteDialogOpen(false);
    const handleOpenDeleteDialog = () => setDeleteDialogOpen(true);

    const goToEdit = () => {
        if (quote.id !== undefined) {
            history.push('/edit/'.concat(quote.id.toString()))
        }
    }

    let speedDialElements = Array<speedDialElementProps>();
    speedDialElements.push(
        {icon: <TextFieldsOutlinedIcon color="secondary"/>, name: 'Copy text', onClick: copyText},
        {icon: <FileCopyOutlinedIcon color="secondary"/>, name: 'Copy citing info', onClick: copyCitationInfo}
    )

    if (quote.creatorId === authenticationService.currentUserValue.id || authenticationService.currentUserValue.is_admin) {
        speedDialElements.push(
            {icon: <EditOutlinedIcon color="secondary"/>, name: 'Edit', onClick: goToEdit},
            {icon: <DeleteOutlined color="secondary"/>, name: 'Delete', onClick: handleOpenDeleteDialog}
        )
    }

    return (
        <Card style={{margin: width < MOBILE_WIDTH ? "0 5px" : "5px"}}>
            <CardHeader
                avatar={<Avatar sx={{bgcolor: GOLD1}} aria-label={"avatar-" + quote.creatorId}>{quote.creatorUsername?.charAt(0)}</Avatar>}
                action={<QuoteInfoBoxActions actions={speedDialElements}/>}
                title={
                    <div>
                        {quote.creatorUsername?.toString()}
                    </div>
                }
                subheader={new Date(quote.creationDate).toLocaleDateString()}
                className={classes.header}
            />

            <CardContent>
                <Box className={classes.title} fontStyle="italic" color="textSecondary">
                    {quote.text}
                </Box>
                <Typography className={classes.author} color="primary">
                    {quote.author}
                </Typography>
                <Typography className={classes.pos} variant="body2" component="p">
                    {quote.book}
                </Typography>
                {quote.tags.length > 0 ? quote.tags.map(tag => <Chip color="primary" key={tag} label={tag} className={classes.chips}
                                                                     size="small"/>) :
                    <div className={classes.chipsPlaceholder}/>
                }
            </CardContent>
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
                    <Button onClick={() => {
                        onQuoteDelete(quote);
                        handleCloseDeleteDialog()
                    }} color="primary" autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>
    )
}


export default withRouter(QuoteInfoBox);