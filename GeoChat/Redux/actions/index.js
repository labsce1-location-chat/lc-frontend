// Actions

export const SIGN_IN = "SIGN_IN";

export const handleSignIn = (payload) => dispatch => {
    dispatch({type : SIGN_IN, payload : payload})
}