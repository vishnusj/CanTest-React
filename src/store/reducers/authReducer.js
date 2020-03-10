const initState = {
    authError: null
};
const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOGIN_ERROR':
            console.log('LOGIN ERROR');
            return {
                ...state,
                authError: 'Login Failed'
            }

        case 'LOGIN_SUCCESS':
            console.log('LOGIN SUCCESS');
            return {
                ...state,
                authError: null
            }
        case 'SIGNOUT_SUCCESS':
            console.log('signout sucess')
            return state;
        case 'SIGNUP_SUCCESS':
            console.log('signup success');
            return {
                ...state,
                authError: null
            }
        case 'SIGNUP_ERROR':
            console.log('signup error');
            return {
                ...state,
                authError: action.err.message
            }
        default:
            return state;
    }


}

export default authReducer;