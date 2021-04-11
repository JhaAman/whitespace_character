import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Login from './Login.js'
import Home from './Home.js';
import Profile from './Profile.js';
import { AuthenticationProvider } from './AuthContext.js';
//import NotificationPage from './NotificationPage.js';
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
            <Home />
          </Route>
          <Route path='/u/:userid'>
            <Profile />
          </Route>

        </Switch>
      </AuthenticationProvider>
    </Router>
  );
}

export default App;