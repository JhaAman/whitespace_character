import axios from 'axios';
import React, { useState, useContext, useEffect} from 'react';
import { AuthenticationContext } from './../../AuthContext.js';
import ProfilePicture from '../../pics/arnold.jpg'
import './FeedRecognition.css'

function FeedRecognition({uidFrom, uidTo, comment}) {
    const context = useContext(AuthenticationContext)
    const [ fromName, setFromName ] = useState("");
    const [ toName, setToName ] = useState("");
    const [ profilePicture, setProfilePicture ] = useState("")

    const getNames = () => {
        axios.get("http://127.0.0.1:8000/api/user/get_name/", {
            params: {
                "uid": uidFrom + "," + uidTo
            },
            headers: {
                "Authorization": "Bearer " + context.token
            }
        }).then((res) => {
            console.log(res);
            setFromName(res.data[uidFrom]);
            setToName(res.data[uidTo]);
            getImages();
        }).catch((err) => {
            console.log(err);
        })
    }

    const getImages = () => {
        axios.get("http://localhost:8000/api/user/get_Image/", {
            params: {
                "uid": uidFrom
            },
            headers: {
                "Authorization": "Bearer " + context.token
            }
        }).then((res) => {
            console.log(res);
            setProfilePicture('http://localhost:8000' + res.data[uidFrom])
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => getNames(), []);

    return (
        <div className='main-container'>
            <div className='left-container'>
                <div className='profile-container'>
                    <img src={(profilePicture === "Nothing" || profilePicture === "") ? ProfilePicture : profilePicture} style={{width: '125px', height: '125px', borderRadius: '50%', border: '2px solid black'}} />
                </div>
                <div style={{height: '50%', width: '100%'}} />
            </div>
            <div className='right-container'>
                <div className='name-container'>
                    <h1 style={{fontSize: '20pt'}}>{fromName} recognized {toName}</h1>
                </div>
                <div className='comment-container'>
                    <p style={{textAlign: 'left'}}>{comment}</p>
                </div>
            </div>
        </div>
    )
}

export default FeedRecognition;