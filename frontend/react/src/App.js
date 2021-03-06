import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Homepage from './Pages/Homepage.js';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/homepage'>
          <Homepage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;