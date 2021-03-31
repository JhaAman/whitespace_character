import React, { Component } from 'react';
import Banner from 'react-js-banner';
import './App.css';
import logo from './logo.jpg';
import GaugeChart from 'react-gauge-chart'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      bannerCss: { color: "#FFF", backgroundColor: "orange", fontSize: 40 }
    };

  }
  
  render() {
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
        <Banner title="John Doe" image={logo} imageClass="App-logo" css={this.state.bannerCss}/>
        <Banner showBanner={true}>
        </Banner>
      </div>
        <div className='menu-box'>
            <div className='team-logo-box'>
                <h1 className='team-logo'>Team </h1>
            </div>
            <div className='menu-links-box'>
                <h1 className='menu-link'>Homepage</h1>
                <h1 className='menu-link'>My Recognitions</h1>
                <h1 className='menu-link'>Sent Recognitions</h1>
                <h1 className='menu-link'>Send Message</h1>
                <h1 className='menu-link'>Send Recognition</h1>
            </div>
            <div className='bottom-menu-box'>
                <div className='bottom-menu-button'>
                    Settings
                </div>
                <div className='bottom-menu-button' style={{color: 'red'}}>
                    Logout
                </div>
            </div>
        </div>
        </div>
    );
  }
}

export default App;

