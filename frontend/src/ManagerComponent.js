import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import Pie from 'react-chartjs-2';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import profilepic from './pics/arnold.jpg';
import './ManagerComponent.css';

function ManagerComp(){
    function EmployeeDisplay(props){
        return(
            <div className="employee_display">
                <Row>
                    <Col xs={3}>
                    <Image src={profilepic} className="employee_display_image" roundedCircle/>
                    </Col>
                    <Col>
                    <div>{props.name}</div>
                    <Row>
                    <Col><div>Gave 6</div></Col>
                    <Col><div>Received 8</div></Col>
                    </Row>
                    Highest Value: Hardworking
                    </Col>
                </Row>
            </div>
        );
    }

    const [feed,setFeed] = useState(false);
    const data = {
        labels:[
            'Hardworking',
            'Creative',
            'Inspiring',
        ],
        datasets:[{
            data: [2,5,9],
            backgroundColor: [
                '#cc0000',
                '#00cc00',
                '#0000cc'
            ],
        }],
    };
    const options = {
        legend:{
            display: true,
            position: 'right'
        },
        maintainAspectRatio: false,
    }
    return(
        <div>
        <div>
            <div/>
            <div className="title rounded" style={{marginBottom:'10px'}}>Your Team Dashboard</div>
            
            <Button style={{marginBottom:'30px'}} onClick={
                a=>{setFeed(!feed);
                }}
                >{feed?"Show Normal Feed":"Show Your Team Only"}</Button><br/>
            <div style={{height:"200px"}}>
            
            <Pie data={data} options={options} />
            <div className="graphtext">123 Total</div>
            </div>
            <div className="title rounded" >Employee Stats
            <div style={{overflowY: 'scroll', height:'200px'}}>
            <EmployeeDisplay name="Dave Davidson"/>
            <EmployeeDisplay name="Dave Davidson"/>
            <EmployeeDisplay name="Dave Davidson"/>
            <EmployeeDisplay name="Dave Davidson"/>
            <EmployeeDisplay name="Dave Davidson"/>
            <EmployeeDisplay name="Dave Davidson"/>
            <EmployeeDisplay name="Dave Davidson"/>
            </div>
            </div>
            <br/>
            

        </div>
        </div>
    );
}
export default ManagerComp