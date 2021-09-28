import React, {useState} from "react";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Typography
} from "@mui/material";
import Quote from "../types/quote";
import TextFieldsOutlinedIcon from '@mui/icons-material/TextFieldsOutlined';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import { RouteComponentProps, withRouter } from 'react-router';
import useWindowDimensions from "../hooks/useWindowDimensions";
import {LIGHT_BLUE1, MOBILE_WIDTH} from "../constants";
import QuoteInfoBoxActions from "./QuoteInfoBoxActions";
import {makeStyles} from "@mui/styles";
import {authenticationService} from "../services/authentication.service";

const useStyles = makeStyles(() => ({
    header: {
        backgroundColor: LIGHT_BLUE1
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
        marginTop: 10,
        backgroundColor: LIGHT_BLUE1
    },
    chipsPlaceholder :{
        marginRight: 4,
        marginTop: 10,
        padding: "12px 0"
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
        if(quote.id !== undefined) {
            history.push('/edit/'.concat(quote.id.toString()))
        }
    }

    let speedDialElements = Array<speedDialElementProps>();
    speedDialElements.push(
        { icon: <TextFieldsOutlinedIcon />, name: 'Copy text', onClick: copyText},
        { icon: <FileCopyOutlinedIcon />, name: 'Copy citing info', onClick: copyCitationInfo}
    )

    if(quote.creatorId === authenticationService.currentUserValue.id || authenticationService.currentUserValue.is_admin){
        speedDialElements.push(
            { icon: <EditOutlinedIcon />, name: 'Edit', onClick: goToEdit},
            { icon: <DeleteOutlined />, name: 'Delete', onClick: handleOpenDeleteDialog}
        )
    }

    return (
        <Card style={{margin: width < MOBILE_WIDTH ? "0 5px" : "5px"}}>
            <CardHeader
                avatar={<Avatar aria-label={"avatar-" + quote.creatorId}>{quote.creatorId}</Avatar>}
                action={<QuoteInfoBoxActions actions={speedDialElements}/>}
                title={
                    <div>
                        {quote.creatorId.toString().charAt(0)}
                        <IconButton style={{width: "20px", height: "20px", margin:"3px"}}>
                            <PersonAddOutlinedIcon style={{width: "20px"}} />
                        </IconButton>
                    </div>
                }
                subheader={quote.book}
                className={classes.header}
            />

            <CardContent>
                <Box className={classes.title} fontStyle="italic" color="textSecondary">
                    {quote.text}
                </Box>
                <Typography style={{"textAlign": "right"}} color="textSecondary">
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