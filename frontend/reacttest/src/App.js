import React, { Component } from 'react';
import './App.css';
import GaugeChart from 'react-gauge-chart'
import {Button} from 'react';

class UpgradedButton extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      buttonText: "Upload JSON Data",
      buttonCss: { color: "#FFF", backgroundColor: "#D3C4B7" }
    };
  }

  handleClick = () => {
    console.log("Button clicked")
    let buttonText = this.state.buttonText === "Upload" ? "Uploading" : "Upload"
    this.setState({buttonText: buttonText})
  }
}

class App extends Component {

  render() {
    return (
      <div>
      <div className="App">
        <header className="App-header">
          <h3 className="App-title">Administrator Upload Page</h3>
        </header>
        <Button
        title="Upload JSON Data"
        background-color="#D3C4B7"
        color= "#FFF"
        css={this.state.buttonCss}
        onClick={this.handleClick}>{this.state.buttonText}
        </Button>
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
export {UpgradedButton};

