import React from 'react';
import './Toolbar.css';

function Toolbar({isOpen, setIsOpen}) {
    return (
        <div className='toolbar-box'>
            <h1 style={{color: 'white', position: 'fixed', left: '20px', margin: '0'}}>Peer Recognition Interface</h1>
            <button onClick={() => setIsOpen(!isOpen)} style={{position: 'fixed', right: '20px'}}>Open</button>
        </div>
    );
}

export default Toolbar;