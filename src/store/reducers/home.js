import * as actionTypes from '../actions/actionTypes';
// import { updateObject } from '../utility';

const initialState = {
    homeData: null,
    error: false,
    selected: null
}

const reducer = (state = initialState, action) => {
    switch ( action.type ) {
        case actionTypes.SET_HOME_DATA:
            
            return {
                ...state,
                error: false,
                homeData: action.books
            }
            
        case actionTypes.FETCH_HOME_DATA_FAILED:

            return {
                ...state,
                error: true
            }

        case actionTypes.SELECT_BOOK:

            return {
                ...state,
                selected: action.selected
            }

        case actionTypes.DESELECT_BOOK: 
            
            return {
                ...state,
                selected: null
            }

        default:
            return state;
    }
}

export default reducer;