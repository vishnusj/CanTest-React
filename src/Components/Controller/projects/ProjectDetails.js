import React, { Component } from 'react'
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import moment from 'moment';
import axios from 'axios';


class ProjectDetails extends Component {
    state = {
        post: []
    }

    componentDidMount() {
        axios.get('https://www.postman.com/collections/4c7f23e2b95cbe06e804')
            .then((res) => {
                console.log(res);
                this.setState({
                    
                })
            })
    }


    handleChange = () => {
        console.log("POST:" + this.post)

    }

    render() {


        const { project, auth } = this.props;
        const { post } = this.state;

        const postList = post.length ? (
            post.map(post => {
                return (
                    <div className="post card" key={post.id}>
                        <div className="card-content">
                            <span className="card-title">{post.title}</span>
                            <p>{post.body}</p>
                        </div>
                    </div>
                )
            })
        ) : (
                <div className="center">No Posts</div>
            )



        if (!auth.uid) return <Redirect to='/signin' />

        if (project) {

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
                            {postList}
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
