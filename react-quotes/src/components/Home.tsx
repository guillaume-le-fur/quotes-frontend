import React from 'react';
import styled from "styled-components";
import FilterableQuoteTable from "./FilterableQuoteTable";

const TitleDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`


const Home = () => (
    <TitleDiv>
        <h1>Welcome to Quotes !</h1>
        <FilterableQuoteTable />
    </TitleDiv>
)

export default Home;