import React, { useContext } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Login from './Pages/Login/Login.js'
import EmployeeHomepage from './Pages/EmployeeHomepage/EmployeeHomepage.js';
import Profile from './Pages/Profile/Profile.js';
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
          <Route path='/homepage'>
            <EmployeeHomepage />
          </Route>
          <Route path='/profile/:userid'>
            <Profile />
          </Route>
        </Switch>
      </AuthenticationProvider>
    </Router>
  );
}

export default App;