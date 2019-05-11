import * as actionTypes from '../actions/actionTypes.js';

const initialState = {
    firstName: null,
    lastName: null,    
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_USER_INFO: 
            console.log('inside user reducer action.userInfo -------------------------------------------------> ',action.userInfo);
            console.log('inside user reducer action.userInfo.firstname -------------------------------------------------> ',action.userInfo.firstname);
            console.log('inside user reducer action.userInfo.lastname -------------------------------------------------> ',action.userInfo.lastname);
            return {
                ...state,
                firstName: action.userInfo.firstname,
                lastName: action.userInfo.lastname,
            }

        case actionTypes.CLEAR_USER_INFO:  
            return {
                ...state
            }

        default:
            return {
                ...state
            };
    }
}

export default reducer;