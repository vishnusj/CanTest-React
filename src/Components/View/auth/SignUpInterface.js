import React, { Component } from 'react'



class SignUpInterface extends Component {
  state = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    location: ''
  }

  handleLocation = (e) => {
    // Change the location value
  }

  handleDoctorCheck = (e) => {
    // Change the Doctor names according to location
  }

  handleChange = (e) => {
    // Code for handling changes made in the Sign Up form

  }
  handleSubmit = (e) => {
    // Code for handling submission on the sign up form.
  }
  render() {
    // Rendering the class component.
    return (
      null
    )
  }
}


export default SignUpInterface;
