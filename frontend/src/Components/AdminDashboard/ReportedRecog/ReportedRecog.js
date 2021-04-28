import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../../AuthContext.js'
import axios from 'axios';
import Arnold from '../../../pics/arnold.jpg'
import './ReportedRecog.css'

function ReportedRecog({ rid, uidFrom, uidTo, comments }) {
    const context = useContext(AuthContext);
    const [ fromName, setFromName ] = useState("")
    const [ toName, setToName ] = useState("");
    const [ fromProfilePic, setFromProfilePic ] = useState("");
    const [ toProfilePic, setToProfilePic ] = useState("");

    const getNames = () => {
        axios.get("http://127.0.0.1:8000/api/user/get_name/", {
            params: {
                "uid": uidFrom + "," + uidTo
            },
            headers: {
                "Authorization": "Bearer " + context.token
            }
        }).then((res) => {
            setFromName(res.data[uidFrom]);
            setToName(res.data[uidTo]);
            getImages();
        }).catch((err) => {
        })
    }

    const getImages = () => {
        axios.get("http://localhost:8000/api/user/get_Image/", {
            params: {
                "uid": uidFrom + "," + uidTo
            },
            headers: {
                "Authorization": "Bearer " + context.token
            }
        }).then((res) => {
            setFromProfilePic('http://localhost:8000' + res.data[uidFrom])
            setToProfilePic('http://localhost:8000' + res.data[uidTo])
        }).catch((err) => {
        })
    }

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

    useEffect(() => getNames());

    return (
        <div className='main-container'>
            <div className='side-container'>
                <div className='profile-container'>
                    <img src={fromProfilePic} style={{width: '75px', height: '75px', borderRadius: '50%', border: '2px solid black'}} />
                </div>
                <div style={{height: '50%', width: '100%'}} />
            </div>
            <div className='middle-container'>
                <div className='rr_name-container'>
                    <h1 style={{fontSize: '13pt'}}>{fromName} recognized {toName}</h1>
                </div>
                <div className='comment-container'>
                    <p style={{textAlign: 'left', fontSize: '12pt'}}>{comments}</p>
                </div>
                <div className='buttons-container'>
                    <button onClick={onIgnore}>Ignore</button>
                    <button onClick={onDelete}>Delete</button>
                </div>
            </div>
            <div className='side-container'>
                <div className='profile-container'>
                    <img src={toProfilePic} style={{width: '75px', height: '75px', borderRadius: '50%', border: '2px solid black'}} />
                </div>
                <div style={{height: '50%', width: '100%'}} />
            </div>
        </div>
    );
}

export default ReportedRecog;