export const createProject = (project) => {

    // Setup listners to keep track of when the state is changed
    // to triger rerenders (observer pattern)
    const listeners = [];

    const subscribe = (listener) => (
        listeners.push(listener)
    );
    
    return (dispatch, getState, { getFirestore }) => {
        // make async call to database
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        // const testImage = 
        firestore.collection('projects').add({
            ...project,
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName,
            authorId: authorId,
            createdAt: new Date()
            //testImage: 
        }).then(() => {
            console.log('Create Hit');
            dispatch({ type: 'CREATE', project });
        }).catch((err) => {
            console.log('error Hit');
            dispatch({ type: 'CREATE_ERROR', err });
        })

    }
}