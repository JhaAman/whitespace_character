import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';
import ProfilePicture from './../../pics/arnold.jpg'
import { AuthContext } from './../../AuthContext.js';

function Rockstar({value, uid}) {
    const context = useContext(AuthContext);
    const [ name, setName ] = useState("");
    const [profilePic, setProfilePic ] = useState("");

    const getName = () => {
        axios.get("http://127.0.0.1:8000/api/user/get_name/", {
            params: {
                "uid": uid
            },
            headers: {
                "Authorization": "Bearer " + context.token
            }
        }).then((res) => {
            console.log(res);
            setName(res.data[uid]);
            getImage();
        }).catch((err) => {
            console.log(err);
        })
    }

    const getImage = () => {
        axios.get("http://localhost:8000/api/user/get_Image/", {
            params: {
                "uid": uid
            },
            headers: {
                "Authorization": "Bearer " + context.token
            }
        }).then((res) => {
            console.log(res);
            setProfilePic(res.data[uid]);
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        getName()
    }, []);

    return (
        <div style={{height: '150px', width: '90%', border: '2px solid black', marginBottom: '5px', backgroundColor: 'grey'}}>
            <div style={{width: '100%', height: '20%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', borderBottom: '2px solid black'}}>
                <h1 style={{fontSize: '12pt', fontWeight: 'bold', margin: 0}}>ROCKSTAR OF THE MONTH: {value}</h1>
            </div>
            <div style={{width: '100%', height: '80%', display: 'flex', flexDirection: 'row'}}>
                <div style={{width: '50%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <img src={(profilePic === "Nothing" || profilePic === "") ? ProfilePicture : require(profilePic)} style={{width: '100px', height: '100px', borderRadius: '50%', border: '2px solid black'}}/>
                </div>
                <div style={{width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly'}}>
                    <h2 style={{fontSize: '15pt', margin: 0}}>{name}</h2>
                </div>
            </div>
        </div>
    )
}

export default Rockstar;