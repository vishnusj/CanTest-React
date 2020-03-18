import React, { Component } from 'react'
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import moment from 'moment';
import axios from 'axios';
const cors = require('cors')({ origin: true });
let projectdetails = null;
var myHeaders = new Headers();

class ProjectDetails extends Component {
    constructor() {
        super();

        let userName = null;
        let id = null;
        let createdAt = null;

    }



    handleChange = () => {

        myHeaders.append("Content-Type", "multipart/form-data; boundary=--------------------------801099460826516726188717");
        var formdata = new FormData();
        formdata.append("image-url", projectdetails.url);
        formdata.append("user-id", "batman");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch("https://flask-sc-2qevsxcoxq-uc.a.run.app/skin-cancer/get-prediction", requestOptions)
            .then(response => response.text())
            .then(result => console.log("This is the result: " + result))
            .catch(error => console.log('error', error));

        /*
        
                console.log("POST:" + projectdetails.url +" "+projectdetails.authorId)
                let params = {
                    "image-url": projectdetails.url,
                    "user-id": projectdetails.authorId
                }
                axios.post("https://reqres.in/api/users", params)
                    .then(function (res) {
                        console.log("API Return: " + JSON.stringify(res.data, null, '\t'));
                        let jsonObject = JSON.parse(JSON.stringify(res.data, null, '\t'));
                        
                    })
                    .catch(function (error) {
                        console.log("API Error: " + error);
                    })
        */
    }

    render() {


        const { project, auth } = this.props;
        //const { post } = this.state;





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

                            <img className="materialboxed" width="650" src={project.url} />

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
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'projects' }
    ])

)(ProjectDetails)
