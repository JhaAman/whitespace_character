import React from 'react';
import './Toolbar.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';

function Toolbar({isOpen, setIsOpen}) {
    return (
        <Row>
            <Col xs={11}><h1 style={{color: 'white'}}>Peer Recognition Interface</h1></Col>
            <Col xs={1}><button className="HamburgerMenu" onClick={() => setIsOpen(!isOpen)} >≡</button></Col>
        </Row>
    );
}

export default Toolbar;