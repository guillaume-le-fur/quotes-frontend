import {useEffect, useState} from "react";
import Service from "../types/service";
import Quote from "../types/quote";
import {authHeader} from "../helpers/auth-header";
import axios from "axios";

const useQuoteDetailService = (id: string) => {
    const [quote, setQuote] = useState<Service<Quote>>({status: 'loading'})

    useEffect(() => {
        setQuote({status: 'loading'});
        axios.get(`/quote/${id}`, {headers: authHeader()})
            .then(response => setQuote({status: 'loaded', payload: response.data}))
            .catch(error => setQuote({status: 'error', error: error}))
    }, [id])
    return(quote);
}

export default useQuoteDetailService;