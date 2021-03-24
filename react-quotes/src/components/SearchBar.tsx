import React from "react";

export interface searchBarProps {
    onChange: (text: string) => void;
    filterText: string;
}

const SearchBar = ({onChange, filterText}: searchBarProps) => (
    <form>
        <input
            type="text"
            placeholder="Search..."
            value={filterText}
            onChange={event => onChange(event.target.value)}
        />
    </form>
);

export default SearchBar;