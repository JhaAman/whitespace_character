import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import Popup from 'reactjs-popup';
import SearchField from "react-search-field";

import fetchAPI from './services/api.js'
import NotificationButton from './Notification';
import ProfilePicture from './pics/arnold.jpg' 
import './App.css';
import { AuthenticationContext } from './AuthContext.js';

 
/* Now storing objects here, so they have access to all the right directories and CSS and suchlike. If this upset anyone, let me know. ~ Christopher */
/* To add an object here, though, one must add the line “// eslint-disable-next-line” to escape the wrath of the garbage fairy. */
 
/* Because there must be a default return, I have included this “Pass” function, akin to Python’s pass keyword.
  Let me (Christopher) know, of course, be this a problem.
  For the common good, though, the Pass function will get a little queasy if you forget your curly brackets! */
function Pass() {
 return(
   <div style={{fontSize: 40, font: 'AlegreyaSans', fontWeight: 'bold', color: 'red', backgroundColor: 'white'}}>
     🤮 Alack : thou hast forgotten thy <em>curlye brackets</em>, O knave, in thine import statement(s) from Components.js !
   </div>);
}


// eslint-disable-next-line
function Recognition(props){
    return (
        <div className="recognition rounded">
            <div className="topline">
                <i><b>{props.recognizer}</b> cherishes <b>{props.recipient}</b></i>
            </div>
            <br></br>
            <div>
                {props.message}
            </div>
            <div style={{textAlign: 'right'}}>
            <Popup trigger={<button>report</button>} position="right center">
                <form>
                    <div className="repbox">
                        <label>
                            <textarea rows="3" columns="20" placeholder="your worry" className="rep-input"/>
                        </label>
                        <br/>
                        <input type="submit" value="submit" className="rep-button"/>
                    </div>
                </form>
            </Popup>
        </div>
        </div>
 )
}
export { Recognition }
 

// eslint-disable-next-line
function Header({isOpen, setIsOpen}) {
    return (
        <div className="header">
            <i>whitespaß</i>
        </div>
    );
}
export { Header }
 

// eslint-disable-next-line
function TopMenu({isOpen, setIsOpen}) {

    // State hook for search bar text
    const [searchText, setSearchText] = useState("");

    // State hook for search result list
    const [searchResultList, setSearchResultList] = useState([])

    // Get JWT authorization context
    const value = useContext(AuthenticationContext);

    // Handler on user typing in search bar
    const onChangeSearchBarText = newText => {
        // Set search text to new updated text
        setSearchText(newText)
    }

    const actualEnterSearchBarHandler = async () => {

        const authHeader = "Bearer " + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI3Njg3MjkzLCJqdGkiOiIyZWQ1N2ViYWQyYmE0OTMyOTgyMzI2YmJlYzdmZmZhNyIsInVzZXJfaWQiOjEsImlzX3N0YWZmIjp0cnVlfQ.6Z3uVQUJyi99NB8dq-XU6yxVMSscvtX6PdR6WI_V-uI"

        const resp = await fetchAPI({
            method: "post",
            endpoint: "search/user/",
            headers: {"Authorization": authHeader},
            data: {"query": searchText},
        })

        const data = resp.data.data
        setSearchResultList(data)
    }

    // Handler on user submitting search query
    // Has to call on a helper function for async/await, probably due to
    //   react-search-field package design
    const onEnterSearchBar = () => {
        actualEnterSearchBarHandler()
    }

    return (
        <div className='topmenu'>
            <div className="row">
                <div className='menu-left'>
                    ws
                </div>
                <div className='menu-center'>
                    <Link className='top-link' to='/home'>home</Link>
                    <Link className='top-link' to='/me'>self</Link>
                    <Link className='top-link' to='/login'>logout</Link>
                </div>
                <Link className='top-link'>search</Link>
                 <SearchField
                    classNames="top-menu-search-bar"
                    placeholder="Search for a user"
                    searchText={searchText}
                    onEnter={onEnterSearchBar}
                    onChange={onChangeSearchBarText}
                 />
                 { 
                    searchResultList.map(
                        searchResult => 
                        <div style={{marginLeft: '10px'}}>
                            {searchResult.profile_picture}
                            {searchResult.first_name}
                            {searchResult.last_name}
                            {searchResult.title}
                        </div>
                    ) 
                 }
                <div className='menu-right'>
                    <NotificationButton/>
                </div>
            </div>
        </div>
    );
}
 
export { TopMenu }
 

// eslint-disable-next-line
/* This will be part of my April 4 week CSS cleanup ~ Christopher */
function Rockstar({value, firstName, lastName}) {
   return (
        <div style={{height: '150px', width: '90%', border: '2px solid black', marginBottom: '5px'}}>
            <div style={{width: '100%', height: '20%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', borderBottom: '2px solid black'}}>
                <h1 style={{fontSize: '12pt', fontWeight: 'bold', margin: 0}}>ROCKSTAR OF THE MONTH: {value}</h1>
            </div>
            <div style={{width: '100%', height: '80%', display: 'flex', flexDirection: 'row'}}>
                <div style={{width: '50%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <img src={ProfilePicture} alt="but a lad" style={{width: '100px', height: '100px', borderRadius: '50%', border: '2px solid black'}}/>
                </div>
                <div style={{width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly'}}>
                    <h2 style={{fontSize: '15pt', margin: 0}}>{firstName} {lastName}</h2>
                </div>
            </div>
        </div>
   )
}
 
export { Rockstar };
 
export default Pass;