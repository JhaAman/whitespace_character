import React, { useState, useContext } from 'react';
import { AuthContext } from './../../AuthContext.js'
import './SubmitRecog.css'
import axios from 'axios';

function SubmitRecog() {
    const context = useContext(AuthContext);
    // eslint-disable-next-line
    const [ name, setName ] = useState("")
    // eslint-disable-next-line
    const [ recognition, setRecognition ] = useState("");
    // eslint-disable-next-line
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
            <div style={{display: 'flex', flexDirection: 'row', width: '90%', justifyContent: 'space-evenly'}}>
                <h1 style={{fontSize: '12pt', margin: 0}}>Recognizee's Name:</h1>
                <span onChange={() => setName("")} contentEditable={true} style={{width: '75%', textAlign: 'left', backgroundColor: 'white', border: '1px solid black'}}></span>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', width: '90%', justifyContent: 'space-evenly'}}>
                <h1 style={{fontSize: '12pt', margin: 0}}>Recognition:</h1>
                <span onChange={() => setRecognition("")} contentEditable={true} style={{width: '75%', textAlign: 'left', backgroundColor: 'white', border: '1px solid black'}}></span>
            </div>
            <button onClick={() => onSubmit()} style={{width: '25%'}}>submit recognition</button>
        </div>
    );
}

export default SubmitRecog;