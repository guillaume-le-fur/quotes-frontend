import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class QuoteRow extends React.Component {
    render() {
        const quote = this.props.quote;

        return (
            <tr>
                <td>{quote.text}</td>
                <td>{quote.author}</td>
                <td>{quote.book}</td>
                <td>{quote.tags}</td>
            </tr>
        );
    }
}

class QuoteTable extends React.Component {
    render() {
        const filterText = this.props.filterText;
        const rows = [];

        this.props.quotes.forEach((quote) => {
            if (quote.text.indexOf(filterText) === -1) {
                return;
            }
            rows.push(
                <QuoteRow
                    quote={quote}
                    key={quote.author} />
            );
        });
        return (
            <table>
                <thead>
                    <tr>
                        <th>Text</th>
                        <th>Author</th>
                        <th>Book</th>
                        <th>Tags</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
}

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    }

    handleFilterTextChange(e) {
        this.props.onFilterTextChange(e.target.value);
    }

    render() {
        return (
            <form>
                <input
                    type="text"
                    placeholder="Search..."
                    value={this.props.filterText}
                    onChange={this.handleFilterTextChange}
                />
            </form>
        );
    }
}

class FilterableQuoteTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: ''
        };

        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    }

    handleFilterTextChange(filterText) {
        this.setState({
            filterText: filterText
        });
    }

    render() {
        return (
            <div>
                <SearchBar
                    filterText={this.state.filterText}
                    onFilterTextChange={this.handleFilterTextChange}
                />
                <QuoteTable
                    quotes={this.props.quotes}
                    filterText={this.state.filterText}
                />
            </div>
        );
    }
}

const QUOTES = [
    {
        "id": 1,
        "text": "Alea iacta est",
        "author": "Julius Caesar",
        "book": "De vita Caesarum",
        "tags": [
            "war",
            "peace"
        ]
    },
    {
        "id": 2,
        "text": "All we have to decide is what to do with the time that is given us",
        "author": "J.R.R. Tolkein",
        "book": "The Fellowship of the Ring",
        "tags": [
            "fantasy"
        ]
    }
];

ReactDOM.render(
    <FilterableQuoteTable quotes={QUOTES} />,
    document.getElementById('container')
);