import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from './../../AuthContext.js'
import axios from 'axios';
import ReportedRecog from './ReportedRecog/ReportedRecog.js'
import './AdminDashboard.css';

function AdminDashboard({ rID }) {
    const [reportedRecogs, setReportedRecogs] = useState([]);
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
        <div className='adminDashboard-main-container'>
            <h1 style={{ fontSize: '20pt' }}>Administration Dashboard</h1>
            {
                reportedRecogs.map((recog) => {
                    return <ReportedRecog rID={recog.rid} recognizer={recog.uid_from} recognizee={recog.uid_to} recognition={recog.comments} />;
                })
            }
        </div>
    );
}

export default AdminDashboard;