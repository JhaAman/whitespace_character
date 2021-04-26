import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext.js';
import axios from 'axios'
import { Header } from './Components.js'
import './Login.css'

function Login() {
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ answer, setAnswer ] = useState("");
    const [ message, setMessage ] = useState("");
    const [ rootToken, setRootToken ] = useState("");
    const [ securityQuestion, setSecurityQuestion ] = useState("");
    const [ newPasswordsEqual, setNewPasswordsEqual ] = useState(false);
    const context = useContext(AuthContext);
    const [ step, setStep ] = useState(4);

    const submit = (e) => {
        e.preventDefault();
    }

    const forgotPassword = () => {
        setStep(2);
    }

    const forgotPassword2 = () => {
        onSubmitEmail();
        setStep(3);
    }

    const forgotPassword3 = () => {
        onSubmitAnswer();
    }
    const forgotPassword4 = () => {
        onResetPassword();
        setStep(1);
    }

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

    const onSubmitEmail = () => {
        axios.post("http://localhost:8000/api/get_token/", {
            username: "root",
            password: "pwd"
        }).then((res) => {
            console.log(res);
            setRootToken(res.data.access);
            axios.get("http://127.0.0.1:8000/api/user/get_question/", {
                params: {
                    "username": username
                },
                headers: {
                    "Authorization": "Bearer " + rootToken
                }
            }).then((res) => {
                console.log(res)
                setSecurityQuestion(res.data["question"]);
            }).catch((err) => {
                console.log(err);
            });
        }).catch((err) => {
            console.log(err);
        })
    }

    const onSubmitAnswer = () => {
        axios.post("http://127.0.0.1:8000/api/user/checking_security/", {
            "question": securityQuestion,
            "answer": answer,
            "username": username
        }, {
            headers: {
                "Authorization": "Bearer " + rootToken
            }
        }).then((res) => {
            console.log(res);
            if (res.status === 200) {
                setStep(4);
                setMessage("");
            } else {
                setMessage("Incorrect answer");
            }
        }).catch((err) => {
            console.log(err);
            setMessage("Incorrect answer");
        })
    }

    const onResetPassword = () => {
        axios.post("", {
            "username": username,
            "new": password
        }, {
            headers: {
                "Authorization": "Bearer " + rootToken
            }
        }).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className="app">
            <Header />
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
                            <input
                                type="text"
                                placeholder="email"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                class="loginput"
                            />
                           <br/>
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
                            <label>
                                <div>
                                    <text>
                                        { securityQuestion }
                                    </text>
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
                            <text>{message}</text>
                            <br/>
                            <button type="Submit" value="submit" class="login-button" onClick={forgotPassword3}>submit</button>
                            <br/>
                        </div>
                    )
                }
                {
                    step === 4 && (
                        <div>
                            <br/>
                            <br/>
                            <label>
                                <div>
                                <input
                                    type="answer"
                                    placeholder="new password"
                                    value={password}
                                    onChange={e=>setPassword(e.target.value)}
                                    class="loginput"
                                />
                                </div>
                            </label>
                            <br/>
                            <label>
                                <input
                                    type="answer"
                                    placeholder="new password"
                                    onChange={(e) => setNewPasswordsEqual(password === e.target.value)}
                                    class="loginput"
                                />
                            </label>
                            <br/>
                            <button hidden={newPasswordsEqual} type="Submit" value="submit" class="login-button" onClick={forgotPassword4}>submit </button>
                            <br/>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default Login;