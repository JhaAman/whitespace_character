import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthenticationContext } from './AuthContext.js';
import axios from 'axios'

function Login() {
    const[ username, setUsername ] = useState("");
    const[ password, setPassword ] = useState("");
    const value = useContext(AuthenticationContext);
    
    function validate(){
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
                value.setAuthenticationState({token: res.data.access, userInfo: {userID: res.data.user_id, username: username, password: password, role: 'employee'}})
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    
    return (
        <div className="app">
            <div className="header">
                <i>whitespaß</i>
            </div>
            <div className="frontier"/>
                <form onSubmit={submit}>
                    <br/>
                    <br/>
                    <label>
                        <input
                            type="text"
                            placeholder="Email"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                    </label>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <label>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={e=>setPassword(e.target.value)}
                        />
                    </label>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                        <input type="submit" value="Submit" hidden={!validate()}/>
                </form>
            </div>
    );
}

export default Login;