import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDCteT6Ophq9LAqvBnc1nN6hyZFgV9qIEY",
    authDomain: "imageupload-9a880.firebaseapp.com",
    databaseURL: "https://imageupload-9a880.firebaseio.com",
    projectId: "imageupload-9a880",
    storageBucket: "imageupload-9a880.appspot.com",
    messagingSenderId: "387742874102",
    appId: "1:387742874102:web:1e46221f8a65c716d06fd7",
    measurementId: "G-BB3F12MLQ9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();
firebase.firestore().settings({ timestampsInSnapshots: true });

const storage = firebase.storage();

export {
    storage, firebase as default
}