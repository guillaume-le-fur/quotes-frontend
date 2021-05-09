import React from 'react';
import useQuoteService from "../hooks/useQuoteService";
import {Grid} from "@material-ui/core";
import QuoteInfoBox from "./QuoteInfoBox";
import useWindowDimensions from "../hooks/useWindowDimensions";

export interface QuoteTableProps {
    filterText: string
}

const QuoteTable = ({filterText}: QuoteTableProps) => {
    const service = useQuoteService(filterText);
    const width = useWindowDimensions().width;

    return (
        <div style={{width: '100%'}}>
            {service.status === 'loading' && <div>Loading...</div>}
            {service.status === 'loaded' &&
                <Grid container spacing={2}>
                    {service.payload.map(quote =>(
                        <Grid key={quote.text} item xs={width < 500 ? 12 : 4}>
                            <QuoteInfoBox id={quote.id} text={quote.text} author={quote.author} book={quote.book} tags={quote.tags}/>
                        </Grid>
                    ))}
                </Grid>
            }
              {service.status === 'error' && (
                <div>Error, the backend moved to the dark side.</div>
              )}
        </div>
    )
}



export default QuoteTable;
