import profilepic from './pics/arnold.jpg';
import './Profile.css';
import './App.css';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { TopMenu } from './Components.js';

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
let profileAPI = "http://localhost:8000/api/get_profile/";


function Profile() {
  const [awards, setAwards] = useState();
  const [people, setPeople] = useState();
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const { userid } = useParams();

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  let getData = () => {
    axios.get(profileAPI, {
      params: {
        uid: userid
      }
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
      .catch(error => console.error(error));
  }


  if (loading) {
    return <div className="App">Loading</div>
  }


  console.log(data);


  return (
    <div className="App">
      <TopMenu/>
      <div class="body">
        <div className="column header-box rounded">
          <div className="row profile-avatar">
            <img style={{border: "10px solid #58453B"}} src={profilepic} className="rounded-circle" width="150px" alt="Smiling guy"></img>
          </div>
          <div class="row button-row">
            <div className="firstname">
              {data.data.first_name} {data.data.last_name}
            </div>
          </div>
          <div className="row button-row">
            <div className="lastname">
              {data.data.job_title}
            </div>
          </div>
          <br />
          <div className="row button-row">
            <div className="row button-row-inside">
              <button className="button topbutton" onClick={() => setPage(0)}>badges</button>
              <Col xs={1}></Col>
              <button className="button topbutton" onClick={() => setPage(1)}>network</button>
            </div>
          </div>
        </div>
      </div>
      {page === 0 ? (
        <div className="contentpanel">
          <br />
          <Row>

            {awards}

          </Row>
        </div>
      ) : (
        <div className="contentpanel">
          <br />
          {people}

        </div>
      )}


      {/*<DevColors/>**/}

    </div>
  );
}

export default Profile;