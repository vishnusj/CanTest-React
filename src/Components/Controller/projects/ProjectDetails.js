import React, { Component } from 'react'
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import moment from 'moment';

let projectdetails = null;

class ProjectDetails extends Component {
    constructor() {
        super();



    }




    render() {


        const { project, auth } = this.props;

        if (!auth.uid) return <Redirect to='/signin' />
        
        if (project) {
            projectdetails = project;
            console.log(project.prediction);
            return (


                <div className="container section project-details">
                    <div className="card z-depth-0">
                        <div className="card-content">
                            <span className="card-title">Title: {project.title}</span>
                            <p>{project.content}</p>
                        </div>
                        <div className="card-content">
                            <span className="card-title">Test Results</span>
                            <p>Prediction Made: {project.prediction}</p>
                            <p>Accuracy: {project.accuracy}</p>
                        </div>
                        
                        <div className="card-content">
                            <div className="input-field">
                                <label htmlFor="title">Notes</label>
                                <input type="text" id="notes" onChange={this.handleChange} />
                            </div>
                        </div>


                        <div className="card-action gret lighten-4 grey-text">
                            <div>Posted by {project.authorFirstName} {project.authorLastName}</div>
                            <div>{moment(project.createdAt.toDate()).calendar()}</div>
                            <div>{project.location}</div>



                            <fieldset>
                                Image
                                <img className="materialboxed" width="300" src={project.url} />
                            </fieldset>

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
