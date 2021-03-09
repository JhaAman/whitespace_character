import React from 'react';
import './Employee_Toolbar.css';

function Employee_Toolbar({isOpen, setIsOpen}) {
    return (
        <div className='toolbar-box'>
            <h1 style={{color: 'white', position: 'fixed', left: '20px', margin: '0'}}>Peer Recognition Interface</h1>
            <button onClick={() => setIsOpen(!isOpen)} style={{position: 'fixed', right: '20px'}}>Open</button>
        </div>
    );
}

export default Employee_Toolbar;