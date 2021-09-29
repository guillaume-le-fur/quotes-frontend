import {useEffect, useState} from "react";
import Service from "../types/service";
import Quote from "../types/quote";
import {authHeader} from "../helpers/auth-header";
import axios from "axios";

export interface Quotes {
    results: Quote[];
}

const useQuoteService = (filterText: string) => {
    const [rows, setRows] = useState<Service<Quote[]>>({status: 'loading'})

    useEffect(() => {
        const queryUrl = filterText && filterText.length > 0 ? '/quotes/' + filterText :  '/quotes'
        setRows({status: 'loading'})
        axios.get(queryUrl, {headers: authHeader()})
            .then((response) => setRows({status: 'loaded', payload: response.data.quotes}))
            .catch((error) => setRows({status: 'error', error: error}))
    }, [filterText])
    return(rows);
};

export default useQuoteService;