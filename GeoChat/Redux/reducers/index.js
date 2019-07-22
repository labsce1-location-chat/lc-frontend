// Reducers

import {SIGN_IN,
        TEST,
        SET_CHATROOMS,
        CREATE_CHATROOM,
        LOGOUT,
        UPDATE_USER,
        UPDATE_CHATLIST, 
        CHANGE_SCREEN,
        CREATE_TEST_ROOMS,
       } from '../actions/index';


const initialState = {
    test : "Redux is working fine",
    user : {},
    loggedIn : false,
    chatroom: "",
    location:{lat:0, lon:0},
    chatrooms : [],
    loading: true,
    screen : {name : "Chatrooms"},
    // chat-list, chatroom, create-chat-room, settings
}

export const reducer = (state = initialState, action) => {
    switch(action.type){

        case SIGN_IN:

            return {...state, user : action.payload, loggedIn : true, location : action.location};

        case LOGOUT:
            return {...state, loggedIn : false };

        case TEST:
            return {...state, test : "The function was called and I changed"}

        case SET_CHATROOMS:
            return {...state, chatrooms : action.payload}

        case CREATE_CHATROOM:
            return {...state, chatrooms: [...state.chatrooms, action.payload.chatRoomData], user: {...state.user, currentRoom: action.payload.roomKey}}
        case UPDATE_USER:
            return {...state, user: {...state.user, currentRoom: action.payload}}
        case LOGOUT:
            return {...state, test : "logout is true"}
        case UPDATE_CHATLIST:
            return {...state, chatrooms : action.payload}
        case CREATE_TEST_ROOMS:
            return {...state, chatrooms : action.payload}
        case CHANGE_SCREEN:
            return {...state, screen : action.payload}
        default:
            return state;
    }
}
