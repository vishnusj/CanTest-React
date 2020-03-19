import React from 'react';
import ProjectSummary from './ProjectSummary';
import { Link } from 'react-router-dom';
import firebase from 'firebase';


function wait(ms) {
    var d = new Date();
    let d2 = null;
    do {
        d2 = new Date();
    }
    while (d2 - d < ms);
}

let doctorId = null;
let one = 0;
async function getDoc() {
one = 1;
    const fsDB = firebase.firestore();
    await fsDB.collection("doctors").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            console.log(doc.id, ' => ', doc.data());
            doctorId = doc.id;

        });


    });

}







const ProjectList = ({ projects }) => {
    // Doctor List Generation
if(one == 0)
    getDoc();
    
    return (

       
        <div className="project-list section">
            {projects && projects.map(project => {

                let useruser = firebase.auth().currentUser;




                if (project.authorId == useruser.uid) { //wait(4000)
                    console.log("user List 1: " + useruser.uid);
                    console.log("Doctor List 1: " + doctorId);
                    //console.log("SAME "+project.authorId+" "+useruser.uid);
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

