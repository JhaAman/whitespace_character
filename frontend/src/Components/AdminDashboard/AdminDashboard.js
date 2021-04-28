import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from './../../AuthContext.js'
import axios from 'axios';
import ReportedRecog from './ReportedRecog/ReportedRecog.js'
import './AdminDashboard.css';

function AdminDashboard({ rID , hidden}) {
    const [ reportedRecogs, setReportedRecogs ] = useState([]);
    const context = useContext(AuthContext);

    const onStartup = () => {
        axios.get("http://127.0.0.1:8000/api/get_reported_recognitions/", {
            headers: {
                "Authorization": "Bearer " + context.token
            }
        }).then((res) => {
            console.log(res);
            setReportedRecogs(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(onStartup, []);

    return (
        reportedRecogs.length === 0 ? '' : (
            <div className='adminDashboard-main-container' hidden={hidden}>
                <h1 style={{ fontSize: '20pt', margin: 0}}>Reported Recogntions</h1>
                {
                    reportedRecogs.map((recog) => {
                        return <ReportedRecog rid={recog.rid} uidFrom={recog.uid_from} uidTo={recog.uid_to} comments={recog.comments} />;
                    })
                }
            </div>)
    );
}

export default AdminDashboard;