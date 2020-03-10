const initState = {
    projects: [
        { id: '1', title: 'help me find peach', content: 'blah blah blah' },
        { id: '2', title: 'collect all the stars', content: 'blah blah blah' },
        { id: '3', title: 'egg hunt with yoshi', content: 'blah blah blah' }
    ]
};
const projectReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE':
            console.log('created', action.project)
            return state;
        case 'CREATE_ERROR':
            console.log('Create error', action.err)
            return state;
        default:
            return state;
    }
   
}

export default projectReducer;