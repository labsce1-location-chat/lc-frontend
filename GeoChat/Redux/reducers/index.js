// Reducers

import {SIGN_IN, SIGN_OUT, CREATE_CHATROOM} from '../actions/index';

const initialState = {
    test : "Redux is working fine",
    user : {},
    loggedIn : false,
    chatroom: {}
}

export const reducer = (state = initialState, action) => {
    switch(action.type){
        case SIGN_IN:
            console.log("SIGN IN FUNCTION CALLED")
            return {...state, user : action.payload.user, loggedIn : true};
        case SIGN_OUT:
            console.log("SIGN OUT FUNCTION CALLED")
            return {...state, user : action.payload.user, loggedIn : false};
        case CREATE_CHATROOM:
            console.log("create chatroom functiion called ")
            return {...state, chatroom: {}};
        default:
            return state;
    }
}
