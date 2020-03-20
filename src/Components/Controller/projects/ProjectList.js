import React from 'react';
import ProjectSummary from './ProjectSummary';
import { Link } from 'react-router-dom';
import firebase from 'firebase';






const ProjectList = ({ projects }) => {
   // getDoc();

    return (


        <div className="project-list section">
            {projects && projects.map(project => {

                let useruser = firebase.auth().currentUser;

                if (project.authorId == useruser.uid || project.doctor == useruser.uid) {
                    
                   
                    return (

                        <Link to={'/project/' + project.id} key={project.id} >
                            <ProjectSummary project={project} />
                        </Link>

                    );
                }




            })}
        </div>


    );
}


export default ProjectList;

