import './Components.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//import Container from 'react-bootstrap/Container';
//import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
//import DropdownItem from 'react-bootstrap/DropdownItem';
import Dropdown from 'react-bootstrap/Dropdown';
//import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext.js';

function Notification() {
  const context = useContext(AuthContext);

  function BuildNotification(props) {

    

    return (
      <Dropdown.ItemText onClick={
        e=>{
          console.log(s);
        }
      }>
        <div className={props.seen + "-notification"}>
          <Row>
            <Col>{
              props.type === "recognition_notif"
                ?
                "Recognition"
                :
                props.type === "recognition_badge"
                  ?
                  "Badge"
                  :
                  "unknown"
            }</Col>
            <Col xs={4}>{props.time}</Col>
          </Row>
          <br />
          <Row>
            <Col>
              <div className="Notification-Message">{props.message}</div>
            </Col>

          </Row>
        </div>
      </Dropdown.ItemText>
    );
  }
  //let notifications = [];
  const [notifs,setNotifs] = useState([]);
  const [s,setS] = useState([]);
  //const [authenticated,setAuthenticated] = useState(false);
  //const [auth,setAuth] = useState();
  const [newNotif,setNewNotif] = useState();
  const [loading,setLoading] = useState(true);

 

  function getNotifications(a) {
    
    axios.get("http://localhost:8000/api/get_notif/", {
      params: {
        uid: context.uid
      },
      headers: {
        Authorization: "Bearer " + context.token
      }
    })
      .then(function (response) {
        console.log(response);
        let n = false;
        let a = [];
        //console.log(Date.parse(response.data[0].date_created));
        //console.log(timesince(Date.parse(response.data[1].date_created)));
        for (let i = 0; i < response.data.length; i++) {
          if (!response.data[i].seen) n = true;
          a[i]=response.data[i].seen;

        setNotifs(notifs => [...notifs,
        <BuildNotification key={response.data[i].nid}
        message={response.data[i].notif_message}
        type={response.data[i].notif_type}
        time={timesince(Date.parse(response.data[i].date_created))}
        seen={response.data[i].seen}
        nid={response.data[i].nid}
        i={i}/>
        ]);
        markSeen(response.data[i].nid);
        if(i!==response.data.length-1){
          setNotifs(notifs=>[...notifs,
          <Dropdown.Divider key={i+'notifdivider'}/>]);
        }
        //console.log(response.data[i]);
      }
      console.log(a);
      setS(a);
      
      console.log(s);
      setNewNotif(n);
    });
  }

  function markSeen(nid) {

    //console.log(nid);
    axios.put(
      "http://localhost:8000/api/update_notif/",
      {
        nid: nid,
      },
      {
        headers: {
          Authorization: "Bearer " + context.token
        }
      })
      .then(function (response) {

        //console.log(response);
      });
  }

  function timesince(m) {
    let a = new Date().getTime() - m;//difference in millis
    if (a < 60000) {//less than one minute
      //return Math.floor(a/1000)+" seconds ago";
      return "<1 minute ago";
    }
    else if (a < 3600000) {//less than one hour
      return Math.floor((a / 1000) / 60) + " minutes ago";
    }
    else if (a < 86400000) {//less than one day
      return Math.floor(((a / 1000) / 60) / 60) + " hours ago";
    }
    else if (a < 604800000) {//less than one week
      return Math.floor((((a / 1000) / 60) / 60) / 24) + " days ago";
    }
    else {
      return "More than 1 week ago"
    }
  }
  useEffect(() => {
    console.log("gettingnotif");
    getNotifications();
    setLoading(false);
  }, []);
  if (loading) {
    return (
      <div>
        ...
      </div>
    )
  }
  return (
    <DropdownButton variant="light" title={<FontAwesomeIcon icon={faBell} color={newNotif ? "blue" : "black"} />} >
      {notifs}
    </DropdownButton>
  );
}

export default Notification
