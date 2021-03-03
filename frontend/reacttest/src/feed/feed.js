import React, { Component } from 'react';

import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Feed />
      </div>
    );
  }
}
export default App;

class Feed extends Component {
  render() {
    return (
      <div className="feed">
        <div className="post">
          
          <h1>Post Feed</h1>
          <h2>this is my first post!</h2>
          <h2>this is my second post!</h2>
          <h2>this is my third post!</h2>
          <h2>this is my fourth post!</h2>
          <h2>this is my fifth post!</h2>
          <h2>this is my sixth post!</h2>
          <h2>this is my seventh post!</h2>
          <h2>this is my eighth post!</h2>
          <h2>this is my ninth post!</h2>
          <h2>this is my tenth post!</h2>
          
        </div>
      </div>
    )
  }
}
