import Button from 'react-bootstrap/Button';
import React, { useState, useContext, useEffect } from 'react';
import Pie from 'react-chartjs-2';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import profilepic from './pics/arnold.jpg';
import axios from 'axios';
import './ManagerComponent.css';
import { AuthenticationContext } from './AuthContext.js';


function ManagerComp(){
    

    const value = useContext(AuthenticationContext);
    
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
                    <Col><div>Gave {props.gave}</div></Col>
                    <Col><div>Received {props.recieved}</div></Col>
                    </Row>
                    Highest Value: {props.best}
                    </Col>
                </Row>
            </div>
        );
    }

    const [feed,setFeed] = useState(false);
    const [data,setData] = useState();
    const [employeelist,setEmployeeList] = useState([]);
    const [loading,setLoading] = useState(true);
    const [total,setTotal] = useState();

    const options = {
        legend:{
            display: false,
            position: 'bottom'
        },
        maintainAspectRatio: false,
    }
    
    function getData(){
        axios.post("http://localhost:8000/api/user/mng/stats/",
                {uid:57940164},
                {
                    headers:{
                        Authorization:"Bearer "+value.authenticationState.token
                    }
                }
                )
                .then(function(response){
                    console.log(value.authenticationState);
                    //========================SET UP GRAPH=========================================
                    let len = 0;//number of elements in tagDistr, for some reason I couldnt use .length
                    for(const a in response.data.data.tagDistr){
                        len++;
                    }
                    let lb = [];//labels in graph
                    let dt = [];//data in graph
                    let cl = 360/len;//distance between hsl colors
                    let i = 0;//iterator
                    let bg = [];//will hold colors
                    for(const a in response.data.data.tagDistr){
                        lb.push(a)
                        dt.push(response.data.data.tagDistr[a]);
                        bg.push('hsl('+(cl*i++)+',100%,50%)');//use hsl to easily get spaced out colors
                    }
                    setData({
                        labels:lb,
                        datasets:[{
                            data:dt,
                            backgroundColor:bg}
                        ],
                    }
                    );
                    //===================SET UP EMPLOYEE LIST================================
                    //console.log(response.data.data.empls);
                    let e = response.data.data.empls;
                    for (const a in e){
                        //console.log(e[a].first_name);
                        setEmployeeList(employeelist => [...employeelist,
                            <EmployeeDisplay
                            key={a}
                            name={e[a].first_name+" "+e[a].last_name}
                            gave={e[a].recogOutCount}
                            recieved={e[a].recogInCount}
                            best={e[a].best_tag}/>]
                            );
                    }
                    setTotal(response.data.data.recogTotal);
                    setLoading(false);
                }
                );
    }

    useEffect(()=>{
        getData()
    },[])//eslint-disable-line react-hooks/exhaustive-deps


    if(loading)return(<div>WAITING ON A BACKEND FIX FOR GETTING UID</div>);
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
            <div className="f">{total}<br/>Total
            </div>
            </div>
            <div className="title rounded" >Employee Stats
            <div style={{overflowY: 'scroll', height:'200px'}}>
            {employeelist}
            </div>
            </div>
            <br/>
            

        </div>
        </div>
    );
}
export default ManagerComp