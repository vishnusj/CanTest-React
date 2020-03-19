import React from 'react';

import firebase from 'firebase';


const DoctorList = ({ doctors }) => {
    console.log("Reach" + doctors);

    doctors && doctors.map(doctor => {
        return (
            <div className="doctor-list section">
                <div className="card-content">

                    <p>Doctor: {doctor.firstName} {doctor.lastName}</p>

                </div>
            </div>
        );



    })
}
               




        

export default DoctorList;

