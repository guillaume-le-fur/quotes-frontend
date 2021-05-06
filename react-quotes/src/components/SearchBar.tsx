import React from "react";
import styled from "styled-components";

export interface searchBarProps {
    onChange: (text: string) => void;
    filterText: string;
}

const SearchForm = styled.form`
    padding: 1.5rem;
`

const SearchBar = ({onChange, filterText}: searchBarProps) => (
    <SearchForm>
        <input
            type="text"
            placeholder="Search..."
            value={filterText}
            onChange={event => onChange(event.target.value)}
        />
    </SearchForm>
);

export default SearchBar;