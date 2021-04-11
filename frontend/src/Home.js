import React from 'react';
import { Recognition, TopMenu, Rockstar } from './Components.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css'

function EmployeeHomepage() {
    const rockstarsArray = [{value: 'Communications', firstName: 'Gary', lastName: 'Szekely'}, {value: 'Hard-Working', firstName: 'Reuben', lastName: 'Philip'}, {value: 'Inclusive', firstName: 'Khang', lastName: 'Nguyen'}]

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
                        <div class="rounded infobox">
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