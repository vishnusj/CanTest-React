import React from 'react';
import ProjectList from './ProjectList';
import moment from 'moment';
import { getFirebase } from 'react-redux-firebase'
import firebase from 'firebase';

const ProjectSummary = ({ project }) => {
   // firebase.auth().onAuthStateChanged(function (user) {
     //   if (project.authorId == user.uid) {
       //     console.log("Project Author:"+project.authorId);

            return (

                <div className="card z-depth-0 project-summary">
                    <div className="card-content grey-text text-darken-3">
                        <span className="card-title">{project.title}</span>
                        <p>Posted by {project.authorFirstName} {project.authorLastName}</p>
                        <p className="grey-text">{moment(project.createdAt.toDate()).calendar()}</p>
                    </div>
                </div>

            );
    //    }
        //return null
   // });
}

export default ProjectSummary;