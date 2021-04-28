import axios from 'axios';
import React, { useState, useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './../../AuthContext.js';
import ProfilePicture from '../../pics/arnold.jpg'
import './FeedRecognition.css'

function FeedRecognition({rid, uidFrom, uidTo, comment, allFlag}) {
    const context = useContext(AuthContext)
    const [ fromName, setFromName ] = useState("");
    const [ toName, setToName ] = useState("");
    const [ fromProfilePic, setFromProfilePic ] = useState("");
    const [ toProfilePic, setToProfilePic ] = useState("")
    const [ reported, setReported ] = useState(false);

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

    const reportRecog = () => {
        axios.put("http://127.0.0.1:8000/api/recog/put_flag/", {
            "rid": rid
        }, {
            headers: {
                "Authorization": "Bearer " + context.token
            }
        }).then((res) => {
            console.log(res);
            setReported(true);
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => getNames());

    return (
        <div className='main-container'>
            <div className='fr-side-container'>
                <div className='profile-container'>
                    <img src={fromProfilePic} style={{width: '125px', height: '125px', borderRadius: '50%', border: '2px solid black'} } alt="" />
                </div>
                <div style={{height: '50%', width: '100%'}} />
            </div>
            <div className='fr-middle-container'>
                <div className='name-container'>
                    <h1 style={{fontSize: '20pt'}}><Link to={'/u/' + uidFrom}>{fromName}</Link> recognized <Link to={'/u/' + uidTo}>{toName}</Link></h1>
                </div>
                <div className='comment-container'>
                    <p style={{textAlign: 'left'}}>{comment}</p>
                </div>
                <div style={{display: 'flex', justifyContent: 'flex-end', padding: '5px'}}>
                    <button disabled={reported} onClick={reportRecog}>{reported ? "Reported!" : "Report"}</button>
                </div>
            </div>
            {
                allFlag ? 
                <div className='fr-side-container'>
                    <div className='profile-container'>
                        <img src={toProfilePic} style={{width: '125px', height: '125px', borderRadius: '50%', border: '2px solid black'} } alt="" />
                    </div>
                    <div style={{height: '50%', width: '100%'}} />
                </div> :
                undefined
            }
        </div>
    )
}

export default FeedRecognition;