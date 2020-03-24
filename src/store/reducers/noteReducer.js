const initState = {
    notes: [
        ]
};
const noteReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE':
            console.log('created', action.note)
            return state;
        case 'CREATE_ERROR':
            console.log('Create error', action.err)
            return state;
        default:
            return state;
    }
   
}

export default noteReducer;