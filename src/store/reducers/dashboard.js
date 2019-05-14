import * as actionTypes from '../actions/actionTypes';

const initialState = {
    showOrders: true,
    showRentals: false,
    showUserSettings: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SHOW_USER_ORDERS:
            
            return {
                ...state,
                showOrders: true,
                showRentals: false,
                showUserSettings: false
            }

        case actionTypes.SHOW_USER_RENTALS:
            
            return {
                ...state,
                showOrders: false,
                showRentals: true,
                showUserSettings: false
            }

        case actionTypes.SHOW_USER_SETTINGS:
            
            return {
                ...state,
                showOrders: false,
                showRentals: false,
                showUserSettings: true
            }
            
    
        default:
            return state;
    }
}

export default reducer;