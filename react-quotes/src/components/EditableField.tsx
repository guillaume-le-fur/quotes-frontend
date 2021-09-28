import React, {useState} from "react";
import {Box, IconButton, Typography} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import {makeStyles} from "@mui/styles";

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
                        <CheckOutlinedIcon/>
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