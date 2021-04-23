import { Recognition, TopMenu } from './Components.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import ManagerComp from './ManagerComponent.js';
import FeedRecognition from './Components/FeedRecognition/FeedRecognition.js';
import SubmitRecog from './Components/SubmitRecog/SubmitRecog.js';
import Rockstar from './Components/Rockstar/Rockstar.js';
import profilepic from './pics/arnold.jpg';
import profilepic2 from './pics/regina.png';
import { Link } from 'react-router-dom';
import axios from 'axios'
import React, { useState, useContext, useEffect } from 'react';
import { Profile } from './Profile.js';
import { AuthenticationContext } from './AuthContext.js';

function EmployeeHomepage() {

        const context = useContext(AuthenticationContext);
    
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
    

    const rockstarsArray = [{value: 'Communications', firstName: 'Gary', lastName: 'Szekely'}, {value: 'Hard-Working', firstName: 'Reuben', lastName: 'Philip'}, {value: 'Inclusive', firstName: 'Khang', lastName: 'Nguyen'}]

    return (
       
        <div className="app">
            <TopMenu/>
            <div className="body">
                <div className="row">
                <div className='left-column'>
                        <Recognition recognizerpicture={profilepic2} recognizerlink='/u/'uid recipientpicture={profilepic} recipientlink='/u/'uid recipient="Reginald" recognizer="Gwen" message="Everyone is raving about your work on pantelic aristism."/>
                        <Recognition recognizerpicture={profilepic} recognizerlink='/u/'uid recipientpicture={profilepic2} recipientlink='/u/'uid recipient="Edith" recognizer="Lancelot" message="I love your ideative reification!"/>
                        <Recognition recognizerpicture={profilepic2} recognizerlink='/u/'uid recipientpicture={profilepic} recipientlink='/u/'uid recipient="Millard" recognizer="Eleanor" message="2τ/10 withstandingship at the weekly witenagemot"/>
                    </div>
                    <div className='right-column'>
                        <div className='infobox rounded'>
                            {
                                rockstarsArray.map((e) => {
                                    return (<Link className='link' to='/u/'useEffect><Rockstar value={e.value} firstName={e.firstName} lastName={e.lastName}/></Link>);
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