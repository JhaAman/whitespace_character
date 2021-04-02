import React, { useState } from 'react';
import SideMenu from './Components/SideMenu/SideMenu.js';
import Toolbar from './Components/Toolbar/Toolbar.js';
import Recognition from './Components/Recognition/Recognition.js';
/*import './EmployeeHomepage.css';*/
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Header from './Components/Header/Header.js'
import TopMenu from './Components/TopMenu/TopMenu.js'
import 'bootstrap/dist/css/bootstrap.min.css';
function EmployeeHomepage() {

    /*const [ isSideMenuOpen, setIsSideMenuOpen ] = useState(false);*/

    return (
       
        <div className="app">
            <TopMenu></TopMenu>
            <div class='row'>
                <div className='left-column'>
                    <Recognition recipient="Reginald" recognizer="Gwen" message="Everyone is raving about your work on pantelic aristism."/>
                    <Recognition recipient="Edith" recognizer="Lancelot" message="I love your ideative reification!"/>
                    <Recognition recipient="Millard" recognizer="Eleanor" message="2τ/10 withstandingship at the weekly witenagemot"/>
                </div>
                <div className='right-column'>
                    <div className='infobox rounded'>
                        <br></br>
                        <b><i><div style={{fontSize:30}}>This month’s hero:</div></i></b>
                        Charles Martel
                        <br></br><br></br>
                        [other statistics can go here]
                        <br></br>
                        <br></br>
                        <br></br>
                    </div>
                </div>
            </div>
        </div>
        
     
    );
}

export default EmployeeHomepage;