import defprofilepic from './pics/arnold.jpg';
import './Profile.css';
import './App.css';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import {AuthContext} from './AuthContext.js';
import images from './Images.js';
import { TopMenu } from './Components.js'

function Networkprofile(props) {
  return (
    <div className="net-profile rounded">
      <div className="pf-left-column">
        <img style={{border: "5px solid #58453B", width: "100px", height: "100px"}} src={props.picture} className="profilepic rounded-circle img-fluid" />
      </div>
      <div className="pf-right-column">
        <Link className='net-link' to={'/u/'+props.uid} style={{}}>{props.name}</Link> <br/>
        <div style={{fontSize: "18px", fontStyle: "italic"}}>
          {props.title}
        </div>
      </div>
    </div>
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
  const context = useContext(AuthContext);
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
        Authorization: "Bearer " + context.token
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
            p.push(<Networkprofile title={dpeople[i].title} uid={dpeople[i].uid} key={i} name={name} picture={"http://localhost:8000"+dpeople[i].profile_picture} />)
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
    axios.put("http://localhost:8000/api/user/change_password/",
    {
      uid:userid,
      old:oldpass,
      new:newpass,
    },
    {
    headers:{
      Authorization: "Bearer " + context.token
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
    return <div className="App">Error: Non-authorized</div>
  }


  //console.log(data);
  //console.log(typeof(userid));
  //console.log(typeof(value.authenticationState.userInfo.userID.toString()));

  //console.log(value);
  return (
    
    <div className="body">
      <TopMenu/>
      <div className="column header-box rounded">
        <div className="row profile-avatar">
          <img style={{border: "10px solid #58453B"}} src={"http://localhost:8000"+profilepic} className="rounded-circle" width="150px" height="150px" alt="Smiling guy"></img>
        </div>
        <div class="row button-row">
          <div className="firstname">
            {data.data.first_name} {data.data.last_name}
          </div>
        </div>
        <div className="row button-row">
          <div className="lastname">
            {data.data.title}
          </div>
        </div>
        <br />
        <div className="row button-row">
        <button className="button topbutton" onClick={() => setPage(0)}>badges</button>
          <Col xs={1}></Col>
          <button className="button topbutton" onClick={() => setPage(1)}>network</button>
          <Col xs={1} hidden={userid !== context.uid}></Col>
          <button className="button topbutton" onClick={() => setPage(2)} hidden={userid!==context.uid}>settings</button>

        </div>
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
            <div><b>change password</b></div>
            <br/>
            <form >
              <label>
                <input
                className="input"
                type="password"
                placeholder="old password"
                value={oldpass}
                onChange={e=>setOldPass(e.target.value)}
                />
              </label>
              <br/>
              <label>
                <input
                className="input"
                type="password"
                placeholder="new password"
                value={newpass}
                onChange={e=>setNewPass(e.target.value)}
                />
              </label>
              <br/>
              <label>
                <input
                className="input"
                type="password"
                placeholder="new password again"
                value={newpassagain}
                onChange={e=>setNewPassAgain(e.target.value)}
                />
              </label>
              <br/>
              
            </form>
            <button onClick={e=>changePassword()} hidden={newpass!==newpassagain}>
              update
            </button>
            <div hidden={newpass===newpassagain}>Please ensure your new password is typed the same in both boxes</div>
          </div>
          </Col>
            <Col>
          <div className="optionbox">
            <div><b>upload avatar</b></div>
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
                      Authorization:"Bearer "+ context.token
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