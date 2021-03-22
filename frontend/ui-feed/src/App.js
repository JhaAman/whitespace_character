import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import profilepic from './arnold.jpg';

function App() {
  return (
    <div className="App">
      <Container>
        <span>
        <Row>
          <Col xs={4}><Image src={profilepic} alt="Profile" roundedCircle></Image></Col>
          <Col xs={7} class="align-self-center h-100 col-7">
            <div>John Smith</div>
            <div>I really can't believe it, but John did a really good job today with his super cool project</div>
          </Col>
          <Col xs={1}></Col>
        </Row>
        </span>
        
      </Container>
    </div>
  );
}

export default App;
