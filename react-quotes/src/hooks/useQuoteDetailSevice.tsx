import {useEffect, useState} from "react";
import Service from "../types/service";
import Quote from "../types/quote";

const useQuoteDetailService = (id: string) => {
    const [quote, setQuote] = useState<Service<Quote>>({status: 'loading'})

    useEffect(() => {
        const queryUrl = '/quote/'.concat(id);
        setQuote({status: 'loading'});
        fetch(queryUrl)
            .then(response => response.json())
            .then(response => setQuote({status: 'loaded', payload: response}))
            .catch(error => setQuote({status: 'error', error: error}))
    }, [id])
    console.log(quote);
    return(quote);
}

export default useQuoteDetailService;