import React, { Component } from 'react'
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux'
import SignUpInterface from './SignUpInterface'
import { docsignUp } from '../../../store/actions/authActions';

class DocSignUp extends SignUpInterface {
    

    handleLocation = (e) => {
        e.preventDefault();

        this.setState({ location: e.target.value });



    }

    handleDoctorCheck = (e) => {
        console.log("Reach");
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value

        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.firstName.length == 0)
            window.alert("First name cannot be empty");
        else if (this.state.lastName.length == 0)
            window.alert("Last name cannot be empty");
        else if (this.state.location.length == 0)
            window.alert("Location cannot be empty");
        else {
            console.log(this.state);
            this.props.docsignUp(this.state);
        }
    }
    render() {
        const { auth, authError } = this.props;
        if (auth.uid) return <Redirect to='/' />
        return (
            <div className="conatiner">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">Doctor Sign Up</h5>
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" id="firstName" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" id="lastName" onChange={this.handleChange} />
                    </div>
                    <h7 className="grey-text text-darken-3" htmlFor="location">Location</h7>
                    <div className="input-field">

                        <select className="dropdown-trigger btn z-depth-0" onChange={this.handleLocation} id="location">
                            <option selected >Please Select your Current Location</option>
                            <option value="regina">Regina</option>
                            <option value="saskatoon">Saskatoon</option>
                            <option value="calgary">Calgary</option>
                            <option value="edmonton">Edmonton</option>
                        </select>

                    </div>


                    <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-0">Sign Up</button>
                        <div className="red-text center">
                            {authError ? <p>{authError}</p> : null}
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
}




const mapDispatchToProps = (dispatch) => {
    return {
        docsignUp: (newUser) => dispatch(docsignUp(newUser))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DocSignUp);
