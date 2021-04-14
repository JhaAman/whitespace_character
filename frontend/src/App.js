import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Login from './Login.js'
import EmployeeHomepage from './EmployeeHomepage.js';
import Profile from './Profile.js';
import { AuthProvider } from './AuthContext.js';
//import NotificationPage from './NotificationPage.js';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/home'>
            <EmployeeHomepage />
          </Route>
          <Route path='/u/:userid'>
            <Profile />
          </Route>

        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;