import React, {useEffect, useState} from 'react';
import './App.css';
import './roboto.css'
import './icon.css'
import {BrowserRouter as Router, Route, Switch,} from "react-router-dom";
import Footer from "./components/Footer";
import Edit from "./components/Edit";
import Home from "./components/Home";
import QuoteDetails from "./components/QuoteDetails";
import About from './components/About';
import AddQuote from "./components/AddQuote";
import MyQuotes from "./components/MyQuotes";
import Login from "./components/Login";
import {authenticationService} from "./services/authentication.service";
import Account from "./components/Account";
import axios from "axios";
import {PrivateRoute} from "./components/PrivateRoute";
import Register from "./components/Register";

export const axiosInstance = axios.create({
    baseURL: ''
})

// axiosInstance.defaults.headers.post['Content-Type'] = 'application/json'
axiosInstance.defaults.headers.post['Access-Control-Allow-Origin'] = '*'


function App() {
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        authenticationService.currentUser.subscribe(x => setCurrentUser(x));
    }, [])

    return (
        <Router>
            <div>
                <Switch>
                    <PrivateRoute exact path='/' component={Home}/>
                    <PrivateRoute exact path='/myQuotes' component={MyQuotes}/>
                    <PrivateRoute exact path='/add' component={AddQuote}/>
                    <PrivateRoute exact path='/about' component={About}/>
                    <PrivateRoute path='/edit/:id' component={Edit}/>
                    <PrivateRoute path='/quote/:id' component={QuoteDetails}/>
                    <PrivateRoute path='/account' component={Account}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/register' component={Register}/>
                </Switch>
                <Footer currentUser={currentUser}/>
            </div>
        </Router>
    );
}

export default App;
