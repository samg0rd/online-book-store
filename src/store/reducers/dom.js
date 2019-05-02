import * as actionTypes from '../actions/actionTypes';

const initialState = {
    cartNum: 0
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_TO_CART:
            return {
                ...state,
                cartNum: state.cartNum+=1
            }
    
        default:
            return state;
    }
}

export default reducer;