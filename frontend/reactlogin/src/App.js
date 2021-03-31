
import React from 'react';
import Login from './Login.js';
import EmployeeHomepage from './EmployeeHomepage.js';
// eslint-disable-next-line
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Profile from './Profile.js';
//import React, {useState} from 'react';
// eslint-disable-next-line
import axios from 'axios';

// eslint-disable-next-line
let loginApi = "http://localhost:8000/api/log_in/";


function App() {
  return (
    <Router>
      <Switch>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/home'>
          <EmployeeHomepage />
        </Route>
        <Route path='/me'>
          <Profile/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
