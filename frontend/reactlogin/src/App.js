import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Login from './Login.js';
import EmployeeHomepage from './EmployeeHomepage.js';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/homepage'>
          <EmployeeHomepage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;