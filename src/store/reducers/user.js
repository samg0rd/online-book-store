import * as actionTypes from '../actions/actionTypes.js';

const initialState = {
    firstName: null,
    lastName: null,
    userOrders: null,
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
                userOrders: null
            }

        case actionTypes.SET_USER_ORDERS:                            

            return {
                ...state,
                userOrders: action.userOrderInfo
            }

        default:
            return {
                ...state
            };
    }
}

export default reducer;