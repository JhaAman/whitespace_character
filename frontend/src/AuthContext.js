import React, { useState, createContext } from 'react';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';
    const uID = localStorage.getItem('uID') ? localStorage.getItem('uID') : '';
    const email = localStorage.getItem('email') ? localStorage.getItem('email') : '';
    const password = localStorage.getItem('password') ? localStorage.getItem('password') : '';
    const role = localStorage.getItem('role') ? localStorage.getItem('role') : '';
    const [ isAuthenticated, setIsAuthenticated ] = useState(false);

    const setToken = ({token}) => {
        localStorage.setItem('token', token);
    }

    const setAuthInfo = ({uID, email, password, role}) => {
        localStorage.setItem('uID', uID);
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        localStorage.setItem('role', role);
    }

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('uID');
        localStorage.removeItem('email');
        localStorage.removeItem('password');
        localStorage.removeItem('role');
    }

    return (
        <AuthContext.Provider
            value={{
                token,
                uID,
                email,
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
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };