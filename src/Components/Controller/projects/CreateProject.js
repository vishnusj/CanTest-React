import React, { Component } from 'react'
import { createProject } from '../../../store/actions/projectActions';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import axios from 'axios';
import { storage } from '../../../config/fbConfig';
import ProjectDetails from './ProjectDetails';


class CreateProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            url: '',
            
            title: '',
            content: '',
            //selectedFile: null
        }

        this.handleChange = this
            .handleChange
            .bind(this);
        this.handleUpload = this.handleUpload.bind(this);
    }

    


    handleChange = (e) => {
        console.log("HITT");


        this.setState({
            [e.target.id]: e.target.value

        });



    }

    handleImageChange = e => {

        if (e.target.files[0]) {
            console.log("hitt Image");
            const image = e.target.files[0];
            this.setState(() => ({ image }));
            
        }

    }
    handleUpload = (e) => {
        e.preventDefault();

        

        const fd = new FormData();
        fd.append('image', this.state.image, this.state.image.name);
        axios.post('https://us-central1-imageupload-9a880.cloudfunctions.net/uploadFile', fd, {
            onUploadProgress: progressEvent => {
                console.log('UploadProgress: ' + Math.round((progressEvent.loaded / progressEvent.total) * 100) + '%')
            }
        })
            .then(res => {
                storage.ref().child(this.state.image.name).getDownloadURL().then(url => {
                   
                    this.setState({
                        url: url,
                        image: null
                    });
                   // console.log("HIT" + url);
            }).then(() => {
                console.log("HIT State");
            console.log(this.state);
            this.props.createProject(this.state);
            this.props.history.push('/');
            } );

            
        });

       

    }





    render() {
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/signin' />

        return (


            <div className="conatiner">


                <form onSubmit={this.handleUpload} className="white">
                    <h5 className="grey-text text-darken-3">Create New Project</h5>

                    <div className="input-field">
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="content">Project Content</label>
                        <textarea id="content" className="materialize-textarea" onChange={this.handleChange} />
                    </div>

                    <input type="file" onChange={this.handleImageChange} />



                    <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-0" >Create</button>
                    </div>
                </form>
            </div>
        )
    }
}




const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        createProject: (project) => dispatch(createProject(project))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);
