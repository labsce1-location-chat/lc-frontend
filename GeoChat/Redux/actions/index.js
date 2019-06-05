// Actions

export const SIGN_IN = "SIGN_IN";
export const TEST = "TEST"

export const handleSignIn = (payload, location) => dispatch => {
    dispatch({type : SIGN_IN, payload : payload, location : location})
}

export const test = (payload) => dispatch => {
    dispatch({type : TEST})
}