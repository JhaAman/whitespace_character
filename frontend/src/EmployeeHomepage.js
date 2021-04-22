import { Recognition, TopMenu, Rockstar } from './Components.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import ManagerComp from './ManagerComponent.js';
import profilepic from './pics/arnold.jpg';
import profilepic2 from './pics/regina.png';
import { Link } from 'react-router-dom';
import axios from 'axios'
import React, { useEffect, useContext } from 'react';
import { Profile } from './Profile.js';
import { AuthenticationContext } from './AuthContext.js';

function EmployeeHomepage() {

      useEffect(() => {
        const getData = () => {
            axios.post("http://localhost:8000/api/create_user/", {
                    "uid": "58853681",
                    "date_created": "2021-04-07T01:07:21.379321Z",
                    "tid": "75498409",
                    "first_name": "George",
                    "last_name": "Lee",
                    "email": "glee@123.com",
                    "password": "1234",
                    "job_title": "Developer",
                    "user_role": "emp",
                    "title": "",
                    "badges": [
                        "Rockstar of the month in Jan 2019",
                        "Best Dressed",
                        "Collaboration Badge",
                        "Innovation Badge",
                        "Simplicity Badge",
                        "10 Recognitions Received"
                    ]
                })
            .then(function(){
                return ({
                    'method':'GET',
                    'params': {
                        'uid':'uid',
                    },
                })
            })
            .catch(error => {
                console.error(error)
            });
        }
        getData();
      }, []);

    const rockstarsArray = [{value: 'Communications', firstName: 'Gary', lastName: 'Szekely'}, {value: 'Hard-Working', firstName: 'Reuben', lastName: 'Philip'}, {value: 'Inclusive', firstName: 'Khang', lastName: 'Nguyen'}]

    return (
       
        <div className="app">
            <TopMenu/>
            <div className="body">
                <div className="row">
                <div className='left-column'>
                        <Recognition recognizerpicture={profilepic2} recognizerlink='/u/'useEffect recipientpicture={profilepic} recipientlink='/u/'useEffect recipient="Reginald" recognizer="Gwen" message="Everyone is raving about your work on pantelic aristism."/>
                        <Recognition recognizerpicture={profilepic} recognizerlink='/u/'useEffect recipientpicture={profilepic2} recipientlink='/u/'useEffect recipient="Edith" recognizer="Lancelot" message="I love your ideative reification!"/>
                        <Recognition recognizerpicture={profilepic2} recognizerlink='/u/'useEffect recipientpicture={profilepic} recipientlink='/u/'useEffect recipient="Millard" recognizer="Eleanor" message="2τ/10 withstandingship at the weekly witenagemot"/>
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