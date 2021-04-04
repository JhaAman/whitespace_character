import './App.css';
import React from 'react';
import Recog from './Recognition';
import Textbox from './textbox';


function App() {
  return (
    <div className = 'App'>
      <h1>Recognitions and Such</h1>
      <Recog name = "Kenny S" message = "Keeping it seaxy."/>
      <Recog name = "Black Betty" message = "please please please"/>
      <Recog name = "Robot Rock" message = "i like to eat meat"/>

      <Recog name = "Mississippi Squire" message = "If you know what I mean."/>

      <Textbox></Textbox>

    </div>


  );
}

export default App;