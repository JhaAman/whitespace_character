import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom'
import { AuthContext } from './AuthContext.js';
import axios from 'axios'
import { Header } from './Components.js'
import './Login.css'

function Login() {
    const [ username, setUsername ] = useState(localStorage.getItem('username') ? localStorage.getItem('username') : "");
    const [ password, setPassword ] = useState(localStorage.getItem('password') ? localStorage.getItem('password') : "");
    const [ answer, setAnswer ] = useState("");
    const [ message, setMessage ] = useState("");
    const [ securityQuestion, setSecurityQuestion ] = useState("");
    const [ newPasswordsEqual, setNewPasswordsEqual ] = useState(false);
    const context = useContext(AuthContext);
    const history = useHistory();
    const [ step, setStep ] = useState(1);

    const forgotPassword = () => {
        setStep(2);
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
            context.setTheme(res.data.color_theme);
            history.push('/home');
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
            localStorage.setItem('rootToken', res.data.access)
            axios.get("http://127.0.0.1:8000/api/user/get_question/", {
                params: {
                    "username": username
                },
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem('rootToken')
                }
            }).then((res) => {
                console.log(res)
                setSecurityQuestion(res.data["question"]);
                setStep(3);
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
                "Authorization": "Bearer " + localStorage.getItem('rootToken')
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
        axios.post("http://127.0.0.1:8000/api/user/change_password/", {
            "username": username,
            "new": password
        }, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('rootToken')
            }
        }).then((res) => {
            console.log(res);
            setStep(1);
            setNewPasswordsEqual(false);
            localStorage.removeItem('rootToken')
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className="app wood-theme">
            <Header />
            <div className="body">
                {
                    step === 1 && (
                        <form onSubmit={onSubmit}>
                            <br/>
                            <br/>
                            <label>
                                <div className='loginput rounded'>
                                    <input
                                        type="text"
                                        value={username}
                                        placeholder="email"
                                        onChange={e => setUsername(e.target.value)}
                                        class="loginput"
                                    />
                                </div>
                            </label>
                            <br/>
                            <label>
                                <input
                                    type="password"
                                    value={password}
                                    placeholder="password"
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
                                onChange={e => setUsername(e.target.value)}
                                class="loginput"
                            />
                           <br/>
                            <br/>
                            <button type="Submit" value="submit" class="login-button" onClick={onSubmitEmail}>submit</button>
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
                                    onChange={e=>setAnswer(e.target.value)}
                                    class="loginput"
                                />
                            </label>
                            <br/>
                            <text>{message}</text>
                            <br/>
                            <button type="Submit" value="submit" class="login-button" onClick={onSubmitAnswer}>submit</button>
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
                                    type="password"
                                    placeholder="new password"
                                    onChange={e=>setPassword(e.target.value)}
                                    class="loginput"
                                />
                                </div>
                            </label>
                            <br/>
                            <label>
                                <input
                                    type="password"
                                    placeholder="confirm new password"
                                    onChange={(e) => setNewPasswordsEqual(password === e.target.value)}
                                    class="loginput"
                                />
                            </label>
                            <br/>
                            <button hidden={!newPasswordsEqual  } type="Submit" value="submit" class="login-button" onClick={onResetPassword}>submit </button>
                            <br/>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default Login;