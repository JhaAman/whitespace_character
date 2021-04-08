import { TopMenu, Header } from './Components.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import React, { useState, useContext } from 'react';
import { AuthenticationContext } from './AuthContext.js';

function UploadData() {
    ////when I set input type to File in line 29, clicking the button only crashes the page.
    return (
        <div className="App">
            <TopMenu/>
            <header className="body">
            <h3 className="App-title">Administrator Upload Page</h3>
            <br/> <br/> <br/> <br/> <br/>
            <div style={{textAlign: 'center'}}>
            <Popup trigger={<button>Upload JSON Data</button>} position="center">
                <form>
                    <div class="uploadbox">
                        <label>
                            <textarea rows="3" columns="20" placeholder="employee data" class="upload-input"/>
                        </label>
                        <br/>
                        <label>
                            <textarea rows="3" columns="20" placeholder="company values" class="upload-input"/>
                        </label>
                        <br/>
                        <input type="Submit" value="submit" class="upload-button"/>
                    </div>
                </form>
            </Popup>
            </div>
            </header>
        </div>
    );
}

//this version of UploadData function is modelled after the login function and involves a lot more backend details. 
//A lot of its detials are commented out because I'm not sure of the backend implementation.
//To use it, change export statement at the end of this file to export default UploadData2.
function UploadData2() {
    const [employee, setEmployee] = useState("");
    const [company, setCompany] = useState("");
    //const value = useContext(AuthenticationContext);

    function validate() {
        return employee.length > 0 && company.length > 0;
    }

    const submit = (e) => {
        e.preventDefault()
        //below, fill in URL for database
        // axios.post("http://localhost:8000/api/", { 
        //     employee: employee,
        //     company: company
        // }, {
    //         validateStatus: false
    //     }).then((res) => {
    //         console.log(res);
    //         if (res.status === 200) {
    //             value.setAuthenticationState({ token: res.data.access, employeeInfo: { employeeID: res.data.employee_id, employee: employee, company: company, role: 'employee' } })
    //         }
    //     }).catch((err) => {
    //         console.log(err);
    //     })
    }

    return (
        <div className="app">
            <Header/>
            <div className="body">
                <form onSubmit={submit}>
                    <br/>
                    <br/>
                    <label>
                        <div className='uploadinput rounded'>
                            <input
                                type="text"
                                placeholder="employee"
                                //value={employee}
                                //onChange={e => setEmployee(e.target.value)}
                                class="uploadinput"
                            />
                        </div>
                    </label>
                    <br/>
                    <label>
                        <input
                            type="company"
                            placeholder="company"
                            //value={company}
                            //onChange={e=>setCompany(e.target.value)}
                            class="uploadinput"
                        />
                    </label>
                    <br/>
                    <input type="File" value="" hidden={!validate()} class="upload-button"/>
                </form>
            </div>
        </div>
    );
}

export default UploadData;