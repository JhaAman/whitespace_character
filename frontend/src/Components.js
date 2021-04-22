import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import Popup from 'reactjs-popup';
import NotificationButton from './Notification';
import ProfilePicture from './pics/arnold.jpg'
import axios from 'axios';
import { Rockstar } from './Components/Rockstar/Rockstar.js';
import Image from 'react-bootstrap/Image';
import SearchField from "react-search-field";
import fetchAPI from './services/api.js';
import { AuthenticationContext } from './AuthContext.js'

 
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
    
   function Recognition(props){
      return (
          <div className="recognition rounded">
              <div className="topline">
              <Image src={props.recognizerpicture} className="rounded-circle" width="30px" height="auto"></Image>
              <Link className='link' to={props.recognizerlink}><i><b>{props.recognizer}</b></i></Link> cherishes <Link className='link' to={props.recipientlink}><i><b>{props.recipient}</b></i></Link>
              <Image src={props.recipientpicture} className="rounded-circle" width="30px" height="auto"></Image>
            </div>
            <br></br>
            <div>
                {props.message}
            </div>
            <div style={{textAlign: 'right'}}>
              <Popup trigger={<button>report</button>} position="right center">
                  <form>
                      <div class="repbox">
                          <label>
                              <textarea rows="3" columns="20" placeholder="your worry" class="rep-input"/>
                          </label>
                          <br/>
                          <input type="submit" value="submit" class="rep-button"/>
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

        const authHeader = "Bearer " + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI3NzY4Mzg0LCJqdGkiOiJhMTdmM2IwNmJhZDc0NTQzOTVjODQ1OGRmNTE4ZWNjMiIsInVzZXJfaWQiOjEsImlzX3N0YWZmIjp0cnVlfQ.OoTjzpByW160RR7NSTU2H3AIbAsT6ices4jNKw3DdBI"

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
    
   export default Pass;