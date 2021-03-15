import React, {useState} from 'react';
import axios from 'axios';

function App() {
  const apiURL = "http://localhost:8000/api/dummy_api";
  const[first,setFirst] = useState('');
  const[second,setSecond] = useState('');
  const[answer,setAnswer] = useState('');

  const fetchAnswer = async () => {
    const response = await axios({
      method: "get",
      url: apiURL,
      data:{
        n1:first,
        n2:second
      }
    }).then((response)=>{
      console.log(response);
      setAnswer(response.data)
    }, (error) =>{
      //console.log(error);
    });

    //setAnswer(response.data);
    //console.log(answer);
  }
  return (
    <div className="App">
      <h1>Add two numbers together</h1>
      <form>
        <input type="text" onChange={event => setFirst(event.target.value)}></input>
        <input type="text" onChange={event => setSecond(event.target.value)}></input>
      </form>
      <button onClick={fetchAnswer}>Submit</button>
      <div>
        {answer.sum}
      </div>
      
    </div>
  );
}

export default App;
