// add this to App.css file to get the rows and columns working
// .row {
//   display: flex;
//   flex-direction: row;
//   flex-wrap: wrap;
//   width: 50%;
// }

// .column {
//   display: flex;
//   flex-direction: column;
//   flex-basis: 100%;
//   flex: 1;
// }

import React, { Component } from 'react';
import Banner from 'react-js-banner';
import './App.css';
import logo from './logo.jpg';
import GaugeChart from 'react-gauge-chart'
import Box from '@material-ui/core/Box';
import {Button} from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      bannerCss: { color: "#FFF", backgroundColor: "#D3C4B7", fontSize: 40 }
    };
  }
  
  render() {
    return (
      <div>
             <div class='some-page-wrapper'>
  <div class='row'>
    <div class='column'>
      <div class='blue-column'>
      <div className="App">
        <header className="App-header">
          <h3 className="App-title">Who's the Rockstar Employee of the Month? See below!</h3>
        </header>
        <Banner title="John Doe" image={logo} imageClass="App-logo" css={this.state.bannerCss}/>
        <Banner showBanner={true}>
        </Banner>
      </div>
    </div>
    <div class='column'>
      <div class='green-column'>
      <Box color="green">
          <h1 className="App-title">Recognitions</h1>
          <Popup trigger={<button>Report a Recognition</button>} position="right center">
          <div>Report a Recognition Below</div>
          <form>
          <label>
          Recognition Number:
          <input type="text" name="name" />
          </label>
          <label>
          Reason for Reporting:
          <input type="text" name="name" />
          </label>
          <input type="submit" value="Submit Your Report" />
          </form>
          </Popup>
          <h3 className="App-title">Recognition 1: John Doe became recognized for exceptional achievement!</h3>
          <h3 className="App-title">Recognition 2: Jane Doe became recognized for exceptional achievement!</h3>
          <h3 className="App-title">Recognition 3: John Doe became recognized for exceptional achievement!</h3>
          <h3 className="App-title">Recognition 4: Jane Doe became recognized for exceptional achievement!</h3>
          <h3 className="App-title">Recognition 5: John Doe became recognized for exceptional achievement!</h3>
          <h3 className="App-title">Recognition 6: Jane Doe became recognized for exceptional achievement!</h3>
          <h3 className="App-title">Recognition 7: John Doe became recognized for exceptional achievement!</h3>
          <h3 className="App-title">Recognition 8: Jane Doe became recognized for exceptional achievement!</h3>
          <h3 className="App-title">Recognition 9: John Doe became recognized for exceptional achievement!</h3>
          <h3 className="App-title">Recognition 10: Jane Doe became recognized for exceptional achievement!</h3>
          <h3 className="App-title">Recognition 11: John Doe became recognized for exceptional achievement!</h3>
          <h3 className="App-title">Recognition 12: Jane Doe became recognized for exceptional achievement!</h3>
          <h3 className="App-title">Recognition 13: John Doe became recognized for exceptional achievement!</h3>
          <h3 className="App-title">Recognition 14: Jane Doe became recognized for exceptional achievement!</h3>
          <h3 className="App-title">Recognition 15: John Doe became recognized for exceptional achievement!</h3>
          <h3 className="App-title">Recognition 16: Jane Doe became recognized for exceptional achievement!</h3>
          <h3 className="App-title">Recognition 17: John Doe became recognized for exceptional achievement!</h3>
          <h3 className="App-title">Recognition 18: Jane Doe became recognized for exceptional achievement!</h3>
          <h3 className="App-title">Recognition 19: John Doe became recognized for exceptional achievement!</h3>
          <h3 className="App-title">Recognition 20: Jane Doe became recognized for exceptional achievement!</h3>
        </Box>
      </div>
      </div>
    </div>
  </div>
</div>
        <div className='menu-box'>
            <div className='team-logo-box'>
                <h1 className='team-logo'>Team </h1>
            </div>
            <h1 className="App-title">Group Goal Meter</h1>
            <GaugeChart id="gauge-chart" 
              nrOfLevels={10} 
              color={["#fde9e7"]} 
              arcWidth={0.45} 
              percent={1} 
            />
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
