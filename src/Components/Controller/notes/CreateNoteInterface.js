import React, { Component } from 'react'


class CreateNoteInterface extends Component {

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
    }

    handleChange = (e) => {
    }
    handleSubmit = (e) => {
  
    }
    render() {
        return(
            null
        )
    }
}



export default CreateNoteInterface;