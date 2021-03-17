import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
<<<<<<< HEAD
import React, {useState} from 'react';
import axios from 'axios';

let loginApi = "http://localhost:8000/api/log_in/";
=======
import Login from './Login.js';
import EmployeeHomepage from './EmployeeHomepage.js';
>>>>>>> c29572e00c780706c8badd8ccd2462138350c8ab

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