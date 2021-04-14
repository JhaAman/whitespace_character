import React, { useContext } from 'react';
import ProfilePicture from '../../pics/arnold.jpg'
import { AuthenticationContext } from './../../AuthContext.js';
import axios from 'axios';

function Rockstar({value, firstName, lastName}) {
    const context = useContext(AuthenticationContext);
    
    const onSubmit = () => {
        const body = {
            "uid": "36371474"
        }

        const config = {
            headers: {
                "Authorization": "Bearer " + context.authenticationState.token
            }
        }

        axios.get("http://127.0.0.1:8000/api/get_rockstars/", 
            body, 
            config
        ).then((res) => {
            console.log(context.authenticationState.token);
            console.log(res);
        }).catch((err) => {
            console.log(context.authenticationState.token);
            console.log(err);
        });
    }

    return (
        <div style={{height: '150px', width: '90%', border: '2px solid black', marginBottom: '5px'}}>
            <div style={{width: '100%', height: '20%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', borderBottom: '2px solid black'}}>
            <button onClick={() => onSubmit()}>Click Me</button>
                <h1 style={{fontSize: '12pt', fontWeight: 'bold', margin: 0}}>ROCKSTAR OF THE MONTH: {value}</h1>
            </div>
            <div style={{width: '100%', height: '80%', display: 'flex', flexDirection: 'row'}}>
                <div style={{width: '50%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <img src={ProfilePicture} style={{width: '100px', height: '100px', borderRadius: '50%', border: '2px solid black'}}/>
                </div>
                <div style={{width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly'}}>
                    <h2 style={{fontSize: '15pt', margin: 0}}>{firstName} {lastName}</h2>
                </div>
            </div>
        </div>
    )
}

export default Rockstar;