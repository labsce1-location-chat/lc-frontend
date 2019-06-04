// Reducers

import {SIGN_IN} from '../actions/index';

const initialState = {
    test : "Redux is working fine",
    user : {},
    loggedIn : false,
}

export const reducer = (state = initialState, action) => {
    switch(action.type){
        case SIGN_IN:
            console.log("SIGN IN FUNCTION CALLED")
            return {...state, user : action.payload.user, loggedIn : true};
        default:
            return state;
    }
}