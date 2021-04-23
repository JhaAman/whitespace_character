
import React from 'react';
import { Link } from 'react-router-dom';
import ProfilePicture from './../../pics/arnold.jpg'

function Rockstar({value, uid, name, profilePicture}) {


    return (
        <div style={{height: '150px', width: '90%', border: '2px solid black', marginBottom: '5px', backgroundColor: 'grey'}}>
            <div style={{width: '100%', height: '20%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', borderBottom: '2px solid black'}}>
                <h1 style={{fontSize: '12pt', fontWeight: 'bold', margin: 0}}>ROCKSTAR OF THE MONTH: {value}</h1>
            </div>
            <div style={{width: '100%', height: '80%', display: 'flex', flexDirection: 'row'}}>
                <div style={{width: '50%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <img src={(profilePicture === "Nothing" || profilePicture === "") ? ProfilePicture : profilePicture} style={{width: '100px', height: '100px', borderRadius: '50%', border: '2px solid black'}} alt=""/>
                </div>
                <div style={{width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly'}}>
                    <Link to={'/u/' + uid}><h2 style={{fontSize: '15pt', margin: 0}}>{name}</h2></Link>
                </div>
            </div>
        </div>
    )
}

export default Rockstar;