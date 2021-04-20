import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext.js';
import axios from 'axios'
import { Header } from './Components.js'

function Login() {
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const context = useContext(AuthContext);

    function validate() {
        return username.length > 0 && password.length > 0;
    }

    const submit = (e) => {
        e.preventDefault();
        
        axios.post("http://localhost:8000/api/get_token/", {
            username: username,
            password: password
        }).then((res) => {
            console.log(res);
            context.setToken(res.data.access);
            context.setIsAuthenticated(true);
            axios.get("http://localhost:8000/api/personal_information/", {
                params: {
                    token: context.token
                },
                headers: {
                    "Authorization": "Bearer " + context.token
                }
            }).then((res) => {
                console.log(res);
                context.setAuthInfo(res.data.uid, username, password, res.data.role);
            }).catch((err) => {
                console.log(err);
            })
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className="app">
            <Header/>
            <div className="body">
                <form onSubmit={submit}>
                    <br/>
                    <br/>
                    <label>
                        <div className='loginput rounded'>
                            <input
                                type="text"
                                placeholder="email"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                class="loginput"
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
                            class="loginput"
                        />
                    </label>
                    <br/>
                    <input type="Submit" value="submit" hidden={!validate()} class="login-button"/>
                </form>
            </div>
        </div>
    );
}

export default Login;