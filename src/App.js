import React from 'react';
import { Component } from 'react'

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from '../src/Components/View/layout/Navbar';
import Dashboard from '../src/Components/View/dashboard/Dasboard';
import ProjectDetails from '../src/Components/Controller/projects/ProjectDetails';
import SignIn from '../src/Components/View/auth/SignIn';
import SignUp from '../src/Components/View/auth/SignUp';
import DocSignUp from '../src/Components/View/auth/DocSignUp';
import CreateProject from '../src/Components/Controller/projects/CreateProject';
import CreateNote from '../src/Components/Controller/notes/CreateNote';
import NotesDashboard from '../src/Components/Controller/notes/NotesDashboard';
import userSignIn from '../src/Components/View/auth/userSignIn';
import doctorSignIn from '../src/Components/View/auth/doctorSignIn';

class App extends Component {

  

  render() {
    return (
      <BrowserRouter>
        <div className="App">

        <Navbar />
        
          
          <Switch>
            <Route exact path='/' component={ Dashboard } />
            <Route path='/project/:id' component = {ProjectDetails}/>
            <Route path='/signin' component = {SignIn}/>
            <Route path='/usersignin' component = {userSignIn}/>
            <Route path='/doctorsignin' component = {doctorSignIn}/>
            <Route path='/signup' component = {SignUp} />
            <Route path='/docsignup' component = {DocSignUp} />
            <Route path='/createproject' component = {CreateProject} />
            <Route path='/createnote' component = {CreateNote} />
            <Route path='/notedashboard' component = {NotesDashboard}/>
          </Switch>
          
        </div>
      </BrowserRouter>
    );
  }

}

export default App;
