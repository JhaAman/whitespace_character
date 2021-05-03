import React, { useState, createContext } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';
    const uid = localStorage.getItem('uid') ? localStorage.getItem('uid') : '';
    const username = localStorage.getItem('username') ? localStorage.getItem('username') : '';
    const password = localStorage.getItem('password') ? localStorage.getItem('password') : '';
    const role = localStorage.getItem('role') ? localStorage.getItem('role') : '';
    const [ isAuthenticated, setIsAuthenticated ] = useState(false);
    const [theme,sTheme] = useState('wood-theme');

    const setToken = (t) => {
        localStorage.setItem('token', t);
    }

    const setAuthInfo = (u, user, p, r) => {
        localStorage.setItem('uid', u);
        localStorage.setItem('username', user);
        localStorage.setItem('password', p);
        localStorage.setItem('role', r);
    }

    const setTheme = (t) => {
        localStorage.setItem('theme',t);
        sTheme(t);
    }

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('uid');
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        localStorage.removeItem('role');
    }

    return (
        <AuthContext.Provider
            value={{
                token,
                uid,
                username,
                password,
                role,
                isAuthenticated,
                theme,
                setIsAuthenticated,
                setToken,
                setAuthInfo,
                setTheme,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };