import * as actionTypes from './actionTypes';

export const addToCart = (selectedItem) => {
    return {
        type: actionTypes.ADD_TO_CART,
        selectedItem: selectedItem.item,
        quantity: selectedItem.number
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

export const removeFromCart = selectedItemIndex => {
    return {
        type: actionTypes.REMOVE_FROM_CART,
        itemToRemoveIndex: selectedItemIndex
    }
}

export const addItemNumber = (selectedItemIndex) => {
    return {
        type: actionTypes.ADD_ITEM_NUMBER,
        itemIndex: selectedItemIndex
    }
}

export const subItemNumber = (selectedItemIndex) => {
    return {
        type: actionTypes.SUB_ITEM_NUMBER,
        itemIndex: selectedItemIndex
    }
}

export const cancelOrderConfirmation = () => {
    return {
        type: actionTypes.CANCEL_ORDER_CONFIRMATION
    }
}

export const confirmOrderConfirmation = () => {
    return {
        type: actionTypes.CONFIRM_ORDER_CONFIRMATION
    }
}