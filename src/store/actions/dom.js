import * as actionTypes from './actionTypes';
import axios from '../../axios';

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

// this is the action we dispatch from the container once we clicked that order button
export const confirmOrderConfirmation = (orderData, token, router) => {
    return dispatch => {      
      axios.post('/orders.json', orderData)
        .then(response => {
            console.log('inside dom actionCreator confirmOrderConfirmation then function and the response is -->  ',response);             
            // clear the shopping cart
            dispatch(cancelOrderConfirmation());      
            
            // redirect to home page                        
            router.push('/');            
        })
        .catch(error => {
        //   dispatch(purchaseBurgerFail(error));
            console.log('inside dom.js actionCreator confirmOrderConfirmation CATCH method ERROR --> ', error)
        });
    }
  }