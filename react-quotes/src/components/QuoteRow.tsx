import * as React from "react";
import Quote from '../types/quote'
import {TableCell, TableRow} from "@material-ui/core";

const QuoteRow = ({text, author, book, tags}: Quote) => (
    <TableRow key={text}>
        <TableCell component="th" scope="row">{text}</TableCell>
        <TableCell align="right">{author}</TableCell>
        <TableCell align="right">{book}</TableCell>
        <TableCell align="right">{tags.join(', ')}</TableCell>
    </TableRow>
)

export default QuoteRow;
