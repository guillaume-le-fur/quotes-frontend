import React from 'react';
import useQuoteService from "../hooks/useQuoteService";
import QuoteRow from "./QuoteRow";

export interface QuoteTableProps {
    filterText: string
}

const QuoteTable = ({filterText}: QuoteTableProps) => {
    const service = useQuoteService({filterText});

    return (
        <div>
            {service.status === 'loading' && <div>Loading...</div>}
            {service.status === 'loaded' &&
                <table>
                    <thead>
                        <tr>
                            <th>Text</th>
                            <th>Author</th>
                            <th>Book</th>
                            <th>Tags</th>
                        </tr>
                    </thead>
                    <tbody>
                        {service.payload !== undefined && service.payload.map(quote => (
                            <QuoteRow key={quote.id} text={quote.text} author={quote.author} book={quote.book} tags={quote.tags}/>
                        ))}
                    </tbody>
                </table>
            }
              {service.status === 'error' && (
                <div>Error, the backend moved to the dark side.</div>
              )}
        </div>
    )
}



export default QuoteTable;
