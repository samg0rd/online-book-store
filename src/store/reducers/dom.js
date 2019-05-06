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
                    price: action.selectedItem.price,
                    quantity: action.quantity
                }),
                subTotalPrice: state.subTotalPrice += (action.selectedItem.price * action.quantity)
            }
        
        case actionTypes.REMOVE_FROM_CART:            
            return {
                ...state,
                cartNum: state.cartNum-=1,
                cartItems: state.cartItems.filter((el,i) => i !== action.itemToRemoveIndex),
                subTotalPrice: state.subTotalPrice -= (state.cartItems[action.itemToRemoveIndex].price * state.cartItems[action.itemToRemoveIndex].quantity)
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

        case actionTypes.ADD_ITEM_NUMBER:            
            let cartItemsCopyAdd = [
                ...state.cartItems
            ]

            cartItemsCopyAdd[action.itemIndex].quantity+=1;

            let totalItemsPriceArray = cartItemsCopyAdd.map(el => el.price * el.quantity);


            return {
                ...state,
                cartItems: cartItemsCopyAdd,
                subTotalPrice: totalItemsPriceArray.reduce((prev, cur) => prev + cur )
            }

        case actionTypes.SUB_ITEM_NUMBER:            
            let cartItemsCopySub = [
                ...state.cartItems
            ]            

            if(cartItemsCopySub[action.itemIndex].quantity > 1){

                cartItemsCopySub[action.itemIndex].quantity-=1; 

                let totalItemsPriceArray2 = cartItemsCopySub.map(el => el.price * el.quantity);

                return {
                    ...state,
                    cartItems: cartItemsCopySub,                    
                    subTotalPrice: totalItemsPriceArray2.reduce((prev, cur)=> prev + cur )
                }
            }else{
                return {
                    ...state                
                }
            }
            
        case actionTypes.CANCEL_ORDER_CONFIRMATION:
            return {
                ...state,
                cartNum: 0,
                cartItems: [],                
            }
    
        default:
            return state;
    }
}

export default reducer;