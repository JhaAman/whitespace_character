import React from 'react';
import './SideMenu.css'

function SideMenu() {
    return (
        <div className='menu-box'>
            <div className='team-logo-box'>
                <h1 className='team-logo'>Team </h1>
            </div>
            <div className='menu-links-box'>
                <h1 className='menu-link'>Homepage</h1>
                <h1 className='menu-link'>My Recognitions</h1>
                <h1 className='menu-link'>Sent Recognitions</h1>
                <h1 className='menu-link'>Send Message</h1>
                <h1 className='menu-link'>Send Recognition</h1>
            </div>
            <div className='bottom-menu-box'>
                <div className='bottom-menu-button'>
                    Settings
                </div>
                <div className='bottom-menu-button' style={{color: 'red'}}>
                    Logout
                </div>
            </div>
        </div>
    );
}

export default SideMenu;