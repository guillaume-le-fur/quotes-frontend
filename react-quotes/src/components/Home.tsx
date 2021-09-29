import React from 'react';
import FilterableQuoteTable from "./FilterableQuoteTable";
import {makeStyles} from "@mui/styles";
import {Theme} from "@mui/material";



const useStyles = makeStyles((theme: Theme) => ({
    titleDiv: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }
}))


const Home = () => {
    const styles = useStyles();

    return (
        <div className={styles.titleDiv}>
            <h1>Welcome to Quotes !</h1>
            <FilterableQuoteTable />
        </div>
    )
}

export default Home;