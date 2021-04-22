import React, { useState, createContext } from 'react';

const AuthenticationContext = createContext();

const AuthenticationProvider = ({ children }) => {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';
    const uid = localStorage.getItem('uid') ? localStorage.getItem('uid') : '';
    const username = localStorage.getItem('username') ? localStorage.getItem('username') : '';
    const password = localStorage.getItem('password') ? localStorage.getItem('password') : '';
    const role = localStorage.getItem('role') ? localStorage.getItem('role') : '';
    const [ isAuthenticated, setIsAuthenticated ] = useState(false);

    const setToken = (t) => {
        localStorage.setItem('token', t);
    }

    const setAuthInfo = (u, user, p, r) => {
        localStorage.setItem('uid', u);
        localStorage.setItem('username', user);
        localStorage.setItem('password', p);
        localStorage.setItem('role', r);
    }

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('uid');
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        localStorage.removeItem('role');
    }

    return (
        <AuthenticationContext.Provider
            value={{
                token,
                uid,
                username,
                password,
                role,
                isAuthenticated,
                setIsAuthenticated,
                setToken,
                setAuthInfo,
                logout
            }}
        >
            {children}
        </AuthenticationContext.Provider>
    );
}

export { AuthenticationContext, AuthenticationProvider };