import React from "react";
import styled from "styled-components";
import {Grid, TextField} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';

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
            <SearchIcon />
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