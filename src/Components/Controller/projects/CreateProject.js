import React, { Component } from 'react'
import { createProject } from '../../../store/actions/projectActions';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import axios from 'axios';
import { storage } from '../../../config/fbConfig';


class ImageUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            url: '',
            progress: 0
        }
        this.handleChange = this
            .handleChange
            .bind(this);
        this.handleUpload = this.handleUpload.bind(this);
    }

    getURL = () => {
        return this.url;
    }

    handleChange = e => {
        e.preventDefault();
        console.log("HITT");
        if (e.target.files[0]) {
            const image = e.target.files[0];
            this.setState(() => ({ image }));
        }
    }

    handleUpload = (e) => {
        e.preventDefault();
        const { image } = this.state;
        const uploadTask = storage.ref(`gs://imageupload-9a880.appspot.com/${image.name}`).put(image);
        uploadTask.on('state_changed',
            (snapshot) => {
                // progrss function ....
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                this.setState({ progress });
            },
            (error) => {
                // error function ....
                console.log(error);
            },
            () => {
                // complete function ....
                storage.ref('images').child(image.name).getDownloadURL().then(url => {
                    console.log("HIT" + url);
                    this.setState({ url });

                })
            });
    }
}

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

    /*
        fileSelectedHandler = event => {
            console.log(event.target.files[0]);
            this.setState({
                selectedFile: event.target.files[0]
            });
        }
        fileUploadHandler = () => {
            const fd = new FormData();
            fd.append('image', this.state.selectedFile, this.state.selectedFile.name);
            axios.post('https://us-central1-imageupload-9a880.cloudfunctions.net/uploadFile', fd, {
                onUploadProgress: progressEvent => {
                    console.log('UploadProgress: ' + Math.round((progressEvent.loaded / progressEvent.total) * 100) + '%')
                }
            })
                .then(res => {
                    console.log(res);
                });
        }
    
    */


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
            //this.setState({
            //this.image: image
            //});
        }

    }
    handleUpload = (e) => {
        e.preventDefault();

        /* const { image } = this.state.image;
 
        // console.log("State"+this.state.image.name);
         const uploadTask = storage.ref(`images/${image.name}`).put(image);
         uploadTask.on('state_changed',
             (snapshot) => {
                 // progrss function ....
                 const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                 this.setState({ progress });
             },
             (error) => {
                 // error function ....
                 console.log(error);
             },
             () => {
                 // complete function ....
                 storage.ref('images').child(image.name).getDownloadURL().then(url => {
                     console.log("HIT" + url);
                     this.setState({ url });
 
                 })
             });
 
             */

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
                    console.log("HIT" + url);
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
