import React, { Component } from 'react';
import Banner from 'react-js-banner';
import './App.css';
import logo from './logo.jpg';
import GaugeChart from 'react-gauge-chart'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      bannerCss: { color: "#FFF", backgroundColor: "red", fontSize: 40 }
    };

  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <h1 className="App-title">Group Goal Meter</h1>
        <GaugeChart id="gauge-chart" 
          nrOfLevels={100} 
          color={["#EE3426"]} 
          arcWidth={0.3} 
          percent={0.37} 
        />
          <h3 className="App-title">Who's the Rockstar Employee of the Week? Scroll down below to find out!</h3>
        </header>
        <Banner title="John Doe" image={logo} imageClass="App-logo" css={this.state.banner2Css}/>
        <Banner showBanner={true}>
        </Banner>
      </div>
    );
  }
}

export default App;

