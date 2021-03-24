import {useEffect, useState} from "react";
import Service from "../types/service";
import Quote from "../types/quote";

export interface QuoteServiceProps {
    filterText: string;
}

export interface Quotes {
    results: Quote[];
}

const useQuoteService = ({filterText}: QuoteServiceProps) => {
    const [rows, setRows] = useState<Service<Quote[]>>({status: 'loading'})

    useEffect(() => {
        if(filterText !== undefined && filterText.length > 0){
            setRows({status: 'loading'})
            fetch('/quotes/'.concat(filterText))
                .then(response => response.json())
                .then(response => {setRows({status: 'loaded', payload: response.quotes})})
                .catch(error => setRows({status: 'error', error: error}));
        }
    }, [filterText])
    console.log(rows)
    return(rows)
};

export default useQuoteService;