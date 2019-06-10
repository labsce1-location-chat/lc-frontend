// Actions

import * as firebase from 'firebase';
export const SIGN_IN = "SIGN_IN";
export const TEST = "TEST";
export const SET_CHATROOMS = "SET_CHATROOMS"
export const CREATE_CHATROOM = "CREATE_CHATROOM"

export const handleSignIn = (payload, location) => dispatch => {
    dispatch({type : SIGN_IN, payload : payload, location : location})
}

export const test = (payload) => dispatch => {
    dispatch({type : TEST})
}

export const setChatRooms = chatrooms => dispatch => {
    dispatch({type: SET_CHATROOMS, payload : chatrooms});
}

export const createChatRoom = (userID, chatRoomName, location) => dispatch => {

    // console.log("user id in action", userID, chatRoomName)
    dispatch({type : CREATE_CHATROOM})
    firebase.database().ref("chatroom").set({
      name: chatRoomName,
      lat: location.lat,
      lon: location.lon,
    //   name: "new room",
    //   id: 999999,
      userID: userID,
    })
}

