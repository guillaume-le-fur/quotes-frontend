import React, {useEffect, useState} from 'react';
import useQuoteService from "../hooks/useQuoteService";
import {Grid} from "@mui/material";
import QuoteInfoBox from "./QuoteInfoBox";
import useWindowDimensions from "../hooks/useWindowDimensions";
import Quote from "../types/quote";
import {MOBILE_WIDTH} from "../constants";

export interface QuoteTableProps {
    filterText: string,
    creatorId: string
}

const QuoteTable = ({filterText, creatorId}: QuoteTableProps) => {
    const [quotes, setQuotes] = useState<Quote[]>([]);

    const service = useQuoteService(filterText);
    const width = useWindowDimensions().width;

    useEffect(() => {
        if (service.status === "loaded"){
            let q = service.payload;
            if(creatorId !== undefined && creatorId.length > 0){
                console.log(`'ID : ${creatorId}'`)
                console.log(q);
                q = q.filter((quote) => quote.creatorId === creatorId);
            }
            setQuotes(q);
        }
    }, [service, creatorId])

    async function handleDeleteQuote(quote: Quote) {
        if(quote.id !== undefined){
            const requestOptions = {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({})
            };
            await fetch('/quote/'.concat(quote.id.toString()), requestOptions)
                .then(response => {
                    // TODO Handle error
                    if(response.ok) {
                        return response.json()
                    }else{
                        console.log("delete failed")
                    }
                });
            const index = quotes.indexOf(quote);
            if(index > -1){
                setQuotes(quotes.filter(item => item.id !== quote.id))
            }
        }
    }

    return (
        <div style={{width: '100%'}}>
            {service.status === 'loading' && <div>Loading...</div>}
            {service.status === 'loaded' &&
                <div>
                    <Grid container spacing={1}>
                        {quotes && quotes.map(quote =>(
                            <Grid key={quote.text} item xs={width < MOBILE_WIDTH ? 12 : 4}>
                                <QuoteInfoBox quote={quote} onQuoteDelete={handleDeleteQuote}/>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            }
            {service.status === 'error' && (
                <div>Error, the backend moved to the dark side.</div>
            )}
        </div>
    )
}



export default QuoteTable;
