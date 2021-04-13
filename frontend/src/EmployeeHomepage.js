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

let profileAPI = "http://localhost:8000/api/get_profile/";

function EmployeeHomepage() {
    const { userid } = useParams();
    const [ setData ] = useState();

      useEffect(() => {
        getData();
      }, []);
    
      let getData = () => {
        axios.get(profileAPI, {
          params: {
            uid: userid
          }
        })
        .then(function (res) {
            setData(res);
        })}

    return (
       
        <div className="app">
            <TopMenu/>
            <div class="body">
                <div class="row">
                    <div className='left-column'>
                        <Recognition recognizerpicture={profilepic2} recipientpicture={profilepic} recipient="Reginald" recognizer="Gwen" message="Everyone is raving about your work on pantelic aristism."/>
                        <Recognition recognizerpicture={profilepic} recipientpicture={profilepic2} recipient="Edith" recognizer="Lancelot" message="I love your ideative reification!"/>
                        <Recognition recognizerpicture={profilepic2} recipientpicture={profilepic} recipient="Millard" recognizer="Eleanor" message="2τ/10 withstandingship at the weekly witenagemot"/>
                    </div>
                    <div className='right-column'>
                        <div className='infobox rounded'>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
     
    );
}

export default EmployeeHomepage;