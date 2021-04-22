import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';
import ProfilePicture from './../../pics/arnold.jpg'
import { AuthenticationContext } from './../../AuthContext.js'

function Rockstar({value, uid, name, profilePicture}) {
    const context = useContext(AuthenticationContext);

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

    return (
        <div style={{height: '150px', width: '90%', border: '2px solid black', marginBottom: '5px', backgroundColor: 'grey'}}>
            <div style={{width: '100%', height: '20%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', borderBottom: '2px solid black'}}>
                <h1 style={{fontSize: '12pt', fontWeight: 'bold', margin: 0}}>ROCKSTAR OF THE MONTH: {value}</h1>
            </div>
            <div style={{width: '100%', height: '80%', display: 'flex', flexDirection: 'row'}}>
                <div style={{width: '50%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <img src={(profilePicture === "Nothing" || profilePicture === "") ? ProfilePicture : profilePicture} style={{width: '100px', height: '100px', borderRadius: '50%', border: '2px solid black'}}/>
                </div>
                <div style={{width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly'}}>
                    <h2 style={{fontSize: '15pt', margin: 0}}>{name}</h2>
                </div>
            </div>
        </div>
    )
}

export default Rockstar;