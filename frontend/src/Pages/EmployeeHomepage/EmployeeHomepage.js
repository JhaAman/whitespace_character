import React, { useState } from 'react';
import SideMenu from './../../Components//SideMenu/SideMenu.js';
import Toolbar from './../../Components/Toolbar/Toolbar.js';
import Recognition from '../../Components/Recognition/Recognition.js';
import Rockstar from '../../Components/Rockstar/Rockstar.js';
import './EmployeeHomepage.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';

function EmployeeHomepage() {

    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
    const rockstarsArray = [{value: 'Communications', firstName: 'Gary', lastName: 'Szekely'}, {value: 'Hard-Working', firstName: 'Reuben', lastName: 'Philip'}, {value: 'Inclusive', firstName: 'Khang', lastName: 'Nguyen'}]

    return (

        <div className="app">
            <div className="header"><Toolbar isOpen={isSideMenuOpen} setIsOpen={setIsSideMenuOpen} />
            {
                isSideMenuOpen ? <SideMenu isOpen={isSideMenuOpen} setIsOpen={setIsSideMenuOpen} /> : undefined
            }
            </div>
            <div className='main-content-box'>
                <div style={{height: '100%', width: '30%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1px solid red'}}>
                    {
                        rockstarsArray.map((e) => {
                            return (<Rockstar value={e.value} firstName={e.firstName} lastName={e.lastName} />);
                        })
                    }
                </div>
                <div style={{width: '60%'}}>
                    <Recognition recipient="Dave" recognizer="Jerry" message="Nice work man"/>
                    <Recognition recipient="Bill" recognizer="Janet" message="Noice"/>
                    <Recognition recipient="Terry" recognizer="Steve" message="10/10"/>
                </div>
            </div>
        </div>
    );
}

export default EmployeeHomepage;