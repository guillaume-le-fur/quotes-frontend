import React from "react";
import {Grid, TextField} from "@mui/material";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import {makeStyles} from "@mui/styles";

export interface searchBarProps {
    onChange: (text: string) => void;
    filterText: string;
}

const useStyles = makeStyles(() => ({
    form: {
        padding: '1rem'
    }
}))

const SearchBar = ({filterText, onChange}: searchBarProps) => {
    const styles = useStyles();

    return (
        <form className={styles.form}>
            <Grid container spacing={1} alignItems="center">
                <Grid item>
                    <SearchOutlinedIcon />
                </Grid>
                <Grid item>
                    <TextField
                        id="quote-search-field"
                        label="Search a quote"
                        type="search"
                        value={filterText}
                        onChange={event => onChange(event.target.value)}/>
                </Grid>
            </Grid>
        </form>
    );
}

export default SearchBar;