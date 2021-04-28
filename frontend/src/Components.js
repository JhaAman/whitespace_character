import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import { AuthContext } from './AuthContext.js';
import Popup from 'reactjs-popup';

import ProfilePicture from './pics/arnold.jpg'
import axios from 'axios';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//import Container from 'react-bootstrap/Container';
//import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import DropdownItem from 'react-bootstrap/DropdownItem';
//import Dropdown from 'react-bootstrap/Dropdown';
//import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import {faBell} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import images from './Images.js';
import { useParams } from 'react-router-dom';
import './Components.css'

let profileAPI = "http://localhost:8000/api/get_profile/"

/* Now storing objects here, so they have access to all the right directories and CSS and suchlike. If this upset anyone, let me know. ~ Christopher */
/* To add an object here, though, one must add the line “// eslint-disable-next-line” to escape the wrath of the garbage fairy. */

/* Because there must be a default return, I have included this “Pass” function, akin to Python’s pass keyword.
   Let me (Christopher) know, of course, be this a problem.
   For the common good, though, the Pass function will get a little queasy if you forget your curly brackets! */
function Pass() {
    return (
        <div style={{ fontSize: 40, font: 'AlegreyaSans', fontWeight: 'bold', color: 'red', backgroundColor: 'white' }}>
            🤮 Alack : thou hast forgotten thy <em>curlye brackets</em>, O knave, in thine import statement(s) from Components.js !
        </div>);
}

