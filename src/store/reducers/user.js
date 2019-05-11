import * as actionTypes from '../actions/actionTypes.js';

const initialState = {
    firstName: null,
    lastName: null,  
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_USER_INFO:
            return {
                ...state,
                firstName: action.userInfo.firstname,
                lastName: action.userInfo.lastname,
            }

        case actionTypes.CLEAR_USER_INFO:  
            return {
                ...state,
                firstName: null,
                lastName: null,
            }

        default:
            return {
                ...state
            };
    }
}

export default reducer;