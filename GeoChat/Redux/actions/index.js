// Actions

import * as firebase from 'firebase';
export const SIGN_IN = "SIGN_IN";
export const TEST = "TEST"
export const CREATE_CHATROOM = "CREATE_CHATROOM"

export const handleSignIn = (payload, location) => dispatch => {
    dispatch({type : SIGN_IN, payload : payload, location : location})
}

export const test = (payload) => dispatch => {
    dispatch({type : TEST})
}


export const createChatRoom= (userID) => dispatch => {

  console.log("user id in action", userID)
    dispatch({type : CREATE_CHATROOM})
    firebase.database().ref("chatroom").set({
      name: "new room",
      id: 999999,
      userID: userID,
    })
}

