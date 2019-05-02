import * as actionTypes from './actionTypes';

export const addToCart = selectedItem => {
    return {
        type: actionTypes.ADD_TO_CART,
        selectedItem: selectedItem
    }
}

export const showCart = () => {
    return {
        type: actionTypes.SHOW_CART
    }
}

export const hideCart = () => {
    return {
        type: actionTypes.HIDE_CART
    }
}