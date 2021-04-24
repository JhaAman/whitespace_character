//import Button from 'react-bootstrap/Button';
import React, { useState, useContext, useEffect } from 'react';
import Pie from 'react-chartjs-2';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import profilepic from './pics/arnold.jpg';
import axios from 'axios';
import './ManagerComponent.css';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext.js';


function ManagerComp(){
    

    const context = useContext(AuthContext);
    
    function EmployeeDisplay(props){
        return(
            <div className="employee_display">
                <Row>
                    <Col xs={3}>
                        <img 
                        style={{border: "5px solid #58453B", width: "75px", height: "75px"}}
                        src={"http://localhost:8000"+props.profilepic}
                        className="profilepic rounded-circle img-fluid"/>
                    </Col>
                    <Col>
                        <Link className='net-link' to={'/u/'+props.uid} style={{fontWeight: "bold"}}>{props.name}</Link> <br/>
                        <Row>
                            <Col>
                                <div>
                                    Gave {props.gave}
                                </div>
                            </Col>
                            <Col>
                                <div>
                                    Received {props.recieved}
                                </div>
                            </Col>
                        </Row>
                        Highest Value: {props.best}
                    </Col>
                </Row>
            </div>
        );
    }

    //const [feed,setFeed] = useState(false);
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
        //console.log(value.authenticationState.userInfo.userID);
        axios.post("http://localhost:8000/api/user/mng/stats/",

                {uid: context.uid},

                {
                    headers:{
                        Authorization:"Bearer "+ context.token
                    }
                }
                )
                .then(function(response){

                    //========================SET UP GRAPH=========================================
                    let len = 0;//number of elements in tagDistr, for some reason I couldnt use .length
                    // eslint-disable-next-line
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
                            uid={e[a].uid}
                            gave={e[a].recogOutCount}
                            recieved={e[a].recogInCount}
                            best={e[a].best_tag}
                            profilepic={e[a].profile_picture_url}/>]
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


    if(loading)return(<div>Loading</div>);
    return(
        <div>
        <div>
            <div/>
            <div className="title rounded" style={{marginBottom:'10px', fontWeight: "bold"}}>your team dashboard</div>
            {/*<Button style={{marginBottom:'30px'}} onClick={
                a=>{setFeed(!feed);
                }}
            >{feed?"Show Normal Feed":"Show Your Team Only"}</Button><br/>**/}
             
            <div style={{height:"200px"}}>
                <Pie data={data} options={options} />
            <div className="f">{total}<br/>total
            </div>
            </div>
            <div className="title rounded" >Employee Stats
            <div style={{overflowY: 'scroll', height:'300px'}}>
            {employeelist}
            </div>
            </div>
            <br/>
            

        </div>
        </div>
    );
}
export default ManagerComp