import React, { useState, useContext, useEffect } from 'react';
import FeedRecognition from './Components/FeedRecognition/FeedRecognition.js';
import SubmitRecog from './Components/SubmitRecog/SubmitRecog.js';
//import Rockstar from './Components/Rockstar/Rockstar.js';
import { TopMenu, Rockstar } from './Components.js';
import { AuthContext } from './AuthContext.js';
//import profilepic from './pics/arnold.jpg';
//import profilepic2 from './pics/regina.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';
import './Home.css'
import ManagerComp from './ManagerComponent.js';
import axios from 'axios';

let profileAPI = "http://localhost:8000/api/get_profile/"

function EmployeeHomepage() {
    const context = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

    const [data, setData] = useState('');

    useEffect(() => {
        getData();
    }, []);

    let getData = () => {
        axios.get(profileAPI, {
          params: {
            uid: context.uid
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
            }
        })
        .catch(error => {
          console.error(error);
        });
    }

    const [ rockstarValues, setRockstarValues ] = useState([]);
    const [ rockstars, setRockstars ] = useState({});

    const [ recognitions, setRecognitions ] = useState([]);
    //eslint-disable-next-line
        const getRecognitions = () => {
        axios.get("http://localhost:8000/api/recog/get/user/", {
            params: {
                "uid": context.uid
            },
            headers: {
                "Authorization": "Bearer " + context.token
            }
        }).then((res) => {
            //console.log(res);
            setRecognitions(res.data.data);
        }).catch((err) => {
            //console.log(err);
        })
    }

    useEffect(() => {
        axios.get("http://localhost:8000/api/get_rockstar/", {
            headers: {
                "Authorization": "Bearer " + context.token
            }
        }).then((res) => {
            setRockstarValues(res.data[0].values);
            setRockstars(res.data[1]);
            //console.log(res);
        }).catch((err) => {
            //console.log(err);
        })
    },[context.token]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/recog/get/user/", {
            params: {
                "uid": context.uid
            },
            headers: {
                "Authorization": "Bearer " + context.token
            }
        }).then((res) => {
            //console.log(res);
            setRecognitions(res.data.data);
        }).catch((err) => {
            //console.log(err);
        })
    },[context.token,context.uid]);

    if (loading) {
        return <div className="App">Error: Non-authorized</div>
    }

    return (
        <div className="app">
            <TopMenu/>
            <div className="body">
                <div className="row">
                    <div className='left-column'>
                        <SubmitRecog />
                        <div style={{width: '100%', marginBottom: '10px', height: '10px', borderBottom: '2px dashed white'}} />
                        {
                            recognitions.map((e, index) => {
                                return (<FeedRecognition key={'feed'+index} uidFrom={e.uid_from} uidTo={e.uid_to} comment={e.comments} />);
                            })
                        }
                    </div>
                    <div className='right-column'>

                        <div className='autoinfobox rounded' style={{height:'auto'}} hidden={context.role !== "mng"}>

                            <ManagerComp/>
                        </div>
                        <div className='infobox rounded'>
                            {
                                rockstarValues.map((e) => {
                                    let rockstar = rockstars[e] ? rockstars[e] : {"uid": "", "name": "", "profile_picture": ""}
                                    return (<Rockstar key={'rock'+e} value={e} uid={rockstar["uid"]} name={rockstar["name"]} profilePicture={'http://localhost:8000' + rockstar["profile_picture"]} />);
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
     
    );
}

export default EmployeeHomepage;