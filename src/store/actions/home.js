import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const setHomeData = books => {
    // console.log('books ---> ',books);
    return {
        type: actionTypes.SET_HOME_DATA,
        books: books
    }
}

export const fetchHomeDataFailed = () => {
    return {
        type: actionTypes.FETCH_HOME_DATA_FAILED
    }
}

export const selectBook = selectedIndex => {
    return {
        type: actionTypes.SELECT_BOOK,
        selected: selectedIndex
    }
}

export const deselectBook = () => {
    return {
        type: actionTypes.DESELECT_BOOK
    }
}

export const fetchHomeData = () => {
    return dispatch => {
      axios.get('/books.json')
        .then(response => {    
            // console.log('BOOK DATA FETCHED!! --> ', response);    
            dispatch(setHomeData(response.data));
        })
        .catch(error => {
            // console.log('BOOK DATA FAILED!! --> ', error);
            dispatch(fetchHomeDataFailed());
        })
    }
}
