import React, { Component } from 'react'
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import moment from 'moment';
import DoctorList from '../doctor/doctorList';
let projectdetails = null;

class ProjectDetails extends Component {
    constructor() {
        super();



    }


    
    handleChange = () => {
        console.log(projectdetails.authorId);

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = false;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log("this is the response: " + this.responseText);
            }
        });

        xhr.open("GET", "https://flask-sc-2qevsxcoxq-uc.a.run.app/skin-cancer/get-prediction?image-url=" + projectdetails.url + "&user-id=" + projectdetails.url);

        xhr.send();



    }

    render() {


        const { project, auth } = this.props;

        if (!auth.uid) return <Redirect to='/signin' />

        if (project) {
            projectdetails = project;

            return (


                <div className="container section project-details">
                    <div className="card z-depth-0">
                        <div className="card-content">
                            <span className="card-title">{project.title}</span>
                            <p>{project.content}</p>
                        </div>
                        <div className="card-action gret lighten-4 grey-text">
                            <div>Posted by {project.authorFirstName} {project.authorLastName}</div>
                            <div>{moment(project.createdAt.toDate()).calendar()}</div>
                            <fieldset>
                                <img className="materialboxed" width="300" src={project.url} />
                            </fieldset>
                            <div>

                            </div>
                        </div>
                        

                        <div className="input-field">
                            <button className="btn pink darken-1 z-depth-0" onClick={this.handleChange} >Check Up</button>
                        </div>
                    </div>
                </div>

            )
        }
        return (
            <div className="container">
                <p>Loading Project...</p>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
   
    const projects = state.firestore.data.projects;
    const project = projects ? projects[id] : null;
    
    return {
        project: project,
        auth: state.firebase.auth,
        

    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'projects' },
        
    ])

)(ProjectDetails)
