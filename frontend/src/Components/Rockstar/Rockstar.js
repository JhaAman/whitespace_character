import React from 'react';
import ProfilePicture from './../../Pages/Profile/arnold.jpg'

function Rockstar() {
    return (
        <div style={{height: '80%', width: '90%', border: '2px solid black'}}>
            <div style={{width: '100%', height: '15%', textAlign: 'center', fontWeight: 'bold', borderBottom: '2px solid black'}}>
                <h1 style={{fontSize: '15pt', fontWeight: 'bold'}}>ROCKSTAR OF THE MONTH</h1>
            </div>
            <div style={{width: '100%', height: '85%', display: 'flex', flexDirection: 'row'}}>
                <div style={{width: '40%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <img src={ProfilePicture} style={{width: '100px', height: '100px', borderRadius: '50%', border: '2px solid black'}}/>
                </div>
                <div style={{width: '60%', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly'}}>
                    <h2 style={{fontSize: '15pt', margin: 0}}>FirstName LastName</h2>
                    <p style={{fontSize: '10pt', margin: 0}}>
                        FirstName shows great promise and always gets their work done on time. Be like FirstName.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Rockstar;