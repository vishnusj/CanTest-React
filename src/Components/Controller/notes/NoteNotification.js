import React from 'react';
import moment from 'moment';
import firebase from 'firebase';

const NoteNotifications = (props) => {
    const { notifications } = props;
    return (
        <div className="section">
            <div className="card z-depth-0">
                <div className="card-content">
                    <span className="card-title">Last Note:</span>
                    <ul className="notifications">
                        {notifications && notifications.map(item => {
                            let useruser = firebase.auth().currentUser;

                            if (item.content == 'has a new Note') {

                                if (item.project == window.location.href.substr(window.location.href.lastIndexOf('/') + 1)) {



                                    return (

                                        <div className="card-panel cyan lighten-4">
                                            <li key={item.id}>

                                                <span className="black-text">{item.user} </span>
                                                <span> added the last note {moment(item.time.toDate()).fromNow()}</span>
                                                
                                                <p className="blck-text">Wrote : <span></span>
                                                <span className="black-text">{item.noteTitle}: {item.noteContent} </span></p>
                                                
                                            </li>
                                        </div>

                                    )
                                }

                            }

                        })}
                    </ul>
                </div>
            </div>

        </div>
    );
}

export default NoteNotifications;