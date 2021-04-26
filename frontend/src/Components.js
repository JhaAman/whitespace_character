
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import { AuthContext } from './AuthContext.js';
import Popup from 'reactjs-popup';
import SearchField from "react-search-field";
import fetchAPI from './services/api.js';
import Image from 'react-bootstrap/Image';
import NotificationButton from './Notification';

import ProfilePicture from './pics/arnold.jpg'
import axios from 'axios';

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
  return(
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

function SearchResultDisplay(props){ //edit this to make each search result clickable with uid field in link
    return (
        <View style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap"
        }}>
        <div className="recognition rounded">
            <div className="topline">
            <Image src={props.profile_picture} className="rounded-circle" width="30px" height="auto"></Image>
            {props.title} <Link className='link' to={'/u/'}><i><b>{props.first_name} {props.last_name}</b></i></Link>
          </div> 
        </div>
        </View>
  )
 }

 export { SearchResultDisplay }

// eslint-disable-next-line
function TopMenu({isOpen, setIsOpen}) {

    const context = useContext(AuthContext);
    
    // State hook for search bar text
  const [searchText, setSearchText] = useState("");
  // State hook for search result list
  const [searchResultList, setSearchResultList] = useState([])
  // Get JWT authorization context
  const value = useContext(AuthContext);

  // Handler on user typing in search bar
  const onChangeSearchBarText = newText => {
      // Set search text to new updated text
      setSearchText(newText)
  }

  const actualEnterSearchBarHandler = async () => {
     
      const authHeader = 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI3NzY2MTU4LCJqdGkiOiJhMWRjYmYyZTNjZWY0NTY3ODg1YzU2NTAyNWJlMWQwNSIsInVzZXJfaWQiOjEsImlzX3N0YWZmIjp0cnVlfQ.5KfI8UUJBjQnWIVkNRR4BIkjO7gAjedjFHpkX62UFb4'
 
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
                    <Link onClick={() => context.logout()}className='top-link' to='/login'>logout</Link>
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
                               SearchResultDisplay(searchResult)
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