import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom'
import { AuthContext } from './AuthContext.js';
import axios from 'axios'
import { Header } from './Components.js'
import './Login.css'

function Login() {
    const [ username, setUsername ] = useState(localStorage.getItem('username') ? localStorage.getItem('username') : "");
    const [ password, setPassword ] = useState(localStorage.getItem('password') ? localStorage.getItem('password'): "");
    const context = useContext(AuthContext);
    const history = useHistory();

    function validate() {
        return username.length > 0 && password.length > 0;
    }

    const onSubmit = (e) => {
        e.preventDefault();
        
        axios.post("http://localhost:8000/api/get_token/", {
            username: username,
            password: password
        }).then((res) => {
            console.log(res);
            context.setToken(res.data.access);
            context.setAuthInfo(res.data.uid, username, password, res.data.role);
            history.push("/home");
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className="app">
            <Header />
            <div className="body">
                <form onSubmit={onSubmit}>
                    <br/>
                    <br/>
                    <label>
                        <div className='loginput rounded'>
                            <input
                                type="text"
                                placeholder="email"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                className="loginput"
                            />
                        </div>
                    </label>
                    <br />
                    <label>
                        <input
                            type="password"
                            placeholder="password"
                            value={password}
                            onChange={e=>setPassword(e.target.value)}
                            className="loginput"
                        />
                    </label>
                    <br/>
                    <input type="Submit" value="submit" hidden={!validate()} className="login-button"/>
                </form>
            </div>
        </div>
    );
}

export default Login;