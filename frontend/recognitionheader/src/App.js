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
import { useEffect, useState } from 'react';

let apiURL = "http://localhost:8000/api/get_users/";





function App() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  function AwardDisplay(awardtitle){
    //console.log(awardtitle);
    return(
      <div className="award rounded-circle" title={awardtitle.awardtitle}>🏆</div>
    );
  }

  function RecognitionBanner(){
    let awards = [];
    for(let i=0;i<data.data[1].badges.length;i++){
      awards.push(<AwardDisplay awardtitle={data.data[1].badges[i]} key={i}/>);
    }
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
              {data.data[1].first_name} {data.data[1].last_name}
              </div>
              <div className="TextTitle">
              {data.data[1].title}
              </div>
              <div className="TextBio">
              {data.data[1].email}
              </div>
              </div>
              </div>
              
              <div className="col-4" >
              <Row className="justify-content-center align-self-start" style={{width:'100%'}}>

                {awards}
                
              </Row>
              <Button variant="outline-primary" className="votebutton">Recognize</Button>
              </div>
  
            </Row>
  
          
          
        </div>
    );
  }


  useEffect(() =>{
    axios.get(apiURL)
    .then(function(res){
      setData(res);
      setLoading(false);
      //console.log(res.data);
    })
    .catch(error => console.error(error));
  },[]);
  

  if(loading){
    return <div className="App">Loading</div>
  }

  console.log(data.data);

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
