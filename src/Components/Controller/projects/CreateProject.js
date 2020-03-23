import React, { Component } from 'react'
import { createProject } from '../../../store/actions/projectActions';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import axios from 'axios';
import { storage } from '../../../config/fbConfig';
import firebase from 'firebase';

//Globals
let doctorName = [];
let docLocation = [];
let doctorId = [];
let responseObj = null;

class CreateProject extends Component {

    constructor(props) {


        super(props);

        this.state = {
            image: null,
            url: '',
            location: null,
            title: '',
            content: '',
            doctor: null,
            accuracy: null,
            prediction: null

        }

        this.handleChange = this
            .handleChange
            .bind(this);
        this.handleUpload = this.handleUpload.bind(this);

        // preserve the initial state in a new object
        this.baseState = this.state;
    }



    // Doctor List Generation
    async componentDidMount() {
        document.getElementById("progress").style.display = "none";
        document.getElementById("createButton").style.display = "none";
        const fsDB = firebase.firestore();
        await fsDB.collection("doctorsList").get().then(function (querySnapshot) {
            let i = 0;
            querySnapshot.forEach(function (doc) {
                console.log("i: " + i);
                doctorName[i] = doc.data().firstName + " " + doc.data().lastName;
                docLocation[i] = doc.data().location;
                doctorId[i] = doc.id;
                console.log("iDoc: " + doctorId[i]);
                i = i + 1;

            });


        });

    }




    handleLocation = (e) => {
        e.preventDefault();

        this.setState({ location: e.target.value });
        console.log("Location: " + e.target.value);


        document.getElementById("second-choice").options.length = 0;
        document.getElementById("second-choice").options[0] = new Option("Please Choose the Doctor", null);
        let j = 1;
        for (let i = 0; i < doctorName.length; i++) {

            if (docLocation[i] == e.target.value) {

                document.getElementById("second-choice").options[j] = new Option("Dr. " + doctorName[i], doctorId[i], false, false);
                j = j + 1;


            }
            else {

            }

        }


    }

    handledoctorChange = (e) => {
        e.preventDefault();
        //console.log("Doctor: " + e.target.value);
        this.setState({ doctor: e.target.value });

    }

    handleChange = (e) => {
        // console.log("HITT");


        this.setState({
            [e.target.id]: e.target.value

        });



    }

    handleImageChange = (e) => {

        if (e.target.files[0]) {
            // console.log("hitt Image");
            const image = e.target.files[0];
            this.setState(() => ({ image }));

        }

    }

    handleUpload = (e) => {
        let progresBar = document.getElementById("progress");
        progresBar.style.display = "block";

        e.preventDefault();
        let isBlurry = false;
        let isLowRes = false;
        let thisUrl = null;
        const fd = new FormData();
        const useruser = firebase.auth().currentUser;
        const d = new Date;
        let imageName = useruser.uid + d.getTime();
        imageName = imageName.replace(/[&\/\\#,+()$~% -'":*?<>{}]/g, '');
        console.log("Image Name: " + imageName);
        fd.append('image', this.state.image, imageName);
        axios.post('https://us-central1-imageupload-9a880.cloudfunctions.net/uploadFile', fd, {
            onUploadProgress: progressEvent => {

            }
        })
            .then(res => {
                storage.ref().child(imageName).getDownloadURL().then(url => {
                    thisUrl = url;
                    this.setState({
                        url: url,
                        image: null
                    });
                    console.log("HIT" + thisUrl);
                }).then(() => {


                    var xhr = new XMLHttpRequest();
                    xhr.withCredentials = false;

                    const useruser = firebase.auth().currentUser;


                    xhr.addEventListener("readystatechange", function () {
                        if (this.readyState === 4) {
                            responseObj = JSON.parse(this.responseText);

                            isBlurry = responseObj.isBlurry;
                            isLowRes = responseObj.isLowRes;


                        }
                    });

                    //console.log("https://flask-sc-2qevsxcoxq-uc.a.run.app/skin-cancer/get-prediction?image-url=" + thisUrl + "&user-id=" + useruser.uid);

                    xhr.open("GET", "https://flask-sc-2qevsxcoxq-uc.a.run.app/skin-cancer/get-prediction?image-url=" + thisUrl + "&user-id=" + useruser.uid);

                    xhr.send();





                }).then(setTimeout(() => {

                    if (isBlurry == true) {
                        window.alert("The Image is seems to be Blurry. Please use a different Image");
                        window.location.reload(true);

                    }

                    else if (isLowRes == true) {
                        window.alert("The Image resolution is too low. The minimum resolution should be 300x300. Please use a different Image");
                        window.location.reload(true);
                    }

                    else {
                        this.setState({
                            accuracy: responseObj.percentageAccuracy,
                            prediction: responseObj.predictionType
                        });
                        console.log("Check Done Finlyy");
                        progresBar.style.display = "none";
                        document.getElementById("createButton").style.display = "block";
                    }

                }, 10000));


            });



    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.image != false) {
            this.props.createProject(this.state);
            this.props.history.push('/');
        }


    }





    render() {
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/signin' />


        return (


            <div className="conatiner">


                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">Create New Test</h5>

                    <div className="input-field">
                        <label htmlFor="title">Test Title</label>
                        <input type="text" id="title" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="content">Test Details</label>
                        <textarea id="content" className="materialize-textarea" onChange={this.handleChange} />
                    </div>
                    <div className="black-text text-darken-10">
                        Choose Image : -
                        <input id = "imagebtn" type="file" onChange={this.handleImageChange} />
                    </div>

                    <div className="input-field">
                        <select className="dropdown-trigger btn z-depth-0" onChange={this.handleLocation} id="location">
                            <option value="null">Select the Current Location</option>
                            <option value="regina">Regina</option>
                            <option value="saskatoon">Saskatoon</option>
                            <option value="calgary">Calgary</option>
                            <option value="edmonton">Edmonton</option>
                        </select>

                    </div>


                    <div className="input-field">
                        <select className="dropdown-trigger btn z-depth-0" onChange={this.handledoctorChange} id="second-choice">
                            <option value="null">Please Select Location first</option>
                        </select>

                    </div>

                    <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-0"
                            onClick={this.handleUpload} >
                            Save Data
                            </button>
                    </div>
                    <div className="progress" id="progress">
                        <div className="indeterminate"  ></div>
                    </div>

                    <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-0" id="createButton">Create Test</button>
                    </div>
                </form>
            </div >
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
