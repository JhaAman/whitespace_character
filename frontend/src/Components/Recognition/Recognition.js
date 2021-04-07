import React from 'react';
import Arnold from '../../pics/arnold.jpg'
import './Recognition.css'

function Recognition({recognizer, recognizee, comment, profilePic}) {
    return (
        <div className='main-container'>
            <div className='left-container'>
                <div className='profile-container'>
                    <img src={Arnold} style={{width: '125px', height: '125px', borderRadius: '50%', border: '2px solid black'}} />
                </div>
                <div style={{height: '50%', width: '100%'}} />
            </div>
            <div className='right-container'>
                <div className='name-container'>
                    <h1 style={{fontSize: '20pt'}}>{recognizer ? recognizer.firstName : ''} {recognizer ? recognizer.lastName: ''} recognized {recognizee ? recognizee.firstName: ''} {recognizee ? recognizee.lastName: ''}</h1>
                </div>
                <div className='comment-container'>
                    <p style={{textAlign: 'left'}}>{comment}</p>
                </div>
            </div>
        </div>
    )
}

export default Recognition;