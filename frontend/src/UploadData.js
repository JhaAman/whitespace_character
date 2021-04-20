import { TopMenu, Header } from './Components.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
//import React, { useState, useContext } from 'react';
import React, { useState, useEffect } from 'react';
//import { AuthenticationContext } from './AuthContext.js';
import axios from 'axios'

// eslint-disable-next-line
function UploadData() {
    ////when I set input type to File in line 29, clicking the button only crashes the page.
    return (
        <div className="App">
            <TopMenu />
            <header className="body">
                <h3 className="App-title">Administrator Upload Page</h3>
                <br /> <br /> <br /> <br /> <br />
                <div style={{ textAlign: 'center' }}>
                    <Popup trigger={<button>Upload JSON Data</button>} position="center">
                        <form>
                            <div class="uploadbox">
                                <label>
                                    <textarea rows="3" columns="20" placeholder="employee data" class="upload-input" />
                                </label>
                                <br />
                                <label>
                                    <textarea rows="3" columns="20" placeholder="company values" class="upload-input" />
                                </label>
                                <br />
                                <input type="Submit" value="submit" class="upload-button" />
                            </div>
                        </form>
                    </Popup>
                </div>
            </header>
        </div>
    );
}

//this version of UploadData function is modelled after the login function and involves a lot more backend details. 
//A lot of its detials are commented out because I'm not sure of the backend implementation.
//To use it, change export statement at the end of this file to export default UploadData2.
function UploadData2() {
    const [employee, setEmployee] = useState("");
    const [company, setCompany] = useState("");
    const [auth, setAuth] = useState();
    // const value = useContext(AuthenticationContext);

    function authenticate() {
        axios.post("http://localhost:8000/api/get_token/", {
            "username": "root",
            "password": "pwd"
        })
            .then(function (response) {
                setAuth(response.data.access);
                console.log("success");
            });
    }

    function handleUpload(e) {
        let file = e.target.files[0];
        this.setState({})
    }

    const submit = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('values', company);
        formData.append('users', employee);
        // below, fill in URL for database
        axios.post("http://localhost:8000/api/upload_data/", formData,
            {
                headers: {
                    "Authorization": "Bearer " + auth,
                    "Content-Type": "multipart/form-data"
                }
            }).then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            })
    }

    return (
        <div className="app">
            <button onClick={authenticate}>auth</button>
            <Header />
            <div className="body">
                <form onSubmit={submit} encType="multipart/form-data">
                    <br />
                    <br />
                    <label>
                        <h3>Company Values</h3>
                        <div className='uploadinput rounded'>
                            <input
                                type="file"
                                accept=".json"
                                value={company}
                                onChange={e => setCompany(e.target.value)}
                                class="uploadinput"
                            />
                        </div>
                    </label>
                    <br />
                    <label>
                        <h3>Employee Data</h3>
                        <input
                            type="file"
                            accept=".json"
                            value={employee}
                            onChange={e => setEmployee(e.target.value)}
                            class="uploadinput"
                        />
                    </label>
                    <br />
                    <input type="Submit" value="submit" class="upload-button" />
                </form>
            </div>
        </div>
    );
}

const UploadData3 = () => {
    const [files, setFiles] = useState([]);
    const [auth, setAuth] = useState();

    function authenticate() {
        axios.post("http://localhost:8000/api/get_token/", {
            "username": "root",
            "password": "pwd"
        }).then(function (response) {
            setAuth(response.data.access);
            console.log("success");
        });
    }

    function onFileUpload(event) {
        event.preventDefault();
        let id = event.target.id;
        let file_reader = new FileReader();
        let file = event.target.files[0];
        file_reader.onload = () => {
            setFiles([...files, { file_id: id, uploaded_file: file_reader.result }]);
        };
        file_reader.readAsDataURL(file);
    }

    function handleSubmit(e) {
        e.preventDefault();
        axios.post("http://localhost:8000/api/upload_data/", files,
            {
                headers: {
                    "Authorization": "Bearer " + auth,
                }
            }).then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            })
        console.log(files);
    }

    useEffect(() => {
        authenticate();
    }, []);

    return (
        <div className="app">
            <Header />
            <div className="body">
                <form onSubmit={handleSubmit}>
                    <div>
                        <h3>Company Value Data</h3>
                        <input
                            onChange={onFileUpload}
                            id={1}
                            accept=".json"
                            type="file"
                        />
                    </div>
                    <div>
                        <h3>Employee Data</h3>
                        <input
                            onChange={onFileUpload}
                            id={2}
                            accept=".json"
                            type="file"
                        />
                    </div>
                    <button type="submit" className="upload-button">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default UploadData3;