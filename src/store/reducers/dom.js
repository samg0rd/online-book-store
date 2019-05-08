import * as actionTypes from '../actions/actionTypes';

const initialState = {
    cartNum: 0,
    cartItems: [],
    showCart: false,
    subTotalPrice: 0,
    onOrderNotLoggedin: false,
    purchaseStart: false,
    errorOnPurchase: ''
}

const reducer = (state = initialState, action) => {    
    
    switch (action.type) {        

        case actionTypes.ADD_TO_CART:

            let itemToAdd = {
                name: action.selectedItem.title,
                author: action.selectedItem.author,
                price: action.selectedItem.price,
                quantity: action.quantity
            }

            let cartItemsCopy = [...state.cartItems];
            let itemNames = [];
            let cartNumCopy = state.cartNum;

            state.cartItems.map(el=>itemNames.push(el.name));

            if(itemNames.find(el=> el === itemToAdd.name)){
                state.cartItems.forEach(el => {
                    if(el.name === itemToAdd.name){
                        el.quantity+=itemToAdd.quantity;
                    }
                });
            }else{
                cartItemsCopy = cartItemsCopy.concat(itemToAdd); 
                cartNumCopy = cartNumCopy+=1;
            }

            return {
                ...state,                
                cartNum: cartNumCopy,                
                cartItems: cartItemsCopy,
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
        
        case actionTypes.TOGGLE_ON_ORDER_NOT_LOGGEDIN:            
            return {
                ...state,
                onOrderNotLoggedin: action.toggle
            }
            
        case actionTypes.CANCEL_ORDER_CONFIRMATION:
            return {
                ...state,
                cartNum: 0,
                cartItems: [],
                subTotalPrice: 0,                     
            }

        case actionTypes.PURCHASE_START: 
            return {
                ...state,
                purchaseStart: true
            }

        case actionTypes.PURCHASE_SUCCESS:
            return {
                ...state,
                purchaseStart: false
            }

        case actionTypes.PURCHASE_FAILED:
            return {
                ...state,
                purchaseStart: false,
                errorOnPurchase: action.error
            }
    
        default:
            return state;
    }
}

export default reducer;