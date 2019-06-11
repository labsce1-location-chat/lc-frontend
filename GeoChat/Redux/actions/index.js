// Actions

import * as firebase from 'firebase';
import faker from 'faker';
export const SIGN_IN = "SIGN_IN";
export const TEST = "TEST";
export const SET_CHATROOMS = "SET_CHATROOMS"
export const CREATE_CHATROOM = "CREATE_CHATROOM"
export const LOGOUT = "LOGOUT"



export const handleSignIn = (payload, location) => dispatch => {
    dispatch({type : SIGN_IN, payload : payload, location : location})
    const key = firebase.database().ref("users").push().key
    firebase.database().ref("users").child(key).update({
      userName: faker.internet.userName(),
      avatar: `${faker.internet.avatar()}`,
      dateCreate: new Date(),
      id: key,
      joinedRooms: [],
      lat: location.lat,
      lon: location.lon,
    })
    // console.log("key from FB", key)
}

export const userLogout = (user) => dispatch => {
  console.log("Logout action")
  dispatch({type: LOGOUT, payload: payload, location: location})
}

export const handleLogOut = (user, location) => dispatch => {
    dispatch({type : LOGOUT, payload: user})
}
export const test = (payload) => dispatch => {
    dispatch({type : TEST})
}

export const setChatRooms = chatrooms => dispatch => {
    dispatch({type: SET_CHATROOMS, payload : chatrooms});
}

export const createChatRoom = (userName, avatarURL, chatRoomName, location) => dispatch => {

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

