import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from './../../AuthContext.js'
import './SubmitRecog.css'
import axios from 'axios';

function SubmitRecog() {
    const context = useContext(AuthContext);
    const [ nameTo, setNameTo ] = useState("")
    const [ uidTo, setUidTo ] = useState("")
    const [ comment, setComment ] = useState("");
    const [ tags, setTags ] = useState([])
    const [ toSubmitTags, setToSubmitTags ] = useState([])
    const [ searchResults, setSearchResults ] = useState([])
    const [ onSuccess, setOnSuccess ] = useState(false);

    const getSearchResults = (query) => {
        if (query !== "") {
            axios.post("http://localhost:8000/api/search/user/", {
                "query": query
            }, {
                headers: {
                    "Authorization": "Bearer " + context.token
                }
            }).then((res) => {
                console.log(res);
                setSearchResults(res.data.data)
            }).catch((err) => {
                console.log(err);
            })
        } else {
            setSearchResults([])
        }
    }

    const getTags = () => {
        axios.get("http://localhost:8000/api/recog/get_tags/", {
            headers: {
                "Authorization": "Bearer " + context.token
            }
        }).then((res) => {
            console.log(res);
            setTags(res.data);
        }).catch((err) => {
            console.log(err);
        }) 
    }

    const onSubmit = () => {
        axios.post('http://127.0.0.1:8000/api/recog/create/', {
            "uid_from": context.uid,
            "uid_to": uidTo,
            "tags": toSubmitTags,
            "comments": comment
        }, {
            headers: {
                "Authorization": "Bearer " + context.token
            }
        }).then((res) => {
            console.log(res);
            setOnSuccess(true);
        }).catch((err) => {
            console.log(err);
            setOnSuccess(false);
        })
    }

    useEffect(getTags, [context.token]);

    return (
        onSuccess ? 
        <div className='submit-main-container'>
            Successfully submitted
            <button onClick={() => { setOnSuccess(false); setNameTo("");}}>Submit Another?</button>
        </div> :
        <div className='submit-main-container'>
            <div style={{display: 'flex', flexDirection: 'row', width: '75%', justifyContent: 'space-between'}}>
                <h1 style={{fontSize: '12pt', margin: 0}}>Search Name:</h1>
                <div style={{width: '75%'}}>
                    <input value={nameTo} onChange={(e) => { setNameTo(e.target.value); getSearchResults(e.target.value) }} style={{width: '100%'}}/>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        {
                            searchResults.map((e) => {
                                return (
                                    <div onClick={() => {setUidTo(e.uid); setNameTo(e.first_name + " " + e.last_name); setSearchResults([])}} style={{border: '1px solid black', backgroundColor: 'white', textAlign: 'left', padding: '2px', zIndex: '2'}}>
                                        {e.first_name + " " + e.last_name}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', width: '75%', justifyContent: 'space-between'}}>
                <h1 style={{fontSize: '12pt', margin: 0}}>Comment:</h1>
                <input onChange={(e) => setComment(e.target.value)} style={{width: '75%'}}/>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', width: '90%', justifyContent: 'space-evenly'}}>
                <h1 style={{fontSize: '12pt', margin: 0}}>Tags:</h1>
                {
                    tags.map((e) => <button onClick={() => toSubmitTags.push(e)}>{e}</button>)
                }
            </div>
            <button hidden={comment === "" || uidTo === ""} onClick={() => onSubmit()} style={{width: '25%'}}>Submit Recognition</button>
        </div>
    );
}

export default SubmitRecog;