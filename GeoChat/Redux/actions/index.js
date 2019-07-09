// Actions

import * as firebase from 'firebase';
import faker from 'faker';
export const SIGN_IN = "SIGN_IN";
export const TEST = "TEST";
export const SET_CHATROOMS = "SET_CHATROOMS"
export const CREATE_CHATROOM = "CREATE_CHATROOM"
export const LOGOUT = "LOGOUT"
export const UPDATE_USER = "UPDATE_USER"
export const UPDATE_CHATLIST = "UPDATE_CHATLIST"
export const CHANGE_SCREEN = "CHANGE_SCREEN"
export const CREATE_TEST_ROOMS = "CREATE_TEST_ROOMS"



export const handleSignIn = (payload, location) => dispatch => {
         const key = firebase.database().ref("users").push().key
           firebase.database().ref("users").child(key).update({
             userName: faker.internet.userName(),
             avatar: `${faker.internet.avatar()}`,
             dateCreated: new Date(),
             id: key,
             joinedRooms: [],
             currentRoom: "",
             lat: location.lat,
             lon: location.lon,
             accountType: "temp",
             // this will be a string with the current room they are in.
           })
         // there's got to be a better way to do this. 
        const db = firebase.database().ref(`users/${key}`)
          db.once("value")
          .then(snapshot => {
            dispatch({type : SIGN_IN, payload : snapshot.val(), location : location})
          })


}

export const userLogout = (user) => dispatch => {
  console.log("Logout action")
  dispatch({type: LOGOUT, payload: payload, location: location})
}

export const handleLogOut = (user, location) => dispatch => {
  if(user.accountType === "temp"){
    firebase.database().ref('users').child(user.id).remove();
  }
  dispatch({type : LOGOUT, payload: user})
}
export const test = (payload) => dispatch => {
    dispatch({type : TEST})
}

export const setChatRooms = () => dispatch => {
    const ref = firebase.database().ref('chatrooms');
    ref.once('value').then(snap => {
    dispatch({type: SET_CHATROOMS, payload: Object.values(snap.val()) });
    })
    .catch(err => console.log("Error getting chatrooms", err))
}



export const createChatRoom = (userName, avatarURL, userID, chatRoomName, location, roomAvatar) => dispatch => {
     

    // I'm creating the key for the new chatroom
    const key = firebase.database().ref("chatrooms").push().key
    // then add it to the user's current room field
    firebase.database().ref("users").child(`${userID}`).update({
      currentRoom: key
    })

    firebase.database().ref("chatrooms").child(key).update({
      name: chatRoomName,
      lat: location.lat,
      lon: location.lon,
      createdAt: new Date(),
      userKey: userID,
      id: key,
      numberOfUsers: 1,
      userName: userName,
      userAvatar: avatarURL,
      roomAvatar : ""
    })
    const chatroom = firebase.database().ref(`chatrooms/${key}`)
      chatroom.once("value")
      .then(snapshot => {
        dispatch({type : CREATE_CHATROOM, payload: {chatRoomData: snapshot, roomKey: chatroom}})
      })
}

uploadImageToFirebase = async(uri, imageName) => { // imageName will be the key created by firebase for the chatroom
  const response = await fetch(uri);
  const blob = await response.blob();
  const ref = firebase.storage().ref('chatroom-avatars').child(imageName);
  ref.put(blob);
}


export const updateUserChatroom = (chatRoomID, userID) => dispatch => {
  firebase.database().ref("users").child(`${userID}`).update({
    currentRoom: chatRoomID
  })
  dispatch({type: UPDATE_USER, payload: chatRoomID})
}

export const updateChatlist = (chatrooms) => dispatch => {
  dispatch({type : UPDATE_CHATLIST, payload : chatrooms})
}

export const createTestRooms = () => dispatch => {
  const lat = 40.7484;
  const lon = -73.9857
  let latDistance = 0
  let lonDistance = 0
    console.log("Trying to create test rooms")

    for(let i=0;i<10;i++) {
      let key = firebase.database().ref("chatrooms").push().key

      firebase.database().ref("chatrooms").child(key).update({
        name: "TestChatRoom",
        lat: lat + latDistance,
        lon: lon + lonDistance,
        createdAt: new Date(),
        userKey: "this is a fake user",
        id: key,
        numberOfUsers: 1,
        userName: "Test User",
        userAvatar: "",
        roomAvatar : ""
      })
      latDistance += 0.01
      lonDistance += 0.01
    }
}

// export const changeScreen = screen => dispatch => {
//   dispatch({type : CHANGE_SCREEN, payload : screen})
// }
