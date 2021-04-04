import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import DropdownItem from 'react-bootstrap/DropdownItem';
//import Dropdown from 'react-bootstrap/Dropdown';
//import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import {faBell} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import axios from 'axios';


function Notification(props){
  return(

    <DropdownItem onClick={() => console.log(props.time)}>
    <div className={props.new+"-notification"}>
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


function App() {
  let notifications = [];

  const [auth,setAuth] = useState();

  function authenticate(){
    axios.post("http://localhost:8000/api/get_token/",{
      "username":"root",
      "password":"pwd"
    })
    .then(function(response){
      setAuth(response.data.access);
      console.log("success");
    });
  }

  function getNotifications(){
    axios.get("http://localhost:8000/api/get_notif/",{
      params:{
        uid:"78574359"
      },
      headers:{
        Authorization:"Bearer "+auth
      }
    })
    .then(function(response){
      //console.log(Date.parse(response.data[0].date_created));
      //console.log(timesince(Date.parse(response.data[1].date_created)));
      for(let i=0;i<response.data.length;i++){
        notifications.push(
        <Notification key={i}
        message={response.data[i].notif_message}
        type={response.data[i].notif_type}
        time={timesince(Date.parse(response.data[i].date_created))}
        new={response.data[i].seen}/>)
        console.log(response.data[i]);
      }
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

  return (
    <div className="App">
      
      <button onClick={getNotifications}>notif</button>
      <button onClick={authenticate}>auth</button>
      
      <DropdownButton variant="light" title={<FontAwesomeIcon icon={faBell}/>} >
        {notifications}
      </DropdownButton>





      {/**<Notification message="You got a new recognition from Gary" type="Recognition" time="5 hours ago" new="yes"/>
          <Dropdown.Divider/>
          <Notification message="You got a new recognition from Sally" type="Recognition" time="8 hours ago" new="yes"/>
          <Dropdown.Divider/>
          <Notification message="You received a new badge" type="Badge" time="12 hours ago" new="no"/>
          <Dropdown.Divider/>
  <Notification message="Steve has been declared the Rockstar of the Month" type="Global" time="Yesterday" new="no"/>**/}



    </div>
    
  );
}

export default App;
