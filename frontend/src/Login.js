import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext.js';
import axios from 'axios'
import { Header } from './Components.js'

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [answer, setAnswer] = useState("");
    const context = useContext(AuthContext);
    const [ step, setStep ] = useState(1);

    const forgotPassword = () => {
        setStep(2);
    }

    const forgotPassword2 = () => {
        setStep(3);
    }

    const forgotPassword3 = () => {
        setStep(1);
    }

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
            axios.get("http://localhost:8000/api/personal_information/", {
                params: {
                    "token": context.token,
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
                {
                    step === 1 && (
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
                            <br/>
                            <button type="Submit" value="forgot password" class="forgot-password-button" onClick={forgotPassword}>Forgot Password?</button>
                        </form>
                    )
                }
                {
                    step === 2 && (
                        <div>
                            <br/>
                            <br/>
                            <label>
                                <div>
                                    <text>Here is your question</text>
                                </div>
                            </label>
                            <br/>
                            <label>
                                <input
                                    type="answer"
                                    value={answer}
                                    onChange={e=>setAnswer(e.target.value)}
                                    class="loginput"
                                />
                            </label>
                            <br/>
                            <button type="Submit" value="submit" class="login-button" onClick={forgotPassword2}>submit</button>
                            <br/>
                        </div>
                    )
                }
                {
                    step === 3 && (
                        <div>
                            <br/>
                            <br/>
                            <label>
                                <div>
                                <input
                                    type="answer"
                                    placeholder="new password"
                                    value={answer}
                                    onChange={e=>setAnswer(e.target.value)}
                                    class="loginput"
                                />
                                </div>
                            </label>
                            <br/>
                            <label>
                                <input
                                    type="answer"
                                    placeholder="new password"
                                    value={answer}
                                    onChange={e=>setAnswer(e.target.value)}
                                    class="loginput"
                                />
                            </label>
                            <br/>
                            <button type="Submit" value="submit" class="login-button" onClick={forgotPassword3}>submit </button>
                            <br/>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default Login;