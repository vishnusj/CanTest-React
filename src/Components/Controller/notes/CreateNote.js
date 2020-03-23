import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createNote } from '../../../store/actions/noteAction';
import { Redirect } from 'react-router-dom';
import firebase from 'firebase';
let username = [];
let userId = [];

class CreateNote extends Component {

    constructor(props) {
        super(props);
        this.projectIdn = null;

        this.state = {
            title: '',
            content: '',
            projectId: null,
            authorName: ''
        }

    }

    // Note List Generation
    async componentDidMount() {

        const fsDB = firebase.firestore();
        await fsDB.collection("users").get().then(function (querySnapshot) {
            let i = 0;
            querySnapshot.forEach(function (doc) {

                username[i] = doc.data().firstName + " " + doc.data().lastName;
                userId[i] = doc.id;
                i = i + 1;

            });


        });

    }

    handleChange = (e) => {
        const useruser = firebase.auth().currentUser;
        this.projectIdn = this.props.location.aboutProps.id.substr(this.props.location.aboutProps.id.lastIndexOf('/') + 1);
        let author = null;
        for (let i = 0; i < username.length; i++) {
            if (useruser.uid == userId[i]) {
                author = username[i];
            }
        }

        this.setState({
            projectId: this.projectIdn,
            authorName: author,
            [e.target.id]: e.target.value,

        })

    }
    handleSubmit = (e) => {
        e.preventDefault();


        this.props.createNote(this.state);
        this.props.history.push('/project/' + this.projectIdn);
    }
    render() {
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/signin' />
        return (



            <div className="container">
                <form className="white" onSubmit={this.handleSubmit}>
                    <h5 className="grey-text text-darken-3">Add a new note</h5>
                    <div className="input-field">
                        <input type="text" id='title' onChange={this.handleChange} />
                        <label htmlFor="title">Note Title</label>
                    </div>
                    <div className="input-field">
                        <textarea id="content" className="materialize-textarea" onChange={this.handleChange}></textarea>
                        <label htmlFor="content">Note Content</label>
                    </div>
                    <div className="input-field">
                        <button className="btn pink lighten-1">Create</button>
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

const mapDispatchToProps = dispatch => {
    return {
        createNote: (note) => dispatch(createNote(note))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateNote)