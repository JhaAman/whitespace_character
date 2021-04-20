<<<<<<<< HEAD:frontend/src/Home.js
import React from 'react';
import { Recognition, TopMenu, Rockstar } from './Components.js';
import profilepic from './pics/arnold.jpg';
import profilepic2 from './pics/regina.png';
========
import { Recognition, TopMenu, Rockstar } from './Components.js';
>>>>>>>> lily2:frontend/src/EmployeeHomepage.js
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css'
import './App.css'
import ManagerComp from './ManagerComponent.js';
<<<<<<<< HEAD:frontend/src/Home.js
========
import profilepic from './pics/arnold.jpg';
import profilepic2 from './pics/regina.png';
import { Link } from 'react-router-dom';
import axios from 'axios'
import React, { useEffect, useContext } from 'react';
import { Profile } from './Profile.js';
import { AuthenticationContext } from './AuthContext.js';

>>>>>>>> lily2:frontend/src/EmployeeHomepage.js
function EmployeeHomepage() {
    const rockstarsArray = [{value: 'Communications', firstName: 'Gary', lastName: 'Szekely'}, {value: 'Hard-Working', firstName: 'Reuben', lastName: 'Philip'}, {value: 'Inclusive', firstName: 'Khang', lastName: 'Nguyen'}]

      useEffect(() => {
        const getData = () => {
            axios.post("http://localhost:8000/api/create_user/", {
                    "tid": "37965959",
                    "first_name": "Peter",
                    "last_name": "Dent",
                    "email": "pd@apple.com",
                    "password": "elephant",
                    "title": "Quality Engineer",
                    "user_role": "emp"
              })
            .then(function(res){
                console.log(res);
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
<<<<<<<< HEAD:frontend/src/Home.js
                    <div className='left-column'>
                        <Recognition recognizerpicture={profilepic2} recipientpicture={profilepic} recipient="Reginald" recognizer="Gwen" message="Everyone is raving about your work on pantelic aristism."/>
                        <Recognition recognizerpicture={profilepic} recipientpicture={profilepic2} recipient="Edith" recognizer="Lancelot" message="I love your ideative reification!"/>
                        <Recognition recognizerpicture={profilepic2} recipientpicture={profilepic} recipient="Millard" recognizer="Eleanor" message="2τ/10 withstandingship at the weekly witenagemot"/>
========
                <div className='left-column'>
                        <Recognition recognizerpicture={profilepic2} recognizerlink='/u/'useEffect recipientpicture={profilepic} recipientlink='/u/'useEffect recipient="Reginald" recognizer="Gwen" message="Everyone is raving about your work on pantelic aristism."/>
                        <Recognition recognizerpicture={profilepic} recognizerlink='/u/'useEffect recipientpicture={profilepic2} recipientlink='/u/'useEffect recipient="Edith" recognizer="Lancelot" message="I love your ideative reification!"/>
                        <Recognition recognizerpicture={profilepic2} recognizerlink='/u/'useEffect recipientpicture={profilepic} recipientlink='/u/'useEffect recipient="Millard" recognizer="Eleanor" message="2τ/10 withstandingship at the weekly witenagemot"/>
>>>>>>>> lily2:frontend/src/EmployeeHomepage.js
                    </div>
                    <div className='right-column'>
                        <div className='autoinfobox rounded' style={{height:'auto'}}>
                            <ManagerComp/>
                        </div>
                        <div className='infobox rounded'>
                            {
                                rockstarsArray.map((e) => {
<<<<<<<< HEAD:frontend/src/Home.js
                                    return (<Rockstar value={e.value} firstName={e.firstName} lastName={e.lastName} />);
========
                                    return (<Link className='link' to='/u/'useEffect><Rockstar value={e.value} firstName={e.firstName} lastName={e.lastName}/></Link>);
>>>>>>>> lily2:frontend/src/EmployeeHomepage.js
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