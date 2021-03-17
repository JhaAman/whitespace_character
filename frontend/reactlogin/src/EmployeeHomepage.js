import React, { useState } from 'react';
import SideMenu from './SideMenu.js';
import Toolbar from './Toolbar.js';
import './EmployeeHomepage.css';

function EmployeeHomepage() {

    const [ isSideMenuOpen, setIsSideMenuOpen ] = useState(false);

    return (
        <div>
            <Toolbar isOpen={isSideMenuOpen} setIsOpen={setIsSideMenuOpen} />
            {
                isSideMenuOpen ? <SideMenu isOpen={isSideMenuOpen} setIsOpen={setIsSideMenuOpen} /> : undefined
            }
            <div className='main-content-box'>
                <div style={{width: '30%', height: '100%', border: '1px solid yellow'}}>
                </div>
                <div style={{width: '30%', height: '100%', border: '1px solid yellow'}}>
                </div>
            </div>
        </div>
    );
}

export default EmployeeHomepage;