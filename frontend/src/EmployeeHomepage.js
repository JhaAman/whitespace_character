import React from 'react';
import { Recognition, TopMenu } from './Components.js';
//import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import ManagerComp from './ManagerComponent.js';
function EmployeeHomepage() {

    return (
       
        <div className="app">
            <TopMenu/>
            <div className="body">
                <div className="row">
                    <div className='left-column'>
                        <Recognition recipient="Reginald" recognizer="Gwen" message="Everyone is raving about your work on pantelic aristism."/>
                        <Recognition recipient="Edith" recognizer="Lancelot" message="I love your ideative reification!"/>
                        <Recognition recipient="Millard" recognizer="Eleanor" message="2τ/10 withstandingship at the weekly witenagemot"/>
                    </div>
                    <div className='right-column'>
                        <div className='infobox rounded'>
                            <br></br>
                            <b><i><div style={{fontSize:30}}>This month’s hero:</div></i></b>
                            Charles Martel
                            <br></br><br></br>
                            [other statistics can go here]
                            <br></br>
                            <br></br>
                            <br></br>
                        </div>
                        <div className='infobox rounded'>
                            <ManagerComp/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
     
    );
}

export default EmployeeHomepage;