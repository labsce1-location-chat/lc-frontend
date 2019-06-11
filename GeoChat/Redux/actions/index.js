// Actions

import * as firebase from 'firebase';
export const SIGN_IN = "SIGN_IN";
export const TEST = "TEST";
export const SET_CHATROOMS = "SET_CHATROOMS"
export const CREATE_CHATROOM = "CREATE_CHATROOM"
export const LOGOUT = "LOGOUT"


export const handleSignIn = (payload, location) => dispatch => {
    dispatch({type : SIGN_IN, payload : payload, location : location})
}

export const handleLogOut = (user, location) => dispatch => {
    dispatch({type : LOGOUT, payload: })
}
export const test = (payload) => dispatch => {
    dispatch({type : TEST})
}

export const setChatRooms = chatrooms => dispatch => {
    dispatch({type: SET_CHATROOMS, payload : chatrooms});
}

export const createChatRoom = (userName, avatarURL, chatRoomName, location) => dispatch => {

    // console.log("user id in action", userID, chatRoomName)
    dispatch({type : CREATE_CHATROOM})
    const key = firebase.database().ref("chatrooms").push().key

    firebase.database().ref("chatrooms").child(key).update({
      name: chatRoomName,
      description: "user created",
      lat: location.lat,
      lon: location.lon,
      createdAt: new Date(),
      id: key,
      numberOfUsers: 0,
      userName: userName,
      userAvatar: avatarURL,
    })
}

