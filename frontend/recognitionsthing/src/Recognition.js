import React from 'react';
import "./App.css";

function Recog(props) {
    return(
        <div className = "recog">
            <h3>{props.name}</h3>
            <h4></h4>
            <p>{props.message}</p>
        </div>
        
    );
}

export default Recog;