import './Components.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//import Container from 'react-bootstrap/Container';
//import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import DropdownItem from 'react-bootstrap/DropdownItem';
//import Dropdown from 'react-bootstrap/Dropdown';
//import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import axios from 'axios';





function Notification() {
  function BuildNotification(props) {
    return (
      <DropdownItem onClick={() => markSeen(props.nid)}>
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
      .then(function (response) {
        setAuth(response.data.access);
        console.log("success");
        setAuthenticated(true);
        getNotifications(response.data.access);
      })

  }

  function getNotifications(a) {
    axios.get("http://localhost:8000/api/get_notif/", {
      params: {
        uid: "78574359"
      },
      headers: {
        Authorization: "Bearer " + a
      }
    })
      .then(function (response) {
        let n = false;
        //console.log(Date.parse(response.data[0].date_created));
        //console.log(timesince(Date.parse(response.data[1].date_created)));
        for (let i = 0; i < response.data.length; i++) {
          if (!response.data[i].seen) n = true;

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

  function markSeen(nid) {
    //console.log(nid);
    axios.put(
      "http://localhost:8000/api/update_notif/",
      {
        nid: nid,
      },
      {
        headers: {
          Authorization: "Bearer " + auth
        }
      })
      .then(function (response) {

        console.log(response);
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
    authenticate();
    //while(!authenticated);
    //getNotifications();
    setLoading(false);
  }, []);//eslint-disable-line react-hooks/exhaustive-deps
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
