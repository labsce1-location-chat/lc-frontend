// Actions

import * as firebase from 'firebase';
import faker from 'faker';
export const SIGN_IN = "SIGN_IN";
export const TEST = "TEST";
export const SET_CHATROOMS = "SET_CHATROOMS"
export const CREATE_CHATROOM = "CREATE_CHATROOM"
export const LOGOUT = "LOGOUT"



export const handleSignIn = (payload, location) => dispatch => {
         const key = firebase.database().ref("users").push().key
           firebase.database().ref("users").child(key).update({
             userName: faker.internet.userName(),
             avatar: `${faker.internet.avatar()}`,
             dateCreated: new Date(),
             id: key,
             joinedRooms: [],
             lat: location.lat,
             lon: location.lon,
             accountType: "temp",
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
    dispatch({type : LOGOUT, payload: user})
}
export const test = (payload) => dispatch => {
    dispatch({type : TEST})
}

export const setChatRooms = () => dispatch => {
    const ref = firebase.database().ref('chatrooms');
    ref.once('value').then(snap => {
    console.log("*****what is this coming back from the DB*****", Object.values(snap.val()))
    dispatch({type: SET_CHATROOMS, payload: Object.values(snap.val()) });
    })
    .catch(err => console.log("Error getting chatrooms", err))
}

export const createChatRoom = (userName, avatarURL, userID, chatRoomName, location, roomAvatar) => dispatch => {

    const key = firebase.database().ref("chatrooms").push().key
    console.log("UPLOADING THE IMAGE NOW!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    uploadImageToFirebase(roomAvatar, key).then(() => {
      console.log("Successful Upload")
    })
    .catch(err => {
      console.log(err)
    })
    
    firebase.database().ref("chatrooms").child(key).update({
      name: chatRoomName,
      description: "user created",
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

    // const chatroom = firebase.database().ref(`chatrooms/${key}`)
    //   chatroom.once("value")
    //   .then(snapshot => {
    //     dispatch({type : CREATE_CHATROOM, payload: snapshot})
    //   })
}

uploadImageToFirebase = async(uri, imageName) => { // imageName will be the key created by firebase for the chatroom
  const response = await fetch(uri);
  const blob = await response.blob();
  const ref = firebase.storage().ref('chatroom-avatars').child(imageName);
  ref.put(blob);
}

