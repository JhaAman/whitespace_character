import React, {useState} from 'react';
import axios from 'axios';

function App() {
  const [facts,setFact] = useState(null);
  const apiURL = "https://api.chucknorris.io/jokes/random";
  const fetchFact = async () => {
    const response = await axios.get(apiURL);
    setFact(response.data);
    console.log(facts);
  }

  return (
    <div className="App">
      <h1>CHUCK NORRIS FACTS</h1>
      <h1>Hello</h1>
      <div className="facts">
        {facts.value}
      </div>
      <div>
        <button className="apifetchbutton" onClick={fetchFact}>Get New Fact</button>
      </div>
    </div>
  );
}

export default App;
