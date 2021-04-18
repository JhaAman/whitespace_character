import React, { useContext, useEffect } from 'react';
import FeedRecognition from './Components/FeedRecognition/FeedRecognition.js';
import SubmitRecog from './Components/SubmitRecog/SubmitRecog.js';
import { Recognition, TopMenu, Rockstar } from './Components.js';
import { AuthContext } from './AuthContext.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import ManagerComp from './ManagerComponent.js';
function EmployeeHomepage() {
    const context = useContext(AuthContext);

    const rockstarsArray = [{value: 'Communications', firstName: 'Gary', lastName: 'Szekely'}, {value: 'Hard-Working', firstName: 'Reuben', lastName: 'Philip'}, {value: 'Inclusive', firstName: 'Khang', lastName: 'Nguyen'}]

    let recogArray =[
        {recognizer: {firstName: 'Gary', lastName: 'Szekely'}, recognizee: {firstName: 'Reuben', lastName: 'Philip'}, comment: 'hk fk hksadhfk has khasgkjhas  gkshgkjlsd kjhgk afgs khjgk hasgf  jaklshg kajshfg aksjhfg kjahsfg kjadshk jg hgh sfk kj sgkhd kjsh kgj kshdfg kjhsdk kshdf kgjh fs kj dskfgh'},
        {recognizer: {firstName: 'Gary', lastName: 'Szekely'}, recognizee: {firstName: 'Reuben', lastName: 'Philip'}, comment: 'hk fk hksadhfk has khasgkjhas  gkshgkjlsd kjhgk afgs khjgk hasgf  jaklshg kajshfg aksjhfg kjahsfg kjadshk jg hgh sfk kj sgkhd kjsh kgj kshdfg kjhsdk kshdf kgjh fs kj dskfgh'},
        {recognizer: {firstName: 'Gary', lastName: 'Szekely'}, recognizee: {firstName: 'Reuben', lastName: 'Philip'}, comment: 'hk fk hksadhfk has khasgkjhas  gkshgkjlsd kjhgk afgs khjgk hasgf  jaklshg kajshfg aksjhfg kjahsfg kjadshk jg hgh sfk kj sgkhd kjsh kgj kshdfg kjhsdk kshdf kgjh fs kj dskfgh'},
        {recognizer: {firstName: 'Gary', lastName: 'Szekely'}, recognizee: {firstName: 'Reuben', lastName: 'Philip'}, comment: 'hk fk hksadhfk has khasgkjhas  gkshgkjlsd kjhgk afgs khjgk hasgf  jaklshg kajshfg aksjhfg kjahsfg kjadshk jg hgh sfk kj sgkhd kjsh kgj kshdfg kjhsdk kshdf kgjh fs kj dskfgh'}
    ]

    useEffect(() => {
        axios.get("", {
            params: {

            },
            headers: {
                "Authorization": "Bearer " + context.token
            }
        }).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })
    }, []);
    return (
        <div className="app">
            <TopMenu/>
            <div className="body">
                <div className="row">
                    <div className='left-column'>
                        <SubmitRecog />
                        <div style={{width: '100%', marginBottom: '10px', height: '10px', borderBottom: '2px dashed white'}} />
                        {
                            recogArray.map((e) => {
                                return (<FeedRecognition recognizer={e.recognizer} recognizee={e.recognizee} comment={e.comment} />);
                            })
                        }
                    </div>
                    <div className='right-column'>
                        <div className='autoinfobox rounded' style={{height:'auto'}}>
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