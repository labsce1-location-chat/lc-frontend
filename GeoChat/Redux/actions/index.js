// Actions
import InitializeFirebase from '../../firebaseConfig';
import * as firebase from 'firebase';

export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";
export const CREATE_CHATROOM = "CREATE_CHATROOM";

export const handleSignIn = (payload) => dispatch => {
    dispatch({type : SIGN_IN, payload : payload})
}

export const handleSignOut = (userID) => dispatch => {
  console.log('signed out')
    // dispatch({type : SIGN_OUT, payload : payload})
}

export const createChatRoom = (userData) => dispatch =>{
  dispatch({type: CREATE_CHATROOM})
    console.log("user data on create chatroom call", userData)
    // we'll need the user data from the payload
    firebase.database().ref("chatroom").set({
      userID: 1,
      userName: "Chad",
      createdAt: new Date(),
      name: "geo chat party",
      location: "lat long"
    })
    .then(chatroom => console.log(chatroom))
    .catch(err => console.log(err))
  // firebase instructions here
}

