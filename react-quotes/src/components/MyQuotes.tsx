import React from "react";
import QuoteTable from "./QuoteTable";


const MyQuotes = () => {
    return (
        <div>
            <h1>My Quotes</h1>
            <QuoteTable filterText={''} creatorId={'1'}/>
        </div>
    )
}

export default MyQuotes;