export const createNote = (note) => {
    return (dispatch, getState, {getFirestore}) => {
      // make async call to database
      const firestore = getFirestore();
      const profile = getState().firebase.profile;
      const authorId = getState().firebase.auth.uid;
     // const testImage = 
      firestore.collection('notesList').add({
        ...note,
        
        authorId: authorId,
        createdAt: new Date()
        //testImage: 
        }).then(() => {
            console.log('Create Hit');
            dispatch({type: 'CREATE', note});
        }).catch((err) => {
            console.log('error Hit');
            dispatch({type: 'CREATE_ERROR', err});
        })
        
    }
}