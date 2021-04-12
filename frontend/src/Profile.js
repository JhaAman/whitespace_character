import profilepic from './pics/arnold.jpg';
import './Profile.css';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {AuthenticationContext} from './AuthContext.js';
import images from './Images.js';

function Networkprofile(props) {
  return (
    <Row className="profile">
      <Col xs={5}><Image src={props.picture} className="profilepic rounded-circle img-fluid" /></Col>
      <Col xs={7}>{props.name}</Col>
    </Row>
  )
}
function Award(props) {
  return (
    <Col className="award">
      <h2>🏆</h2><br />
      {props.award}
    </Col>
  )
}

function ProfilePictureChoice(props) {
  return (
    <Col className="profilepicturechoice">
      <Image src={props.src} style={{height:"100px",width:"100px"}} roundedCircle/>
    </Col>
  )
}

// function DevColors(){
//   return(
// <div>
//         <div style={{backgroundColor:"#fef2e6"}}>fef2e6</div>
//         <div style={{backgroundColor:"#68321a"}}>68321a</div>
//         <div style={{backgroundColor:"#fff1e5"}}>fff1e5</div>
//         <div style={{backgroundColor:"#d3c4b7"}}>d3c4b7</div>
//         <div style={{backgroundColor:"#fde9e7"}}>fde9e7</div>
//       </div>
//   )
// }
let profileAPI = "http://localhost:8000/api/user/get/";


function Profile() {
  const [awards, setAwards] = useState();
  const [people, setPeople] = useState();
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const { userid } = useParams();
  const value = useContext(AuthenticationContext);
  const [pictures,setPictures] = useState([]);
  
  useEffect(() => {
    MakePictureComponent();
    getData();
    
    //console.log(pictures);
    // eslint-disable-next-line
  }, []);

  let getData = () => {
    axios.get(profileAPI, {
      params: {
        uid: userid
      },
      headers:{
        Authorization:"Bearer "+value.authenticationState.token
      },
    })
      .then(function (res) {
        if (res.status === 200) {
          console.log("Success!");

          setData(res);
          setLoading(false);
          let a = res.data.data.badges;
          let b = []
          for (let i = 0; i < a.length; i++) {

            //console.log(a[i]);
            b.push(<Award key={i} award={a[i]} />);
          }
          setAwards(b);
          let dpeople = res.data.data.network;
          let p = [];
          for (let i = 0; i < dpeople.length; i++) {
            //console.log(dpeople[i]);
            let name = dpeople[i].first_name + " " + dpeople[i].last_name;
            p.push(<Networkprofile key={i} name={name} picture={profilepic} />)
          }
          setPeople(p);
        }
      })
      .catch(error => {
        console.error(error);
        console.error("debug");
        
        let sample = {
          "status": "200",
          "msg": "Fetched requested user",
          "data": {
              "tid": "36590184",
              "uid": "52793423",
              "first_name": "Brett",
              "last_name": "Harrison",
              "email": "bh@apple.com",
              "job_title": "Project Manager",
              "badges": [],
              "network": [
                  "99723579",
                  "52793423",
                  "23747122"
              ],
              "values_scores": {
                  "caring": 0,
                  "succint": 0,
                  "leadership": 0
              },
              "profile_picture": null,
              "user_role": "mng",
              "date_created": "2021-04-11 05:43 UTC",
              "password": "fruits"
          },
          "trace": null
      };
        setData(sample);
        setLoading(false);

        let a = sample.data.badges;
          let b = []
          for (let i = 0; i < a.length; i++) {

            //console.log(a[i]);
            b.push(<Award key={i} award={a[i]} />);
          }
          setAwards(b);
          let dpeople = sample.data.network;
          let p = [];
          for (let i = 0; i < dpeople.length; i++) {
            //console.log(dpeople[i]);
            let name = dpeople[i].first_name + " " + dpeople[i].last_name;
            p.push(<Networkprofile key={i} name={name} picture={profilepic} />)
          }
          setPeople(p);

      });
  }

  function MakePictureComponent(){
    let r = []
    for(let a in images){
      r.push(<ProfilePictureChoice src={images[a]} alt="profile picture"/>)
    }
    setPictures(r);
  }

  if (loading) {
    return <div className="App">Loading</div>
  }


  //console.log(data);


  return (
    <div className="App">
      <div className="top">
        <div className="row justify-content-md-center">
          <img src={profilepic} className="rounded-circle" width="150px" height="auto" alt="Smiling guy"></img>
        </div>
        <div className="row justify-content-md-center">
          {data.data.first_name} {data.data.last_name}
        </div>
        <div className="row justify-content-md-center">
          {data.data.job_title}
        </div>
        <br />
        <div className="row justify-content-md-center">
          <button className="button topbutton" onClick={() => setPage(0)}>Badges</button>
          <Col xs={1}></Col>
          <button className="button topbutton" onClick={() => setPage(1)}>Network</button>
          <Col xs={1}></Col>
          <button className="button topbutton" onClick={() => setPage(2)}>Settings</button>
        </div>
        <br />
      </div>

      {page === 0 ? (
        <div className="contentpanel">
          <br />
          <Row>

            {awards}

          </Row>
        </div>
      ) : page===1 ?(
        <div className="contentpanel">
          <br />
          {people}

        </div>
      ) :
      <div className="contentpanel">
        <br/>
        <div>
          Profile Settings
          <div className="optionbox">
            Select a profile picture
            <div className="picturescroll">
              <Row>{pictures}</Row>
            </div>
          </div>
        </div>


      </div>}


      {/*<DevColors/>**/}

    </div>
  );
}

export default Profile;