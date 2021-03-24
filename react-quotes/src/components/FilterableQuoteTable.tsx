import React, {useEffect, useState} from "react";
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {Subject} from "rxjs";
import SearchBar from "./SearchBar";
import QuoteTable from "./QuoteTable";

const textChange = new Subject<string>();


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
        <div>
            <SearchBar
                filterText={filterText}
                onChange={filterText => {setFilterText(filterText); textChange.next(filterText)}}
            />
            <QuoteTable filterText={filterText}/>
        </div>
    )
}

export default FilterableQuoteTable;