import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import { AuthContext } from './AuthContext.js';
import Popup from 'reactjs-popup';

import NotificationButton from './Notification';

import ProfilePicture from './pics/arnold.jpg'
import axios from 'axios';

import { AuthenticationContext } from './AuthContext.js';

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

// eslint-disable-next-line
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
          <div style={{textAlign: 'right'}}>
            <Popup trigger={<button>report</button>} position="right center">
                <form>
                    <div className="repbox">
                        <label>
                            <textarea rows="3" columns="20" placeholder="your worry" className="rep-input"/>
                        </label>
                        <br/>
                        <input type="submit" value="submit" className="rep-button"/>
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
    const context = useContext(AuthContext);


    return (
        <div className='topmenu'>
            <div className="row">
                <div className='menu-left'>
                    ws
                </div>
                <div className='menu-center'>
                    <Link className='top-link' to='/home'>home</Link>
                    <Link className='top-link' to='/me'>self</Link>
                    <Link onClick={() => context.logout()}className='top-link' to='/login'>logout</Link>
                </div>
                <div className='menu-right'>
                    <NotificationButton/>
                </div>
            </div>
        </div>
    );
}


export { TopMenu }



export default Pass;