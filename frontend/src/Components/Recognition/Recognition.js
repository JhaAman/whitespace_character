import React from 'react';
import './Recognition.css';

function Recognition(props){
    return(
        <div className="recognition rounded">
            <div className="topline">
                {props.recipient} got a recognition from {props.recognizer}
            </div>
            <div>
                {props.message}
            </div>

        </div>
    )
}
export default Recognition;