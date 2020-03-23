import React from 'react';
import moment from 'moment';
import firebase from 'firebase';

const Notifications = (props) => {
    const { notifications } = props;
    return (
        <div className="section">
            
            <div className="card z-depth-0">
                <div className="card-content">
                    <span className="card-title">Notifications</span>
                    <ul className="notifications">
                        {notifications && notifications.map(item => {
                            let useruser = firebase.auth().currentUser;
                            console.log("Diff " + item.doctor + " " + useruser.uid);


                            if (item.userId == useruser.uid) {
                                console.log("SAME " + item.doctor + " " + useruser.uid);
                                return (
                                    <div className="card-panel red accent-1">
                                    <li key={item.id}>
                                        <span className="black-text">{item.user} </span>
                                        <span className="black-text">{item.content}</span>
                                        <div className="grey-text note-date">
                                            {moment(item.time.toDate()).fromNow()}
                                        </div>
                                    </li>
                                    </div>

                                )
                            }

                            if (item.doctorId == useruser.uid) {
                                console.log("SAME " + item.doctor + " " + useruser.uid);
                                return (
                                    <li key={item.id}>
                                        <span className="pink-text">{item.user} </span>
                                        <span>{item.content}</span>
                                        <div className="grey-text note-date">
                                            {moment(item.time.toDate()).fromNow()}
                                        </div>
                                    </li>

                                )
                            }



                        })}
                    </ul>
                </div>
            </div>
        
        </div >
    );
}

export default Notifications;