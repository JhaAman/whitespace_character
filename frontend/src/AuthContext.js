import React, { useState, createContext } from 'react';

const AuthenticationContext = createContext();

const AuthenticationProvider = ({children}) => {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';
    const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {};
    const expiresAt = localStorage.getItem('expiresAt') ? localStorage.getItem('expiresAt') : '';

    const [ authenticationState, setAuthenticationState ] = useState({token: token, userInfo: userInfo});

    const setAuthenticationInfo = ({token, userInfo}) => {
        localStorage.setItem('token', token);
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
    }

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
        localStorage.removeItem('expiresAt');
        setAuthenticationState({token: '', userInfo: {}, expiresAt: ''});
    }

    const isAuthenticated = () => {
        if (authenticationState.token === '') {
            return false;
        } else if (expiresAt > 'Current Date') {
            return false;
        } else {
            return true;
        }
    }

    return (
        <AuthenticationContext.Provider
            value={{
                authenticationState,
                setAuthenticationState: authInfo => setAuthenticationInfo(authInfo),
                isAuthenticated,
                logout
            }}
        >
            {children}
        </AuthenticationContext.Provider>
    );
}

export { AuthenticationContext, AuthenticationProvider };