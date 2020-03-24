import React, { Component } from 'react'




class CreateProjectInterface extends Component {

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
    }




    handleLocation = (e) => {

    }

    handledoctorChange = (e) => {
    }

    handleChange = (e) => {



    }

    handleImageChange = (e) => {

    }

    handleUpload = (e) => {

    }

    handleSubmit = (e) => {

    }





    render() {
        return(
            null
        )
    }



}


export default CreateProjectInterface;
