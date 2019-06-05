// Reducers

import {SIGN_IN, TEST, CREATE_CHATROOM} from '../actions/index';

const initialState = {
    test : "Redux is working fine",
    user : {},
    loggedIn : false,
    chatroom: "",
    location:{lat:0, lon:0},
}

export const reducer = (state = initialState, action) => {
    switch(action.type){
        case SIGN_IN:
            console.log("SIGN IN FUNCTION CALLED")
            return {...state, user : action.payload.user, loggedIn : true, location : action.location};
        case TEST:
            return {...state, test : "The function was called and I changed"}
        case CREATE_CHATROOM:
            return {...state, test : "this is the create chatroom reducer"}
        default:
            return state;
    }
}
