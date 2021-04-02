import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

function Notification(props){
  return(
    <div className={props.new+"-notification"}>
        <Row>
          <Col>{props.type}</Col>
          <Col xs={4}>{props.time}</Col>
        </Row>
        <br/>
        <Row>
          <Col>
            <div className="Notification-Message">{props.message}</div>
          </Col>
          <Col xs={2}>
          <Button size="sm">Ok</Button>
          </Col>

        </Row>
      
    </div>
    
  );
}

function App() {
  let notifications = [];
  return (
    <div className="App">
      <Navbar bg="light" expand="sm">
        <Navbar.Brand href="#home">whitespaß</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        
        <NavDropdown title={"📢"+notifications.length} id="notificationsdropdown" >
          <Notification message="You got a new recognition from Gary" type="Recognition" time="5 hours ago" new="yes"/>
          <hr/>
          <Notification message="You got a new recognition from Sally" type="Recognition" time="8 hours ago" new="yes"/>
          <hr/>
          <Notification message="You received a new badge" type="Badge" time="12 hours ago" new="no"/>
          <hr/>
          <Notification message="Steve has been declared the Rockstar of the Month" type="Global" time="Yesterday" new="no"/>
        </NavDropdown>


        <NavDropdown title="Garry Stevenson" id="profiledropdown" className="ml-auto">
          <Nav.Link href="#Profile">Profile</Nav.Link>

          <Nav.Link href="#Settings">Settings</Nav.Link>

          <Nav.Link href="#Logout">Log Out</Nav.Link>
        </NavDropdown>
      </Navbar>
      Hello world
    </div>
    
  );
}

export default App;
