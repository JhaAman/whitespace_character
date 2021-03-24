import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

let loginApi = "";

function Login() {
    const[ email, setEmail ] = useState("");
    const[ password, setPassword ] = useState("");
    
    function validate(){
        return email.length > 0 && password.length > 0;
    }

    const submit = (e) => {
        e.preventDefault();
        axios.post(loginApi,{
            email: email,
            password: password
      
        },{
            validateStatus: false
        }).then(function (res) {
            if(res.status === 200){
                console.log("Success!")
            } else if(res.status === 400){
                console.error("Bad request")
            } else if(res.status === 401){
                console.log("Incorrect login")
            } else if(res.status === 404){
                console.error("API not found")
            }
            console.log(res);
        }).catch(function (res) {
            if(res.status === 400){
                console.error("Bad request")
            } else if(res.status === 401){
                console.log("Incorrect login")
            } else if(res.statue === 404){
                console.error("API not found")
            }
            console.log(res);
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
                            value={email}
                            onChange={e => setEmail(e.target.value)}
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
                    <Link to='/homepage'>
                        <input type="submit" value="Submit" hidden={!validate()}/>
                    </Link>
                </form>
            </div>
    );
}

export default Login;