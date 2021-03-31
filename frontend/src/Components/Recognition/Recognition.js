import React from 'react';
import './Recognition.css';

function Recognition(props){
    return(
        <div className="recognition rounded">
            <div className="topline">
                <i><b>{props.recognizer}</b> cherishes <b>{props.recipient}</b></i>
            </div>
            <br></br>
            <div>
                {props.message}
            </div>

        </div>
    )
}
export default Recognition;