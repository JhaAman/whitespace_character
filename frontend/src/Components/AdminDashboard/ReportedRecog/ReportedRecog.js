import React, { useContext } from 'react';
import { AuthContext } from '../../../AuthContext.js'
import axios from 'axios';
import './ReportedRecog.css'

function ReportedRecogs({ rid, uidFrom, uidTo, comments }) {
    const context = useContext(AuthContext);

    const onIgnore = () => {
        axios.get('http://127.0.0.1:8000/api/approve_recognitions/?rid=' + rid + "&ignored=true",
            {
                headers: {
                    'Authorization': 'Bearer ' + context.token
                }
            })
            .then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            });
    }

    const onDelete = () => {
        axios.get('http://127.0.0.1:8000/api/approve_recognitions/?rid=' + rid + "&ignored=false",
            {
                headers: {
                    'Authorization': 'Bearer ' + context.token
                }
            })
            .then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className='reportedRecog-main-container'>
            <h4>{uidFrom + " recognized " + uidTo}</h4>
            <h4>{comments}</h4>
            <div>
                <button onClick={onIgnore}>Ignore</button>
                <button onClick={onDelete}>Delete</button>
            </div>
        </div>
    )
}

export default ReportedRecogs;