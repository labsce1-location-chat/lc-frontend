// Actions

export const SIGN_IN = "SIGN_IN";

export const handleSignIn = (payload, location) => dispatch => {
    dispatch({type : SIGN_IN, payload : payload, location : location})
}