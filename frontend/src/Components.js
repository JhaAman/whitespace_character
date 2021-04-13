import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import Popup from 'reactjs-popup';
import Image from 'react-bootstrap/Image';

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
  return (
      <div className="recognition rounded">
          <div className="topline">
          <Image src={props.recognizerpicture} className="rounded-circle" width="30px" height="auto"></Image>
              <i><b>{props.recognizer}</b> cherishes <b>{props.recipient}</b></i>
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

export default Pass;