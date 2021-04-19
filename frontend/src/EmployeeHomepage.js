import React, { useState, useContext, useEffect } from 'react';
import FeedRecognition from './Components/FeedRecognition/FeedRecognition.js';
import SubmitRecog from './Components/SubmitRecog/SubmitRecog.js';
import { Recognition, TopMenu, Rockstar } from './Components.js';
import { AuthContext } from './AuthContext.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import ManagerComp from './ManagerComponent.js';
import axios from 'axios';

function EmployeeHomepage() {
    const context = useContext(AuthContext);

    const rockstarsArray = [{value: 'Communications', firstName: 'Gary', lastName: 'Szekely'}, {value: 'Hard-Working', firstName: 'Reuben', lastName: 'Philip'}, {value: 'Inclusive', firstName: 'Khang', lastName: 'Nguyen'}]

    const [ recognitions, setRecognitions ] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/recog/get/user/", {
            params: {
                "uid": context.uID
            },
            headers: {
                "Authorization": "Bearer " + context.token
            }
        }).then((res) => {
            console.log(res);
            setRecognitions(res.data.data);
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    return (
        <div className="app">
            <TopMenu/>
            <div className="body">
                <div className="row">
                    <div className='left-column'>
                        <SubmitRecog />
                        <div style={{width: '100%', marginBottom: '10px', height: '10px', borderBottom: '2px dashed white'}} />
                        {
                            recognitions.map((e) => {
                                return (<FeedRecognition recognizer={e.uid_from} recognizee={e.uid_to} comment={e.comments} />);
                            })
                        }
                    </div>
                    <div className='right-column'>
                        <div className='autoinfobox rounded' style={{height:'auto'}}>
                            <ManagerComp/>
                        </div>
                        <div className='infobox rounded'>
                            {
                                rockstarsArray.map((e) => {
                                    return (<Rockstar value={e.value} firstName={e.firstName} lastName={e.lastName} />);
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
     
    );
}

export default EmployeeHomepage;