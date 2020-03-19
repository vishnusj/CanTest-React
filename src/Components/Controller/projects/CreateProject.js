import React, { Component } from 'react'
import { createProject } from '../../../store/actions/projectActions';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import axios from 'axios';
import { storage } from '../../../config/fbConfig';
import { firestoreConnect } from "react-redux-firebase";
import ProjectDetails from './ProjectDetails';
import firebase from 'firebase';
let doctorName = null;
let docLocation = null;

class CreateProject extends Component {

    constructor(props) {

        super(props);
        
        this.state = {
            image: null,
            url: '',
            location: null,
            title: '',
            content: '',
            doctor: null

        }

        this.handleChange = this
            .handleChange
            .bind(this);
        this.handleUpload = this.handleUpload.bind(this);
    }

    // Doctor List Generation
    async componentDidMount() {
        const fsDB = firebase.firestore();
        await fsDB.collection("doctors").get().then(function (querySnapshot) {
            
            querySnapshot.forEach(function (doc) {
                console.log(doc.id, ' => ', doc.data());
                doctorName = doc.id;
                docLocation = doc.data().location;
                console.log("Doctor List: " + docLocation);
            });


        });

    }




    handleLocation = (e) => {
        e.preventDefault();
        console.log("Location: " + e.target.value);
        this.setState({ location: e.target.value });

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
                });


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
                        <select className="dropdown-trigger btn z-depth-0" onChange={this.handleLocation}>
                            <option selected value="regina">Regina</option>
                            <option value="saskatoon">Saskatoon</option>
                            <option value="calgary">Calgary</option>
                            <option value="edmonton">Edmonton</option>
                        </select>

                    </div>


                    <div className="input-field">
                        <select className="dropdown-trigger btn z-depth-0" onChange={this.handleDoctorchange}>
                            <option selected value="regina">Regina</option>
                            <option value="saskatoon">Saskatoon</option>
                            <option value="calgary">Calgary</option>
                            <option value="edmonton">Edmonton</option>
                        </select>

                    </div>

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
        auth: state.firebase.auth,

    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        createProject: (project) => dispatch(createProject(project))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);
