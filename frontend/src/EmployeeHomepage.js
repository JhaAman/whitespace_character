
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

let profileAPI = "http://localhost:8000/api/get_profile/";

function EmployeeHomepage() {

    const value = useContext(AuthenticationContext);

      useEffect(() => {
        getData();
      }, []);

      const getData = () => {
        axios.get("http://localhost:8000/api/swagger/" + value.uID,
                {uID:57940164},
                {
                    headers:{
                        Authorization:"Bearer "+ value.uID
                    }
                }
                )
                .then(function(response){
                    console.log(value.uID);
                })
                .catch(error => {
                    console.error(error)
                });
    }

    const rockstarsArray = [{value: 'Communications', firstName: 'Gary', lastName: 'Szekely'}, {value: 'Hard-Working', firstName: 'Reuben', lastName: 'Philip'}, {value: 'Inclusive', firstName: 'Khang', lastName: 'Nguyen'}]

    return (
       
        <div className="app">
            <TopMenu/>
            <div className="body">
                <div className="row">
                <div className='left-column'>
                        <Recognition recognizerpicture={profilepic2} recognizerlink='/u/'getData recipientpicture={profilepic} recipientlink='/u/'getData recipient="Reginald" recognizer="Gwen" message="Everyone is raving about your work on pantelic aristism."/>
                        <Recognition recognizerpicture={profilepic} recognizerlink='/u/'getData recipientpicture={profilepic2} recipientlink='/u/'getData recipient="Edith" recognizer="Lancelot" message="I love your ideative reification!"/>
                        <Recognition recognizerpicture={profilepic2} recognizerlink='/u/'getData recipientpicture={profilepic} recipientlink='/u/'getData recipient="Millard" recognizer="Eleanor" message="2τ/10 withstandingship at the weekly witenagemot"/>
                    </div>
                    <div className='right-column'>
                        <div className='infobox rounded'>
                            {
                                rockstarsArray.map((e) => {
                                    return (<Link className='link' to='/u/'getData><Rockstar value={e.value} firstName={e.firstName} lastName={e.lastName}/></Link>);
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