import React, { useState, useContext, useEffect } from 'react';
import FeedRecognition from './Components/FeedRecognition/FeedRecognition.js';
import SubmitRecog from './Components/SubmitRecog/SubmitRecog.js';
import Rockstar from './Components/Rockstar/Rockstar.js';
import { TopMenu } from './Components.js';
import { AuthContext } from './AuthContext.js';
import profilepic from './pics/arnold.jpg';
import profilepic2 from './pics/regina.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css'
import './App.css'
import ManagerComp from './ManagerComponent.js';
import axios from 'axios';

function EmployeeHomepage() {
    const context = useContext(AuthContext);

    const [ rockstarValues, setRockstarValues ] = useState([]);
    const [ rockstars, setRockstars ] = useState({});

    const [ recognitions, setRecognitions ] = useState([]);

    const getRecognitions = () => {
        axios.get("http://localhost:8000/api/recog/get/user/", {
            params: {
                "uid": context.uid
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
    }

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/get_rockstar/", {
            headers: {
                "Authorization": "Bearer " + context.token
            }
        }).then((res) => {
            setRockstarValues(res.data[0].values);
            setRockstars(res.data[1]);
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    useEffect(() => getRecognitions(), []);

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
                                return (<FeedRecognition uidFrom={e.uid_from} uidTo={e.uid_to} comment={e.comments} />);
                            })
                        }
                    </div>
                    <div className='right-column'>
                        <div className='autoinfobox rounded' style={{height:'auto'}} hidden={value.authenticationState.userInfo.role!=="mng"}>
                            <ManagerComp/>
                        </div>
                        <div className='infobox rounded'>
                            {
                                rockstarValues.map((e) => {
                                    let rockstar = rockstars[e] ? rockstars[e] : {"uid": "", "name": "", "profile_picture": ""}
                                    return (<Rockstar value={e} uid={rockstar["uid"]} name={rockstar["name"]} profilePicture={'http://localhost:8000' + rockstar["profile_picture"]} />);
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