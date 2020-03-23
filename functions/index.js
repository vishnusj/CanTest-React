const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);





const createNotification = (notification) => {
  return admin.firestore().collection('notifications').add(notification)
    .then(doc => console.log('Notification Added', doc))
}


exports.noteCreated = functions.firestore
  .document('notesList/{noteId}')
  .onCreate(doc => {

    const note = doc.data();
    const notification = {
      content: 'has a new Note',
      user: `${note.authorName}`,
      time: admin.firestore.FieldValue.serverTimestamp(),
      project: `${note.projectId}`,
      noteContent:  `${note.content}`,
      noteTitle:  `${note.title}`
    }

    return createNotification(notification);

  });


  exports.projectCreated = functions.firestore
  .document('projects/{projectId}')
  .onCreate(doc => {

    const project = doc.data();
    const notification = {
      content: 'Added a new Project',
      user: `${project.authorFirstName} ${project.authorLastName}`,
      time: admin.firestore.FieldValue.serverTimestamp(),
      userId: `${project.authorId}`,
      doctorId: `${project.doctor}`

    }

    return createNotification(notification);

  });


exports.userJoined = functions.auth.user()
  .onCreate(user => {

    return admin.firestore().collection('users')
      .doc(user.uid).get().then(doc => {

        const newUser = doc.data();
        const notification = {
          content: 'Joined the Application',
          user: `${newUser.firstName} ${newUser.lastName}`,
          time: admin.firestore.FieldValue.serverTimestamp(),
          userId: `${project.authorId}`,
          doctorId: `${project.doctor}`

        }
        return createNotification(notification);

      })


  });




