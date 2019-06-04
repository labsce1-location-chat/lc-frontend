// Reducers

// import {} from '../actions/index';

const initialState = {
    test : "Redux is working fine",
}

export const reducer = (state = initialState, action) => {
    switch(action.type){
        default:
            return state;
    }
}