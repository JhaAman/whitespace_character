import React, { useState } from 'react';
import Banner from 'react-js-banner';
import GaugeChart from 'react-gauge-chart';
import logo from './logo.jpg';
import SideMenu from '../Components/SideMenu/SideMenu.js';
import Employee_Toolbar from '../Components/Toolbars/Employee_Toolbar.js';
import './Homepage.css';
import axios from 'axios';

function Homepage() {

    const [ isSideMenuOpen, setIsSideMenuOpen ] = useState(false);

    return (
        <div>
            <Employee_Toolbar isOpen={isSideMenuOpen} setIsOpen={setIsSideMenuOpen} />
            {
                isSideMenuOpen ? <SideMenu isOpen={isSideMenuOpen} setIsOpen={setIsSideMenuOpen} /> : undefined
            }
            <div className='main-content-box'>
                <div style={{width: '30%', height: '100%', border: '1px solid yellow'}}>
                </div>
                <div style={{width: '40%', height: '100%', border: '1px solid green'}}>
                    <header className="App-header">
                        <h1 className="App-title">Group Goal Meter</h1>
                        <GaugeChart id="gauge-chart" 
                            nrOfLevels={100} 
                            color={["#EE3426"]} 
                            arcWidth={0.3} 
                            percent={0.37} 
                        />
                        <h3 className="App-title">Who's the Rockstar Employee of the Week? Scroll down below!</h3>
                    </header>
                    <Banner title="John Doe" image={logo} imageClass="App-logo" css={{ color: "#FFF", backgroundColor: "orange", fontSize: 40 }} />
                    <Banner showBanner={true} />
                </div>
                <div style={{width: '30%', height: '100%', border: '1px solid yellow'}}>
                </div>
            </div>
        </div>
    );
}

export default Homepage;