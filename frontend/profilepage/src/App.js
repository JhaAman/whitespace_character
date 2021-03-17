import profilepic from './arnold.jpg';
import './App.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';

function Networkprofile(props){
  return(
          <Row className="profile">
            <Col xs={5}><Image src={props.picture} className="profilepic rounded-circle img-fluid"/></Col>
            <Col xs={7}>{props.name}</Col>
          </Row>    
  )
}
function Award(props){
  return(
    <Col className="award">
      <h2>🏆</h2>
      {props.award}
    </Col>
  )
}
function DevColors(){
  return(
<div>
        <div style={{backgroundColor:"#fef2e6"}}>fef2e6</div>
        <div style={{backgroundColor:"#68321a"}}>68321a</div>
        <div style={{backgroundColor:"#fff1e5"}}>fff1e5</div>
        <div style={{backgroundColor:"#d3c4b7"}}>d3c4b7</div>
        <div style={{backgroundColor:"#fde9e7"}}>fde9e7</div>
      </div>
  )
}
function App() {
  const [page, setPage] = useState(0);
  
  return (
    <div className="App">
      <div className="top">
        <div className="row justify-content-md-center">
          <img src={profilepic} className="rounded-circle" width="150px" height="auto"></img>
        </div>
        <div className="row justify-content-md-center">
          John Smith
        </div>
        <div className="row justify-content-md-center">
          Team Whitespace Character
        </div>
        <br/>
        <div className="row justify-content-md-center">
          <button className="button topbutton" onClick={()=>setPage(0)}>Badges</button>
          <Col xs={1}></Col>
          <button className="button topbutton" onClick={()=>setPage(1)}>Network</button>
        </div>
        <br/>
      </div>
      
      {page===0?(
      <div className="contentpanel">
        <br/>
        <Row>
          <Award award="Awesome guy award"/>
          <Award award="Best dressed award"/>
          <Award award="Rockstar of the month in Jan 2019"/>
          <Award award="95%&lt; on time"/>
        </Row>
      </div>
      ):(
      <div className="contentpanel">
        <br/>
        <Row>
        <Col xs={6}><Networkprofile name="Barry Johnson" picture={profilepic}/></Col>
        <Col xs={6}><Networkprofile name="Lewis Brindley" picture={profilepic}/></Col>
        </Row>
        <Row>
        <Col xs={6}><Networkprofile name="Ashley Smith" picture={profilepic}/></Col>
        <Col xs={6}><Networkprofile name="Julia Andrews" picture={profilepic}/></Col>
        </Row>
        <Row>
        <Col xs={6}><Networkprofile name="Arnold Schwarzenegger" picture={profilepic}/></Col>
        <Col xs={6}><Networkprofile name="Naomi Satou" picture={profilepic}/></Col>
        </Row>
      </div>
      )}

      
      {/*<DevColors/>**/}

    </div>
  );
}

export default App;
