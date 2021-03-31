import './App.css';
import React from 'react';
import Recog from './Recognition';
import Textbox from './textbox';

function App() {
  return (
    <div className = 'App'>
      <h1>Recognitions and Such</h1>
      <Recog name = "Kenny G" message = "Keeping it light."/>
      <Recog name = "Black Betty" message = "please"/>
      <Recog name = "Robot Rock" message = "shoot shoot"/>

      <Recog name = "Mississippi Queen" message = "If you know what I mean."/>

    </div>


  );
}

export default App;