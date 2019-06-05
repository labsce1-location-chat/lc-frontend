// Actions

export const SIGN_IN = "SIGN_IN";
export const TEST = "TEST";
export const SET_CHATROOMS = "SET_CHATROOMS"

export const handleSignIn = (payload, location) => dispatch => {
    dispatch({type : SIGN_IN, payload : payload, location : location})
}

export const test = (payload) => dispatch => {
    dispatch({type : TEST})
}

export const setChatRooms = chatrooms => dispatch => {
    dispatch({type: SET_CHATROOMS, payload : chatrooms});
}
