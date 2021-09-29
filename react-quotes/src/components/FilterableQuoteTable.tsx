import React, {useEffect, useState} from "react";
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {Subject} from "rxjs";
import SearchBar from "./SearchBar";
import QuoteTable from "./QuoteTable";
import {makeStyles} from "@mui/styles";

const textChange = new Subject<string>();

const useStyles = makeStyles(() => ({
    containerDiv: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }
}));


const FilterableQuoteTable = () => {
    const styles = useStyles();
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
        <div className={styles.containerDiv}>
            <SearchBar
                filterText={filterText}
                onChange={filterText => {setFilterText(filterText); textChange.next(filterText)}}
            />
            <QuoteTable filterText={filterText} creatorId={''}/>
        </div>
    )
}

export default FilterableQuoteTable;