import * as actionTypes from '../actions/actionTypes';

const initialState = {
    cartNum: 0,
    cartItems: [],
    showCart: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_TO_CART:
            return {
                ...state,
                cartNum: state.cartNum+=1,
                cartItems: state.cartItems.concat({
                    name: action.selectedItem.title,
                    author: action.selectedItem.author,
                })
            }
        
        case actionTypes.SHOW_CART: 
            return {
                ...state,
                showCart: true
            }

        case actionTypes.HIDE_CART:
            return {
                ...state,
                showCart: false
            }
    
        default:
            return state;
    }
}

export default reducer;