import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext.js';
import axios from 'axios'
import { Header } from './Components.js'
import './Login.css'

function Login() {
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const context = useContext(AuthContext);

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
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className="app">
            <Header/>
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
                    <br/>
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