import React, { useState, useContext } from 'react';
import { AuthenticationContext } from './AuthContext.js';
import axios from 'axios'
import { Header } from './Components.js'

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const value = useContext(AuthenticationContext);

    function validate() {
        return username.length > 0 && password.length > 0;
    }

    const submit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:8000/api/get_token/", {
            username: username,
            password: password

        }, {
            validateStatus: false
        }).then((res) => {
            console.log(res);
            if (res.status === 200) {
                value.setAuthenticationState({ token: res.data.access, userInfo: { userID: res.data.user_id, username: username, password: password, role: 'employee' } })
            }
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