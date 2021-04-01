import React from 'react';
import { Link } from 'react-router-dom';

function TopMenu({isOpen, setIsOpen}) {
    return (
        <div className='topmenu'>
            <div className="row">
                <div className='menu-left'>
                    ws
                </div>
                <div className='menu-center'>
                    <Link className='top-link' to='/home'>home</Link>
                    <Link className='top-link' to='/me'>self</Link>
                    <Link className='top-link' to='/login'>logout</Link>
                </div>
            </div>
        </div>
    );
}

export default TopMenu;