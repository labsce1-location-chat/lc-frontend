// Actions

export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";

export const handleSignIn = (payload) => dispatch => {
    dispatch({type : SIGN_IN, payload : payload})
}

export const handleSignOut = (payload) => dispatch => {
    dispatch({type : SIGN_OUT, payload : payload})
}


