import * as actionTypes from './actionTypes';

export const showUserOrders = () => {
    return {
        type: actionTypes.SHOW_USER_ORDERS
    }
}

export const showUserRentals = () => {
    return {
        type: actionTypes.SHOW_USER_RENTALS
    }
}

export const showUserSettings = () => {
    return {
        type: actionTypes.SHOW_USER_SETTINGS
    }
}

