import React, {useState} from "react";
import {Box, IconButton, makeStyles, Typography} from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import {CheckOutlined} from "@material-ui/icons";

interface EditableFieldProps {
    label: string,
    value: any,
    editableComponent: any,
}

const useStyles = makeStyles(() => ({
    inlineItems: {
        display: "flex",
        alignItems: "center",
        minWidth: 200
    },
    fieldTitle: {
        marginTop: "20px"
    },
    valueInputs: {
        flexGrow: 2
    }
}));

const EditableField = ({label, value, editableComponent}: EditableFieldProps) => {
    const [edit, setEdit] = useState(false);

    const styles = useStyles();

    const handleEditOpen = () => {
        setEdit(true);
    }

    const handleEditClose = () => {
        setEdit(false);
    }

    return (
        <div>
            <Typography variant={"body1"} className={styles.fieldTitle}>{label}</Typography>
            {edit ?
                 <div className={styles.inlineItems}>
                    {editableComponent}
                    <IconButton onClick={handleEditClose}>
                        <CheckOutlined/>
                    </IconButton>
                </div> :
                <div className={styles.inlineItems}>
                    <Box className={styles.valueInputs}>{value}</Box>
                    <IconButton onClick={handleEditOpen}>
                        <EditOutlinedIcon/>
                    </IconButton>
                </div>

            }
        </div>
    )
}

export default EditableField;