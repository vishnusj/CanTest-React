import React from 'react';
import ProjectList from './ProjectList';
import moment from 'moment';
import { getFirebase } from 'react-redux-firebase'
import firebase from 'firebase';

const ProjectSummary = ({ project }) => {

    return (
       
            
                <div className="card-content grey-text text-darken-3">
                    <div className="card-panel purple lighten-5">
                        <span className="card-title">{project.title}</span>
                        <p>Posted by {project.authorFirstName} {project.authorLastName}</p>
                        <p className="grey-text">{moment(project.createdAt.toDate()).calendar()}</p>
                    </div>
                </div>
            
           
    );

}

export default ProjectSummary;