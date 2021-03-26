//import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//import Container from 'react-bootstrap/Container';
import profilepic from './arnold.jpg';
import Button from 'react-bootstrap/Button';

import axios from 'axios';

let apiURL = "";
function getData(){

}
function RecognitionBanner(){
  return(
    <div className="ProfileBanner rounded">
        
          <Row>
            <Col xs={3}>
              <div className="imgdiv">
              <Image src={profilepic} className="img-fluid" roundedCircle/>
              </div>
              
            </Col>
            <div className="align-self-center col">
            <div className="TextInfo">
            <div className="TextName">
            John Smith
            </div>
            <div className="TextTitle">
            Sr. Software Engineer, Mac Team
            </div>
            <div className="TextBio">
            Bio here Bio here
            </div>
            </div>
            </div>
            
            <div className="col-4" >
            <Row className="justify-content-center align-self-start" style={{width:'100%'}}>
              <div className="award rounded-circle" title="Best Dressed">🏆</div>
              <div className="award rounded-circle" title="Innovation Badge">🏆</div>
              <div className="award rounded-circle" title="Collaboration Badge">🏆</div>
              
            </Row>
            <Button variant="outline-primary" className="votebutton">Give Recognition</Button>
            </div>

          </Row>

        
        
      </div>
  );
}

function App() {
  return (
    <div className="App">
      
      <Row>
        <Col><RecognitionBanner/></Col>
        <Col xs={5}/>
      </Row>
      
    </div>
  );
}

export default App;
