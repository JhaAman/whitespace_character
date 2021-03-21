import React from 'react';
import Login from './Login.js';
import EmployeeHomepage from './EmployeeHomepage.js';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import './App.css';

//import React, {useState} from 'react';
import axios from 'axios';

let loginApi = "http://localhost:8000/api/log_in/";


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