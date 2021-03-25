import React, { useContext } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Login from './Pages/Login/Login.js'
import EmployeeHomepage from './Pages/EmployeeHomepage/EmployeeHomepage.js';
import Profile from './Pages/Profile/Profile.js';
import './App.css';

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
        <Route path='/profile'>
          <Profile />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;