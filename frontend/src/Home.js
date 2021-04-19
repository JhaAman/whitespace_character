import React, { useState, useContext, useEffect } from 'react';
import { Recognition, TopMenu, Rockstar } from './Components.js';
import profilepic from './pics/arnold.jpg';
import profilepic2 from './pics/regina.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css'
import './App.css'
import ManagerComp from './ManagerComponent.js';
import { AuthenticationContext } from './AuthContext.js';
function EmployeeHomepage() {
    const rockstarsArray = [{value: 'Communications', firstName: 'Gary', lastName: 'Szekely'}, {value: 'Hard-Working', firstName: 'Reuben', lastName: 'Philip'}, {value: 'Inclusive', firstName: 'Khang', lastName: 'Nguyen'}]
    const value = useContext(AuthenticationContext);
    return (
       
        <div className="app">
            <TopMenu/>
            <div className="body">
                <div className="row">
                    <div className='left-column'>
                        <Recognition recognizerpicture={profilepic2} recipientpicture={profilepic} recipient="Reginald" recognizer="Gwen" message="Everyone is raving about your work on pantelic aristism."/>
                        <Recognition recognizerpicture={profilepic} recipientpicture={profilepic2} recipient="Edith" recognizer="Lancelot" message="I love your ideative reification!"/>
                        <Recognition recognizerpicture={profilepic2} recipientpicture={profilepic} recipient="Millard" recognizer="Eleanor" message="2τ/10 withstandingship at the weekly witenagemot"/>
                    </div>
                    <div className='right-column'>
                        <div className='autoinfobox rounded' style={{height:'auto'}} hidden={value.authenticationState.userInfo.role!=="mng"}>
                            <ManagerComp/>
                        </div>
                        <div className='infobox rounded'>
                            {
                                rockstarsArray.map((e) => {
                                    return (<Rockstar value={e.value} firstName={e.firstName} lastName={e.lastName} />);
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