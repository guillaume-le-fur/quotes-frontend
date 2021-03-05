import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/*class QuoteRow extends React.Component {
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
}*/

function QuoteRow(props) {
    return (
        <tr>
            <td>{props.quote.text}</td>
            <td>{props.quote.author}</td>
            <td>{props.quote.book}</td>
            <td>{props.quote.tags}</td>
        </tr>
    );
}

class QuoteTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rows: []
        }
    }

    render() {
        const filterText = this.props.filterText;
        // const rows = [];
        fetch('/quotes').then(res => res.json()).then(data => {
            this.state.rows = [];
            data.quotes.forEach((quote) => {
                if (quote.text.indexOf(filterText) === -1) {
                    return;
                }
                this.state.rows.push(
                    <QuoteRow
                        quote={quote}
                        key={quote.author} />
                );
            });
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
                <tbody>{this.state.rows}</tbody>
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
                <img src={process.env.PUBLIC_URL + "squirrel_enhanced_auto_x2_colored_toned.png"} width={"100px"} alt={"photo"}/>
                <SearchBar
                    filterText={this.state.filterText}
                    onFilterTextChange={this.handleFilterTextChange}
                />
                <QuoteTable filterText={this.state.filterText} />
            </div>
        );
    }
}

ReactDOM.render(
    <FilterableQuoteTable/>,
    document.getElementById('container')
);
