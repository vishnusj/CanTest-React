import React from 'react';
import {Link} from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { connect } from "react-redux";

const Navbar = (props) => {
    const {auth, profile} = props;
    console.log("Profile "+profile.initials);
    const links = auth.uid ? <SignedInLinks profile={profile}/> : <SignedOutLinks />
    return  (
        <nav className="nav-wrapper grey darken-3">
            <div className="container">
                <Link to='/' className="brand-logo">CanTest - Skin Cancer Detection</Link>
                {links}
            </div>
        </nav>
    )
}

const mapStateToProps = (state) => {
    console.log(state);
    return{

        auth: state.firebase.auth,
        profile: state.firebase.profile

    }
}

export default connect(mapStateToProps)(Navbar);  