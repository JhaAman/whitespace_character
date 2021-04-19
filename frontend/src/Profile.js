import defprofilepic from './pics/arnold.jpg';
import './Profile.css';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
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
    <div className="profilepicturechoice col">
      <Image src={props.src} style={{height:"100px",width:"100px"}} roundedCircle/>
    </div>
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
let profileAPI = "http://localhost:8000/api/get_profile/"


function Profile() {
  const [awards, setAwards] = useState();
  const [people, setPeople] = useState();
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const { userid } = useParams();
  const value = useContext(AuthenticationContext);
  //const [pictures,setPictures] = useState([]);
  const [oldpass,setOldPass] = useState("");
  const [newpass,setNewPass] = useState("");
  const [newpassagain,setNewPassAgain] = useState("");
  const [uploadexists,setUploadExists] = useState(false);
  const [ufile,setUFile] = useState("");
  const [profilepic,setProfilePic] = useState(defprofilepic);
  const upload = React.useRef(null);
  const handleImageUpload = e =>{
    const [file] = e.target.files;
    setUploadExists(true);
    if(file){
      const reader = new FileReader();
      const {current} = upload;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result;
      }
      reader.readAsDataURL(file);
      setUFile(file);
      
    }
  }
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
          let a = res.data.badges;
          let b = []
          for (let i = 0; i < a.length; i++) {

            //console.log(a[i]);
            b.push(<Award key={i} award={a[i]} />);
          }
          setAwards(b);
          let dpeople = res.data.network;
          let p = [];
          for (let i = 0; i < dpeople.length; i++) {
            //console.log(dpeople[i]);
            let name = dpeople[i].first_name + " " + dpeople[i].last_name;
            p.push(<Networkprofile key={i} name={name} picture={profilepic} />)
          }
          setPeople(p);
        }
        setProfilePic(res.data.profile_picture);
      })
      .catch(error => {
        console.error(error);
      });
  }

  function MakePictureComponent(){
    let r = []
    for(let a in images){
      r.push(<ProfilePictureChoice src={images[a]} key={a} alt="profile picture"/>)
    }
    //setPictures(r);
  }

  function changePassword(){
    axios.post("http://localhost:8000/api/user/change_password/",
    {
      uid:80917506,
      old:oldpass,
      new:newpass,
    },
    {
    headers:{
      Authentication:"Bearer "+value.authenticationState.token
    }},
    ).then(function(res){
      if(res.status===200){
        console.log("successfully changed password");
      }
      else{
        console.log("something went wrong");
      }
    })
    .catch(e=>console.log(e));
    //console.log(oldpass);
    //console.log(newpass);
    //console.log(newpassagain);
  }

  if (loading) {
    return <div className="App">Loading</div>
  }


  //console.log(data);


  return (
    <div className="App">
      <div className="top">
        <div className="row justify-content-md-center">
          <img src={"http://localhost:8000"+profilepic} className="rounded-circle" width="150px" height="150px" alt="Smiling guy"></img>
        </div>
        <div className="row justify-content-md-center">
          {data.data.first_name} {data.data.last_name}
        </div>
        <div className="row justify-content-md-center">
          {data.data.title}
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
      <div className="contentpanel" >
        <br/>
        <div>
          <Container>
          
          <Row>
          <Col>
          <div className="optionbox">
            <div>Change password</div>
            <br/>
            <form >
              <label>
                <input
                type="password"
                placeholder="Old Password"
                value={oldpass}
                onChange={e=>setOldPass(e.target.value)}
                />
              </label>
              <br/>
              <label>
                <input
                type="password"
                placeholder="New Password"
                value={newpass}
                onChange={e=>setNewPass(e.target.value)}
                />
              </label>
              <br/>
              <label>
                <input
                type="password"
                placeholder="New Password Again"
                value={newpassagain}
                onChange={e=>setNewPassAgain(e.target.value)}
                />
              </label>
              <br/>
              
            </form>
            <button onClick={e=>changePassword()} hidden={newpass!==newpassagain}>
              Change Password
            </button>
            <div hidden={newpass===newpassagain}>Please ensure your new password is typed the same in both boxes</div>
          </div>
          </Col>
            <Col>
          <div className="optionbox">
            <div>Upload a profile picture</div>
            <br/>
            <div className="picture">
              <form>
                <input
                type="file"
                accept="image/*"
                multiple={false}
                onChange={handleImageUpload}
                hidden = {uploadexists}
                />
                <div >
                <img ref={upload} style={{width:"150px",height:"150px"}} hidden={!uploadexists}className="rounded-circle" alt=""/></div>
                <div>
                <input type="submit"
                value="Set Image" 
                hidden={!uploadexists}
                onClick={e=>{
                  setProfilePic(ufile);
                  const data = new FormData();
                  //console.log(ufile);
                  data.append('profile_picture',ufile)
                  axios.put("http://localhost:8000/api/update_user_profile_picture/",
                    data
                ,
                  {
                    headers:{
                      'Content-Type': 'multipart/form-data',
                      Authorization:"Bearer "+value.authenticationState.token
                    }
                  }).then(console.log("uploaded"))
                }}/>
                <input type="button"
                value="Choose Another"
                onClick={
                  e=>{setUploadExists(false);
                    
                  }} hidden={!uploadexists}/>
                </div>
              </form>
              
            </div>
          </div>
          </Col>
          
          </Row>
          </Container>
        </div>


      </div>}


      {/*<DevColors/>**/}

    </div>
  );
}

export default Profile;