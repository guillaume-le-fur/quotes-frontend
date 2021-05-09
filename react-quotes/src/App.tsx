import React from 'react';
import './App.css';
import './roboto.css'
import './icon.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Header from "./components/Header";
import Edit from "./components/Edit";
import Home from "./components/Home";
import QuoteDetails from "./components/QuoteDetails";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/edit/:id'>
            <Edit />
          </Route>
          <Route path='/quote/:id'>
            <QuoteDetails />
          </Route>
        </Switch>
      </div>
      <Header />
    </Router>
  );
}

export default App;
