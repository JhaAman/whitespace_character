import React from 'react';
import './SubmitRecog.css'

function submitRecog() {
    return (
        <div className='submit-main-container'>
            <div style={{display: 'flex', flexDirection: 'row', width: '90%', justifyContent: 'space-evenly'}}>
                <h1 style={{fontSize: '12pt', margin: 0}}>Recognizee's Name:</h1>
                <span contentEditable={true} style={{width: '75%', textAlign: 'left', backgroundColor: 'white', border: '1px solid black'}}></span>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', width: '90%', justifyContent: 'space-evenly'}}>
                <h1 style={{fontSize: '12pt', margin: 0}}>Recognition:</h1>
                <span contentEditable={true} style={{width: '75%', textAlign: 'left', backgroundColor: 'white', border: '1px solid black'}}></span>
            </div>
            <button style={{width: '25%'}}>Submit Recognition</button>
        </div>
    );
}

export default submitRecog;