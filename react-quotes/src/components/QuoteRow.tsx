import * as React from "react";
import Quote from '../types/quote'

const QuoteRow = ({text, author, book, tags}: Quote) => (
    <tr>
        <td>{text}</td>
        <td>{author}</td>
        <td>{book}</td>
        <td>{tags}</td>
    </tr>
)

/*const QuoteRow: React.FC = () => (
  <div className={styles.QuoteRow}>
    QuoteRow Component
  </div>
);*/

export default QuoteRow;
