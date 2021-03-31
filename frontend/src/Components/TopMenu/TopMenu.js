import React from 'react';
import { Link } from 'react-router-dom';

function TopMenu({isOpen, setIsOpen}) {
    return (
        <div className='topmenu'>
            <Link className='top-link' to='/home'>home</Link>
            <Link className='top-link' to='/me'>self</Link>
            <Link className='top-link' to='/login'>logout</Link>
        </div>
    );
}

export default TopMenu;