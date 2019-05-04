import * as actionTypes from '../actions/actionTypes';

const initialState = {
    cartNum: 0,
    cartItems: [],
    showCart: false,
    subTotalPrice: 0
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
                    price: action.selectedItem.price
                }),
                subTotalPrice: state.subTotalPrice += action.selectedItem.price
            }
        
        case actionTypes.REMOVE_FROM_CART:
            console.log('from DOM reducer --> action.itemToRemoveIndex is --> ', action.itemToRemoveIndex);
            return {
                ...state,
                cartNum: state.cartNum-=1,
                cartItems: state.cartItems.filter((el,i) => i !== action.itemToRemoveIndex)
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