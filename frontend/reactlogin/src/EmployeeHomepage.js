import React, { useState } from 'react';
import SideMenu from './SideMenu.js';
import Toolbar from './Toolbar.js';
import Recognition from './Recognition.js';
import './EmployeeHomepage.css';
//import Col from 'react-bootstrap/Col';
//import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';
function EmployeeHomepage() {

    const [ isSideMenuOpen, setIsSideMenuOpen ] = useState(false);

    return (
       
        <div className="app">
            <div className="header"><Toolbar isOpen={isSideMenuOpen} setIsOpen={setIsSideMenuOpen} />
            {
                isSideMenuOpen ? <SideMenu isOpen={isSideMenuOpen} setIsOpen={setIsSideMenuOpen} /> : undefined
            }</div>
            
            <div className='main-content-box'>
                <Recognition recipient="Dave" recognizer="Jerry" message="Nice work man"/>
                <Recognition recipient="Bill" recognizer="Janet" message="Noice"/>
                <Recognition recipient="Terry" recognizer="Steve" message="10/10"/>
            </div>
        </div>
        
     
    );
}

export default EmployeeHomepage;