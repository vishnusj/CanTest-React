import React, { Component } from "react";

import { connect } from 'react-redux';
import { firestoreConnect, getFirebase } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import firebase from 'firebase';
import moment from 'moment';

let noteContent = [];
let noteTitle = [];
let noteCreatedAt = [];
let noteProject = [];


class NotesDashboard extends Component {

    constructor(props) {
        super(props);

        this.rows = [];
        this.projectIdn = null;
    }


    // Doctor List Generation
    async componentDidMount() {

        const fsDB = firebase.firestore();
        await fsDB.collection("notesList").get().then(function (querySnapshot) {
            let i = 0;
            querySnapshot.forEach(function (doc) {

                noteTitle[i] = doc.data().title;
                noteContent[i] = doc.data().content;
                noteCreatedAt[i] = doc.createdAt;
                noteProject[i] = doc.data().projectId;
                //console.log("Logs: " + noteTitle[i]);
                i = i + 1;

            });


        });

    }


    render() {
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/signin' />
        try {
            this.projectIdn = this.props.location.aboutProps.id.substr(this.props.location.aboutProps.id.lastIndexOf('/') + 1);
        }
        catch (err) {
            this.props.history.push('/');
        }
        console.log("Logs: " + noteTitle.length);
        if (noteTitle.length != 0) {

            for (let i = 0; i < noteTitle.length; i++) {
                if (noteProject[i] == this.projectIdn)
                    this.rows.push(
                        <div className="dashboard container">
                            <div className="row" id="eachRow">
                                <div className="col s12 m6">

                                    <div className="card z-depth-0 project-summary">
                                        <div className="card-content grey-text text-darken-3">
                                            <span className="card-title">{noteTitle[i]}</span>
                                            <p>Content : {noteContent[i]} </p>
                                            <p>Project ID: {noteProject[i]}</p>
                                            <p className="grey-text">{noteCreatedAt[i]}</p>
                                        </div>
                                    </div>


                                </div>


                            </div>
                        </div>);
            }


            this.rows.length = 3;

            return (
                <div>{this.rows}</div>
            );



        }
        return (
            <div className="container">
                <p>Loading Notes...</p>
            </div>
        )

    }

}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}



export default connect(mapStateToProps)(NotesDashboard);