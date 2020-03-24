import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";


class SignIn extends Component {

    render() {
        const {auth} = this.props;
        if(auth.uid) return <Redirect to='/'/>
        return (

            <div className="conatiner">
                <form onSubmit={this.handleSubmit} className="white">
                    

                    <ul className='center'>
                    <h5 className="grey-text text-darken-3">Choose the User Profile Type</h5>
                        <li><NavLink to='/usersignin' className="btn pink lighten-1 z-depth-0">User</NavLink></li>
                        <p></p>
                        <li><NavLink to='/doctorsignin' className="btn pink lighten-1 z-depth-0">Doctor</NavLink></li>
                    </ul>
                </form>
            </div >





        )

    }


}


const mapstateToProps = (state) => {
    return{
        auth: state.firebase.auth
    }
}



export default connect(mapstateToProps)(SignIn);