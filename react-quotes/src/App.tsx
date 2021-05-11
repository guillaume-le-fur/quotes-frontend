import React from 'react';
import './App.css';
import './roboto.css'
import './icon.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Footer from "./components/Footer";
import Edit from "./components/Edit";
import Home from "./components/Home";
import QuoteDetails from "./components/QuoteDetails";
import About from './components/About';
import AddQuote from "./components/AddQuote";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/add' component={AddQuote}/>
          <Route exact path='/about' component={About}/>
          <Route path='/edit/:id' component={Edit}/>
          <Route path='/quote/:id' component={QuoteDetails}/>
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
