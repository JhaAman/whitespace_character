import React from 'react';
import { TopMenu } from './Components.js';
import Recognition from './Components/Recognition/Recognition.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function EmployeeHomepage() {

    let recogArray =[
        {recognizer: {firstName: 'Gary', lastName: 'Szekely'}, recognizee: {firstName: 'Reuben', lastName: 'Philip'}, comment: 'hk fk hksadhfk has khasgkjhas  gkshgkjlsd kjhgk afgs khjgk hasgf  jaklshg kajshfg aksjhfg kjahsfg kjadshk jg hgh sfk kj sgkhd kjsh kgj kshdfg kjhsdk kshdf kgjh fs kj dskfgh'},
        {recognizer: {firstName: 'Gary', lastName: 'Szekely'}, recognizee: {firstName: 'Reuben', lastName: 'Philip'}, comment: 'hk fk hksadhfk has khasgkjhas  gkshgkjlsd kjhgk afgs khjgk hasgf  jaklshg kajshfg aksjhfg kjahsfg kjadshk jg hgh sfk kj sgkhd kjsh kgj kshdfg kjhsdk kshdf kgjh fs kj dskfgh'},
        {recognizer: {firstName: 'Gary', lastName: 'Szekely'}, recognizee: {firstName: 'Reuben', lastName: 'Philip'}, comment: 'hk fk hksadhfk has khasgkjhas  gkshgkjlsd kjhgk afgs khjgk hasgf  jaklshg kajshfg aksjhfg kjahsfg kjadshk jg hgh sfk kj sgkhd kjsh kgj kshdfg kjhsdk kshdf kgjh fs kj dskfgh'},
        {recognizer: {firstName: 'Gary', lastName: 'Szekely'}, recognizee: {firstName: 'Reuben', lastName: 'Philip'}, comment: 'hk fk hksadhfk has khasgkjhas  gkshgkjlsd kjhgk afgs khjgk hasgf  jaklshg kajshfg aksjhfg kjahsfg kjadshk jg hgh sfk kj sgkhd kjsh kgj kshdfg kjhsdk kshdf kgjh fs kj dskfgh'}
    ]
    return (
        <div className="app">
            <TopMenu/>
            <div class="body">
                <div class="row">
                    <div className='left-column'>
                        {
                            recogArray.map((e) => {
                                return (<Recognition recognizer={e.recognizer} recognizee={e.recognizee} comment={e.comment} />);
                            })
                        }
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
                    </div>
                </div>
            </div>
        </div>
        
     
    );
}

export default EmployeeHomepage;