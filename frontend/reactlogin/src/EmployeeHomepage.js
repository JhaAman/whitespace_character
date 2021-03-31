import React, { useState } from 'react';
import SideMenu from './SideMenu.js';
import Toolbar from './Toolbar.js';
import Recognition from './Recognition.js';
import './EmployeeHomepage.css';
// eslint-disable-next-line
import Col from 'react-bootstrap/Col';
// eslint-disable-next-line
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';
function EmployeeHomepage() {

    const [ isSideMenuOpen, setIsSideMenuOpen ] = useState(false);

    return (
       
        <div className="app">
            <div className="header">
                <i>whitespaß</i>
            </div>
            {/* <div className="header"><Toolbar isOpen={isSideMenuOpen} setIsOpen={setIsSideMenuOpen} />
            {
                isSideMenuOpen ? <SideMenu isOpen={isSideMenuOpen} setIsOpen={setIsSideMenuOpen} /> : undefined
            }</div> */}
            
            <div className='body'>
                <Recognition recipient="Albert" recognizer="Gwen" message="Everyone is raving about your pantelic aristism. <3 xx"/>
                <Recognition recipient="Reginald" recognizer="Janet" message="I liked your embellishment of our hyperbolic reificator!!"/>
                <Recognition recipient="Priscilla" recognizer="Steve" message="2τ/10 thereness of mind at the weekly witenagemot"/>
            </div>
        </div>
        
     
    );
}

export default EmployeeHomepage;