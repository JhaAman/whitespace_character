import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import Doughnut from 'react-chartjs-2';
import Col from 'react-bootstrap/Col';
function ManagerComp(){
    const [feed,setFeed] = useState(false);
    const data = {
        labels:[
            'Red',
            'Green',
            'Blue',
        ],
        datasets:[{
            data: [2,5,9],
            backgroundColor: [
                '#cc0000',
                '#00cc00',
                '#0000cc'
            ],
        }]
    };
    const options = {
        legend:{
            display: true,
            position: 'bottom'
        }
    }
    return(
        <Col>
            
            <Button onClick={
                a=>{setFeed(!feed);
                }}
                >{feed?"Normal Feed":"Your Team Only"}</Button><br/>
            <Doughnut data={data} options={options}/><br/>
            Your team for the past month<br/>
            Total Recognitions: 42<br/>
            Most active users<br/>
            Dave Davidson<br/>
            Steve Stevenson<br/>
            John Johnson
        </Col>
    );
}
export default ManagerComp