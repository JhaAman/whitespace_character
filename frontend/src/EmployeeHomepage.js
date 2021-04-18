<<<<<<< Updated upstream
import React from 'react';
import profilepic from './pics/arnold.jpg';
import profilepic2 from './pics/regina.png';
import { Recognition, TopMenu } from './Components.js';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import axios from 'axios'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Profile } from './Profile.js';
=======
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
>>>>>>> Stashed changes

let profileAPI = "http://localhost:8000/api/get_profile/";

function EmployeeHomepage() {
<<<<<<< Updated upstream
    const { userid } = useParams();
    const [ setData ] = useState();
=======

    const value = useContext(AuthenticationContext);
>>>>>>> Stashed changes

      useEffect(() => {
        getData();
      }, []);
<<<<<<< Updated upstream
    
      let getData = () => {
        axios.get(profileAPI, {
          params: {
            uid: userid
          }
        })
        .then(function (res) {
            setData(res);
        })}
=======

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
>>>>>>> Stashed changes

    return (
       
        <div className="app">
            <TopMenu/>
<<<<<<< Updated upstream
            <div class="body">
                <div class="row">
                    <div className='left-column'>
                        <Recognition recognizerpicture={profilepic2} recipientpicture={profilepic} recipient="Reginald" recognizer="Gwen" message="Everyone is raving about your work on pantelic aristism."/>
                        <Recognition recognizerpicture={profilepic} recipientpicture={profilepic2} recipient="Edith" recognizer="Lancelot" message="I love your ideative reification!"/>
                        <Recognition recognizerpicture={profilepic2} recipientpicture={profilepic} recipient="Millard" recognizer="Eleanor" message="2τ/10 withstandingship at the weekly witenagemot"/>
=======
            <div className="body">
                <div className="row">
                <div className='left-column'>
                        <Recognition recognizerpicture={profilepic2} recognizerlink='/u/'getData recipientpicture={profilepic} recipientlink='/u/'getData recipient="Reginald" recognizer="Gwen" message="Everyone is raving about your work on pantelic aristism."/>
                        <Recognition recognizerpicture={profilepic} recognizerlink='/u/'getData recipientpicture={profilepic2} recipientlink='/u/'getData recipient="Edith" recognizer="Lancelot" message="I love your ideative reification!"/>
                        <Recognition recognizerpicture={profilepic2} recognizerlink='/u/'getData recipientpicture={profilepic} recipientlink='/u/'getData recipient="Millard" recognizer="Eleanor" message="2τ/10 withstandingship at the weekly witenagemot"/>
>>>>>>> Stashed changes
                    </div>
                    <div className='right-column'>
                        <div className='infobox rounded'>
<<<<<<< Updated upstream
                            <br></br>
                            <b><i><div style={{fontSize:30}}>This month’s hero:</div></i></b>
                            <img src={profilepic} className="rounded-circle" width="150px" height="auto" alt="Smiling guy"></img>
                            <br></br><br></br>
                            <Link className='link' to='/u/'getData>Charles Martel</Link>
                            <br></br><br></br>
                            [other statistics can go here]
                            <br></br>
                            <br></br>
                            <br></br>
=======
                            {
                                rockstarsArray.map((e) => {
                                    return (<Link className='link' to='/u/'getData><Rockstar value={e.value} firstName={e.firstName} lastName={e.lastName}/></Link>);
                                })
                            }
>>>>>>> Stashed changes
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
     
    );
}

export default EmployeeHomepage;