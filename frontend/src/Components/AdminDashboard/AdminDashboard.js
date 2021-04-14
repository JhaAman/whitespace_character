import React, { useState, useContext } from 'react';
import { AuthContext } from './../../AuthContext.js'
import axios from 'axios';
import ReportedRecog from './ReportedRecog/ReportedRecog.js'
import './AdminDashboard.css';

function AdminDashboard({rID}) {
    const [ reportedRecogs, setReportedRecogs ] = useState([{
        rid: '1',
        recognizer: 'Gary Szekely',
        recognizee: 'Mike Li',
        recognition: 'Cool job.'
    }])
    const context = useContext(AuthContext);

    axios.get("", {

    }, {
        headers: {
            "Authorization": "Bearer " + context.token
        }
    }).then((res) => {
        console.log(res);
        setReportedRecogs();
    }).catch((err) => {
        console.log(err);
    })
    return (
        <div className='adminDashboard-main-container'>
            <h1 style={{fontSize: '20pt'}}>Administration Dashboard</h1>
            {
                reportedRecogs.map((recog) => {
                    return <ReportedRecog rID={recog.rid} recognizer={recog.recognizer} recognizee={recog.recognizee} recognition={recog.recognition} />;
                })
            }
        </div>
    )
}

export default AdminDashboard;