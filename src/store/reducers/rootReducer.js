import authReducer from './authReducer';
import projectReducer from './projectReducer';
import noteReducer from './noteReducer';
import {combineReducers} from 'redux';
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
    auth: authReducer,
    project: projectReducer,
    note: noteReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});

export default rootReducer;