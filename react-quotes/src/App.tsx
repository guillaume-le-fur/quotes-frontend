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

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/edit'>
            <Edit />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
