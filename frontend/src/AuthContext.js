import React, { useState, createContext } from 'react';

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = () => {
    const token = localStorage.getItem('token') ? localStorage.getItem('token')  : '';
    const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {};
    const expiresAt = localStorage.getItem('expiresAt') ? localStorage.getItem('expiresAt') : '';

    const [ authState, setAuthState ] = useState({token: token, userInfo: userInfo});

    const setAuthInfo = ({token, userInfo}) => {
        localStorage.setItem('token', token);
        localStorage.setItems('userInfo', JSON.stringify(userInfo));
    }

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
        localStorage.removeItem('expiresAt');
        setAuthState({token: '', userInfo: {}, expiresAt: ''});
    }

    const isAuthenticated = () => {
        if (authState.token === '') {
            return false;
        } else if (expiresAt > 'Current Date') {
            return false;
        } else {
            return true;
        }
    }
}

export { AuthContext, AuthProvider };