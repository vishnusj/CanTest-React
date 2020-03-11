import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';


class SignIn extends Component {

    render() {
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


export default SignIn;