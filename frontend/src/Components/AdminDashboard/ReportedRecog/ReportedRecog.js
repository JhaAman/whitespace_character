import React, { useContext } from 'react';
import { AuthContext } from '../../../AuthContext.js'
import axios from 'axios';
import './ReportedRecog.css'

function ReportedRecogs({rID, recognizer, recognizee, recognition}) {
    const context = useContext(AuthContext);

    const onIgnore = () => {
        axios.post("http://127.0.0.1:8000/api/approve_recognitions/", {
                "rid": rID,
                "ignored": true
        }, {
            headers: {
                "Authorization": "Bearer" + context.token,
                "Content-Type": "application/json"
            }
        }).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        });
    }

    const onDelete = () => {
        axios.post("http://127.0.0.1:8000/api/approve_recognitions/", {
            "rid": rID,
            "ignored": false
        }, {
            headers: {
                "Authorization": "Bearer" + context.token
            }
        }).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <div className='reportedRecog-main-container'>
            <h4>RID: {rID}</h4>
            <h4>{recognizer + " recognized " + recognizee}</h4>
            <h4>{recognition}</h4>
            <div>
                <button onClick={onIgnore}>Ignore</button>
                <button onClick={onDelete}>Delete</button>
            </div>
        </div>
    )
}

export default ReportedRecogs;