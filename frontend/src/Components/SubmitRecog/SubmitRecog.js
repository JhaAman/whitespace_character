import React, { useState, useContext } from 'react';
import { AuthContext } from './../../AuthContext.js'
import './SubmitRecog.css'
import axios from 'axios';

function SubmitRecog() {
    const context = useContext(AuthContext);
    const [ name, setName ] = useState("")
    const [ recognition, setRecognition ] = useState("");
    const [ onSuccess, setOnSuccess ] = useState(false);

    const onSubmit = () => {
        axios.post('http://localhost:8000/api/create_recognition/', {}, {
            headers: {
                "Authorization": "Bearer " + context.token
            }
        }).then((res) => {
            if (res.status === 200) {
                setOnSuccess(true);
            } else {
                setOnSuccess(false);
            }
        })
    }

    return (
        <div className='submit-main-container'>
            <div style={{display: 'flex', flexDirection: 'row', width: '75%', justifyContent: 'space-between'}}>
                <h1 style={{fontSize: '12pt', margin: 0}}>Name:</h1>
                <input onChange={(e) => setName(e.target.value)} style={{width: '75%'}}/>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', width: '75%', justifyContent: 'space-between'}}>
                <h1 style={{fontSize: '12pt', margin: 0}}>Comment:</h1>
                <input style={{width: '75%'}}/>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', width: '90%', justifyContent: 'space-evenly'}}>
                <h1 style={{fontSize: '12pt', margin: 0}}>Tags:</h1>
                <h1>{name}</h1>
            </div>
            <button onClick={() => onSubmit()} style={{width: '25%'}}>Submit Recognition</button>
        </div>
    );
}

export default SubmitRecog;