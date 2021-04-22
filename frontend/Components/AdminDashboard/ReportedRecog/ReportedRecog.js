import React, { useContext } from 'react';
import { AuthenticationContext } from '../../../src/AuthContext.js'
import axios from 'axios';
import Arnold from '../../../pics/arnold.jpg'
import './ReportedRecog.css'

function ReportedRecog({ rid, uidFrom, uidTo, comments }) {
    const context = useContext(AuthenticationContext);

    const onIgnore = () => {
        axios.get('http://127.0.0.1:8000/api/approve_recognitions/?rid=' + rid + "&ignored=true",
            {
                headers: {
                    'Authorization': 'Bearer ' + context.token
                }
            })
            .then((res) => {
                console.log(res);
                window.location.reload(true);
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
                window.location.reload(true);
            }).catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className='main-container'>
            <div className='left-container'>
                <div className='profile-container'>
                    <img src={Arnold} style={{width: '90px', height: '90px', borderRadius: '50%', border: '2px solid black'}} />
                </div>
                <div style={{height: '50%', width: '100%'}} />
            </div>
            <div className='right-container'>
                <div className='name-container'>
                    <h1 style={{fontSize: '18pt'}}>{uidFrom} recognized {uidTo}</h1>
                </div>
                <div className='comment-container'>
                    <p style={{textAlign: 'left'}}>{comments}</p>
                </div>
                <div className='comment-container'>
                    <button onClick={onIgnore}>Ignore</button>
                    <button onClick={onDelete}>Delete</button>
                </div>
            </div>
        </div>
    );
}

export default ReportedRecog;