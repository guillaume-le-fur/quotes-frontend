import React from 'react';
import useQuoteService from "../hooks/useQuoteService";
import QuoteRow from "./QuoteRow";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";

export interface QuoteTableProps {
    filterText: string
}

const QuoteTable = ({filterText}: QuoteTableProps) => {
    const service = useQuoteService({filterText});

    return (
        <div style={{width: "50%"}}>
            {service.status === 'loading' && <div>Loading...</div>}
            {service.status === 'loaded' &&
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Text</TableCell>
                                <TableCell align="right">Author</TableCell>
                                <TableCell align="right">Book</TableCell>
                                <TableCell align="right">Tags</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {service.payload !== undefined && service.payload.map(quote => (
                                <QuoteRow key={quote.id} text={quote.text} author={quote.author} book={quote.book} tags={quote.tags}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            }
              {service.status === 'error' && (
                <div>Error, the backend moved to the dark side.</div>
              )}
        </div>
    )
}



export default QuoteTable;
