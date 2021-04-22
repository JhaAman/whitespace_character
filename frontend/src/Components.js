import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import Popup from 'reactjs-popup';
import Image from 'react-bootstrap/Image';

import NotificationButton from './Notification';

import ProfilePicture from './pics/arnold.jpg'


/* Now storing objects here, so they have access to all the right directories and CSS and suchlike. If this upset anyone, let me know. ~ Christopher */
/* To add an object here, though, one must add the line “// eslint-disable-next-line” to escape the wrath of the garbage fairy. */

/* Because there must be a default return, I have included this “Pass” function, akin to Python’s pass keyword.
   Let me (Christopher) know, of course, be this a problem.
   For the common good, though, the Pass function will get a little queasy if you forget your curly brackets! */
function Pass() {
  return(
    <div style={{fontSize: 40, font: 'AlegreyaSans', fontWeight: 'bold', color: 'red', backgroundColor: 'white'}}>
      🤮 Alack : thou hast forgotten thy <em>curlye brackets</em>, O knave, in thine import statement(s) from Components.js !
    </div>);
}

function Recognition(props){
    return (
        <div className="recognition rounded">
            <div className="topline">
            <Image src={props.recognizerpicture} className="rounded-circle" width="30px" height="auto"></Image>
            <Link className='link' to={props.recognizerlink}><i><b>{props.recognizer}</b></i></Link> cherishes <Link className='link' to={props.recipientlink}><i><b>{props.recipient}</b></i></Link>
            <Image src={props.recipientpicture} className="rounded-circle" width="30px" height="auto"></Image>
          </div>
          <br></br>
          <div>
              {props.message}
          </div>
          <div style={{textAlign: 'right'}}>
            <Popup trigger={<button>report</button>} position="right center">
                <form>
                    <div class="repbox">
                        <label>
                            <textarea rows="3" columns="20" placeholder="your worry" class="rep-input"/>
                        </label>
                        <br/>
                        <input type="submit" value="submit" class="rep-button"/>
                    </div>
                </form>
            </Popup>
        </div>
      </div>
  )
}
export { Recognition }

// eslint-disable-next-line
function Header({isOpen, setIsOpen}) {
  return (
      <div className="header">
          <i>whitespaß</i>
      </div>
  );
}
export { Header }

// eslint-disable-next-line
function TopMenu({isOpen, setIsOpen}) {
    return (
        <div className='topmenu'>
            <div className="row">
                <div className='menu-left'>
                    ws
                </div>
                <div className='menu-center'>
                    <Link className='top-link' to='/home'>home</Link>
                    <Link className='top-link' to='/me'>self</Link>
                    <Link className='top-link' to='/login'>logout</Link>
                </div>
            </div>
        </div>
    );
}
export { TopMenu }

// eslint-disable-next-line
/* This will be part of my April 4 week CSS cleanup ~ Christopher */
function Rockstar({value, firstName, lastName}) {
    return (
        <div style={{height: '150px', width: '90%', border: '2px solid black', marginBottom: '5px'}}>
            <div style={{width: '100%', height: '20%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', borderBottom: '2px solid black'}}>
                <h1 style={{fontSize: '12pt', fontWeight: 'bold', margin: 0}}>ROCKSTAR OF THE MONTH: {value}</h1>
            </div>
            <div style={{width: '100%', height: '80%', display: 'flex', flexDirection: 'row'}}>
                <div style={{width: '50%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <img src={ProfilePicture} style={{width: '100px', height: '100px', borderRadius: '50%', border: '2px solid black'}}/>
                </div>
                <div style={{width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly'}}>
                    <h2 style={{fontSize: '15pt', margin: 0}}>{firstName} {lastName}</h2>
                </div>
            </div>
        </div>
    )
}

export { Rockstar };

export default Pass;