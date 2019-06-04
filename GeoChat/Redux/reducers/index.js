// Reducers

// import {} from '../actions/index';

const initialState = {
    test : "Redux is working fine",
    test2:"or is it"
}

export const reducer = (state = initialState, action) => {
    switch(action.type){
        default:
            return state;
    }
}