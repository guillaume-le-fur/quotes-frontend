import React from "react";
import styled from "styled-components";
import {Grid, TextField} from "@mui/material";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

export interface searchBarProps {
    onChange: (text: string) => void;
    filterText: string;
}

const SearchForm = styled.form`
    padding: 1rem;
`

const SearchBar = ({filterText, onChange}: searchBarProps) => (
    <SearchForm>
        <Grid container spacing={1} alignItems="flex-end">
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
    </SearchForm>
);

export default SearchBar;