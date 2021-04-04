import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import DropdownItem from 'react-bootstrap/DropdownItem';
import Dropdown from 'react-bootstrap/Dropdown';
//import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import {faBell} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';



function Notification(props){
  return(
    <DropdownItem>
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
    </DropdownItem>
    
  );
}

function App() {
  let notifications = [];
  return (
    <div className="App">
      


      
      <DropdownButton variant="light" title={<FontAwesomeIcon icon={faBell}/>} >
      <Notification message="You got a new recognition from Gary" type="Recognition" time="5 hours ago" new="yes"/>
          <Dropdown.Divider/>
          <Notification message="You got a new recognition from Sally" type="Recognition" time="8 hours ago" new="yes"/>
          <Dropdown.Divider/>
          <Notification message="You received a new badge" type="Badge" time="12 hours ago" new="no"/>
          <Dropdown.Divider/>
          <Notification message="Steve has been declared the Rockstar of the Month" type="Global" time="Yesterday" new="no"/>
      </DropdownButton>









    </div>
    
  );
}

export default App;
