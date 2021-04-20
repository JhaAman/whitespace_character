import React, { useState, useContext, useEffect } from 'react';
import Rockstar from './Components/Rockstar/Rockstar.js';
import { AuthContext } from './AuthContext.js';
import { Recognition, TopMenu } from './Components.js';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function EmployeeHomepage() {
    const context = useContext(AuthContext);
    const [ rockstarValues, setRockstarValues ] = useState([]);
    const [ rockstars , setRockstars ] = useState({})

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/get_rockstars/", {
            params: {
                "uid": context.uid
            },
            headers: {
                "Authorization": "Bearer " + context.token
            }
        }).then((res) => {
            console.log(res);
            setRockstarValues(res.data[0]["values"])
            setRockstars(res.data[1])
        }).catch((err) => {
            setRockstarValues([
                "MVP",
                "Innovation",
                "Friendliness",
                "Communication"
            ]);
            setRockstars({
                "MVP": "Gary Szekeky",
                "Innovation": "Khang Nguyen",
                "Friendliness": "Reuben Philip",
                "Communication": "Mike Li"
            })
            console.log(err);
        });
    }, []);

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
                            {
                                rockstarValues.map((e) => {
                                    return (<Rockstar value={e} name={rockstars[e]} />);
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