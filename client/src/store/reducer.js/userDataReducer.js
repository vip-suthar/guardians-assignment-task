import initialState from '../initialState'

export default function userDataReducer(state = initialState.userData, action) {

    switch(action.type) {
        case 'SET_USER_LOGGED_IN':
            state = action.payload;
            break;
        case 'SET_USER_LOGGED_IN':
            state = initialState.userData;
        default:
            break;
    }
    return state;
}