import React from 'react';
import Banner from 'react-js-banner';
import GaugeChart from 'react-gauge-chart';
import logo from './logo.jpg';
import SideMenu from './../Components/SideMenu/SideMenu.js';

function Homepage() {
    return (
        <div>
            <div className="App">
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
            <SideMenu />
        </div>
    );
}

export default Homepage;