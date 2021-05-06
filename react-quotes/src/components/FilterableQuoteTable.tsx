import React, {useEffect, useState} from "react";
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {Subject} from "rxjs";
import SearchBar from "./SearchBar";
import QuoteTable from "./QuoteTable";
import styled from "styled-components";

const textChange = new Subject<string>();

const ContainerDiv = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`


const FilterableQuoteTable = () => {
    const [filterText, setFilterText] = useState<string>('');

    useEffect(() => {
        const subscription = textChange.pipe(
            debounceTime(1000),
            distinctUntilChanged()
        ).subscribe(filterText => setFilterText(filterText));
        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return (
        <ContainerDiv>
            <SearchBar
                filterText={filterText}
                onChange={filterText => {setFilterText(filterText); textChange.next(filterText)}}
            />
            <QuoteTable filterText={filterText}/>
        </ContainerDiv>
    )
}

export default FilterableQuoteTable;