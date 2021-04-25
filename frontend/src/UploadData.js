import { Header } from './Components.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
//import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
//import React, { useState, ,useEffect, useContext } from 'react';
import React, { useState, useEffect } from 'react';
//import { AuthenticationContext } from './AuthContext.js';
import axios from 'axios'


const UploadData = () => {
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
        axios.post("http://localhost:8000/api/upload/create/", files,
            {
                headers: {
                    "Authorization": "Bearer " + auth,
                }
            }).then((res) => {
                console.log(files);
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

export default UploadData;