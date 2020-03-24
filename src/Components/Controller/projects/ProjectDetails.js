import React, { Component } from 'react'
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import moment from 'moment';
import { Link } from 'react-router-dom';
import NoteNotification from '../notes/NoteNotification';
import ProjectDetailsInterface from './ProjectDetailsInterface';

class ProjectDetails extends ProjectDetailsInterface {
   

    colourChange = (e) => {
        let colour = document.getElementById("result");
        console.log("Value: "+this.value);
        if (this.value == 'malignant') {
            colour.className = "card-panel orange lighten-4";
        }
    }

    
    render() {


        const { project, auth, notifications } = this.props;

        if (!auth.uid) return <Redirect to='/signin' />

        if (project) {

           
            this.value = project.prediction;
            if (this.value == 'malignant') {
                this.color = "card-panel red accent-1";
            }
            else{
                this.color = "card-panel green lighten-4";
            }



            return (


                <div className="container section project-details">

                    <div className="card z-depth-0">
                        <div className="card-content">
                            <div className="card-panel cyan lighten-4">
                                <span className="card-title">Title: {project.title}</span>
                                <p>{project.content}</p>
                            </div>
                        </div>
                        <div className="card-content">

                            <div className={this.color} >
                                <span className="card-title">Test Results</span>
                                <p>Prediction Made: <b>{project.prediction.toUpperCase()}</b></p>
                                <p>Accuracy:  <b>{project.accuracy}</b></p>
                            </div>
                        </div>

                        <NoteNotification notifications={notifications} />

                        <div className="card-content">
                            <div className="card-panel cyan lighten-4">

                                <button className="btn black lighten-1 z-depth-0"><Link to={{
                                    pathname: '/createnote',
                                    aboutProps: {
                                        id: window.location.href
                                    }
                                }} >Add Note</Link></button>

                                <span>  </span>

                                <button className="btn black lighten-1 z-depth-0"><Link to={{
                                    pathname: '/notedashboard',
                                    aboutProps: {
                                        id: window.location.href
                                    }
                                }} >View Notes</Link></button>

                            </div>
                        </div>



                        <div className="card-action gret lighten-4 grey-text">
                            <div className="card-panel green lighten-4">
                                <div className="black-text text-darken-2">Posted by {project.authorFirstName} {project.authorLastName}</div>
                                <div>{moment(project.createdAt.toDate()).calendar()}</div>
                                <div>{project.location}</div>
                            </div>

                        </div>
                        <fieldset>
                            Image
                                <img className="materialboxed" width="300" src={project.url} />
                        </fieldset>



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
        notifications: state.firestore.ordered.notifications


    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'projects' },
        { collection: 'notifications', limit: 3, orderBy: ['time', 'desc'] }

    ]),

)(ProjectDetails)
