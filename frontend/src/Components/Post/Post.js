
import React, { useState } from 'react';

import './Post.css'

function Post() {
    return (
    <div style = {{width: "300px"}}>
      <input
        style={{ width:"300px" }}
        type = "text"
        placeholder = "name"
      ></input>
      <br></br>
      <input 
        style={{ width:"300px" }}
        type = "text"
        placeholder = "subject"
      ></input>
      <br></br>
      <input 
        style={{ width:"300px", height: "100px" }}
        type = "text"
        placeholder = "body"
      ></input>
      <br></br>
      <div style = {{
        justifyContent: 'space-evenly',
        flex: 1,
        flexDirection: "row",
        width: "300px",
        padding: '10',
      }}>
        <button>pillar</button>
        <button>pillar</button>
        <button>pillar</button>
        <button>pillar</button>
        <button>pillar</button>
        <button>submit</button>
      </div>
    </div>
  );
}

export default Post;