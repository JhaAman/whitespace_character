import React from 'react';
import axios from 'axios';

function Login() {
    let loginSuccess = false;

    let url = 'localhost:8000/api/login'
    let credentials = {
        email: '',
        password: ''
    }

    axios.post(url, credentials, {
        headers: {
            'Content-type': 'application/json'
        }
    }).then((response) => {
        if (response.status === 200) {
            loginSuccess = true;
        } else {
            loginSuccess = false;
        }
    }).catch((error) => {
        console.log(error);
    });
}

export default Login;