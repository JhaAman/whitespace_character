import React, { useState, useContext } from 'react';
import { AuthenticationContext } from './AuthContext.js';
import axios from 'axios'
import { Header } from './Components.js'
import './Login.css'

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [token,setToken] = useState("");
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
                setToken(res.data.access);
            }
        }).then(function(){
            function sleep(ms){
                return new Promise(resolve => setTimeout(resolve,ms));
            }
            sleep(1000).then(()=>{axios.get("http://localhost:8000/api/user/get_perInfo/",
                    {headers:{
                        Authorization:"Bearer "+token
                    }}).then((res)=>{
                        console.log(res);
                        value.setAuthenticationState({token:token,userInfo:{userID:res.data.uid, username:username, password:password, role:res.data.role}})
                    });
        });})
        .catch((err) => {
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