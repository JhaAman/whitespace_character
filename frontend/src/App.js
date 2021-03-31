import React, { useContext } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Login from './Login.js'
import EmployeeHomepage from './EmployeeHomepage.js';
import Profile from './Profile.js';
import { AuthenticationProvider } from './AuthContext.js';
import './App.css';

function App() {
  return (
    <Router>
      <AuthenticationProvider>
      <Switch>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/home'>
            <EmployeeHomepage />
          </Route>
          <Route path='/me'>
            <Profile />
          </Route>
        </Switch>
      </AuthenticationProvider>
    </Router>
  );
}

export default App;