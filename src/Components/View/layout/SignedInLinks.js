import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from "react-redux";
import { signOut } from '../../../store/actions/authActions'

const SignedInLinks = (props) => {
    console.log("Initials " + props.profile.initials);
    let initials = props.profile.initials ? props.profile.initials : "Dr";
    return (

        <ul className='right'>
            <li><NavLink to='/createproject'>New Test</NavLink></li>
            <li><a onClick={props.signOut}>Log Out</a></li>
            <li><NavLink to='/' className='btn btn-floating pink lighten-1'>
                {initials}
            </NavLink></li>
        </ul>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(SignedInLinks);