import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthenticationContext } from './../../AuthContext.js';
import './SideMenu.css'

function SideMenu({isOpen, setIsOpen}) {
    const value = useContext(AuthenticationContext);

    return (
        <div className='menu-box'>
            <div className='team-logo-box'>
                <button onClick={() => setIsOpen(!isOpen)}>X</button>
                <h1 className='team-logo'>Team </h1>
            </div>
            <div className='menu-links-box'>
                <Link className='menu-link' to='/homepage'>Homepage</Link>
                <Link className='menu-link' to='/profile'>Profile</Link>
                <Link className='menu-link' to=''>My Recognitions</Link>
                <Link className='menu-link' to=''>Sent Recognitions</Link>
                <Link className='menu-link' to=''>Send Message</Link>
                <Link className='menu-link' to=''>Send Recognition</Link>
            </div>
            <div className='bottom-menu-box'>
                <div className='bottom-menu-button'>
                    Settings
                </div>
                <Link to='/login'>
                    <button onClick={() => value.logout()} className='bottom-menu-button' style={{color: 'red'}}>
                        Logout
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default SideMenu;