// eslint-disable-next-line
function Recognition(props){
  const [people, setPeople] = useState();
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const value = useContext(AuthContext);
  //const [pictures,setPictures] = useState([]);
  const [oldpass,setOldPass] = useState("");
  const [newpass,setNewPass] = useState("");
  const [newpassagain,setNewPassAgain] = useState("");
  const [uploadexists,setUploadExists] = useState(false);
  const [ufile,setUFile] = useState("");
  const [profilepic1,setProfilePic1] = useState(ProfilePicture);
  const [profilepic2,setProfilePic2] = useState(ProfilePicture);
  const upload = React.useRef(null);
  let getData = (setProfilePic, userid) => {
    axios.get(profileAPI, {
      params: {
        uid: userid
      },
      headers:{
        Authorization:"Bearer "+value.token
      },
    })
      .then(function (res) {
        setProfilePic(res.data.profile_picture);
      })
      .catch(error => {
        console.error(error);
      });
  }
  getData(setProfilePic1, props.recognizer)
  getData(setProfilePic2, props.recipient)
  return(
      <div className="recognition rounded">
          <div className="topline">
              <i><b> <img src={"http://localhost:8000"+profilepic1} className="rounded-circle" width="50px" height="50px" alt=""></img>
              {props.recognizer}</b> cherishes <b>{props.recipient}
              <img src={"http://localhost:8000"+profilepic2} className="rounded-circle" width="50px" height="50px" alt=""></img></b></i>
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
function Header({ isOpen, setIsOpen }) {
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
                    <Link className='top-link' to={'/u/'+context.uid}>self</Link>
                    <Link onClick={() => context.logout()}className='top-link' to='/login'>logout</Link>
                </div>
                <div className='menu-right'>
                    <Notification/>
                </div>
            </div>
        </div>
    );
}


export { TopMenu }

// eslint-disable-next-line
function Rockstar2({buzz, firstName, lastName}) {
  const [people, setPeople] = useState();
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const value = useContext(AuthContext);
  //const [pictures,setPictures] = useState([]);
  const [oldpass,setOldPass] = useState("");
  const [newpass,setNewPass] = useState("");
  const [newpassagain,setNewPassAgain] = useState("");
  const [uploadexists,setUploadExists] = useState(false);
  const [ufile,setUFile] = useState("");
  const [profilepic,setProfilePic] = useState(ProfilePicture);
  const upload = React.useRef(null);
  let getData = (setProfilePic, userid) => {
    axios.get(profileAPI, {
      params: {
        uid: userid
      },
      headers:{
        Authorization:"Bearer "+value.token
      },
    })
      .then(function (res) {
        setProfilePic(res.data.profile_picture);
      })
      .catch(error => {
        console.error(error);
      });
  }
  getData()
  return (
      <div class="rockstar rounded">
          <div style={{width: '100%', height: '80%', display: 'flex', flexDirection: 'row'}}>
              <div style={{width: '38%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  <img src={ProfilePicture} style={{width: '100px', height: '100px', border: '5px solid #58453B'}} className="rounded-circle"/>
              </div>
              <div style={{width: '62%', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly'}}>
                  <i>Rockstar of {buzz} : </i>
                  <b>{firstName} {lastName}</b>
              </div>
          </div>
      </div>
  )
}

function Rockstar({value, uid, name, profilePicture}) {
  const context = useContext(AuthContext);

  return (
      <div class="rockstar rounded">
          <div style={{width: '100%', height: '80%', display: 'flex', flexDirection: 'row'}}>
              <div style={{width: '38%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  <img src={(profilePicture === "Nothing" || profilePicture === "") ? ProfilePicture : profilePicture} style={{width: '100px', height: '100px', borderRadius: '50%', border: '2px solid black'}}/>
              </div>
              <div style={{width: '62%', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly'}}>
                  <i>Rockstar of {value} : </i>
                  <Link to={'/u/' + uid}><h2 style={{fontSize: '15pt', margin: 0}}>{name}</h2></Link>
              </div>
          </div>
      </div>
  )
}

export { Rockstar };


function Notification() {
  function BuildNotification(props){
    return(
      <DropdownItem onClick={() => markSeen(props.nid)}>
      <div className={props.seen+"-notification"}>
          <Row>
            <Col>{
            props.type==="recognition_notif"
            ?
            "Recognition"
            :
            props.type==="recognition_badge"
            ?
            "Badge"
            :
            "unknown"
            }</Col>
            <Col xs={4}>{props.time}</Col>
          </Row>
          <br/>
          <Row>
            <Col>
              <div className="Notification-Message">{props.message}</div>
            </Col>
  
          </Row>
      </div>
      </DropdownItem>
    );
  }
  //let notifications = [];
  const [notifs,setNotifs] = useState([]);
  //const [authenticated,setAuthenticated] = useState(false);
  const [auth,setAuth] = useState();
  const [newNotif,setNewNotif] = useState();
  const [loading,setLoading] = useState(true);
  
  function authenticate(){
    axios.post("http://localhost:8000/api/get_token/",{
      "username":"root",
      "password":"pwd"
    })
    .then(function(response){
      setAuth(response.data.access);
      //console.log("success");
      //setAuthenticated(true);
      getNotifications(response.data.access);
    })

  }

  function getNotifications(a){
    axios.get("http://localhost:8000/api/get_notif/",{
      params:{
        uid:"78574359"
      },
      headers:{
        Authorization:"Bearer "+a
      }
    })
    .then(function(response){
      let n = false;
      //console.log(Date.parse(response.data[0].date_created));
      //console.log(timesince(Date.parse(response.data[1].date_created)));
      for(let i=0;i<response.data.length;i++){
        if(!response.data[i].seen)n=true;

        setNotifs(notifs => [...notifs,
        <BuildNotification key={response.data[i].nid}
        message={response.data[i].notif_message}
        type={response.data[i].notif_type}
        time={timesince(Date.parse(response.data[i].date_created))}
        seen={response.data[i].seen}
        nid={response.data[i].nid}/>
        ]);
        //console.log(response.data[i]);
      }
      setNewNotif(n);
    });
  }

  function markSeen(nid){
    //console.log(nid);
    axios.put(
      "http://localhost:8000/api/update_notif/",
      {
        nid:nid,
      },
      {
        headers:{
          Authorization:"Bearer "+auth
        }
      })
    .then(function(response){
      
      console.log(response);
    });
  }

  function timesince(m){
    let a = new Date().getTime()-m;//difference in millis
    if(a<60000){//less than one minute
      //return Math.floor(a/1000)+" seconds ago";
      return "<1 minute ago";
    }
    else if(a<3600000){//less than one hour
      return Math.floor((a/1000)/60)+" minutes ago";
    }
    else if(a<86400000){//less than one day
      return Math.floor(((a/1000)/60)/60)+" hours ago";
    }
    else if(a<604800000){//less than one week
      return Math.floor((((a/1000)/60)/60)/24)+" days ago";
    }
    else{
      return "More than 1 week ago"
    }
  }
  useEffect(()=>{
    authenticate();
    //while(!authenticated);
    //getNotifications();
    setLoading(false);
  },[]);//eslint-disable-line react-hooks/exhaustive-deps
  if(loading){
      return(
          <div>
              ...
          </div>
      )
  }
  return (   
    <div className="dropdown">
      <DropdownButton style={{padding: "10px"}} variant="notif" title={<FontAwesomeIcon icon={faBell} color={newNotif?"#fff1e5":"#d8b597"}/>}>
        {notifs}
      </DropdownButton>
</div>
  );
}

export { Notification };


export default Pass;