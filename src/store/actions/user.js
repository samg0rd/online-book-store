import * as actionTypes from './actionTypes';

export const setUserInfo = userInfo => {
    return {
        type: actionTypes.SET_USER_INFO,
        userInfo: userInfo
    }
}

export const clearUserInfo = () => {
    return {
        type: actionTypes.CLEAR_USER_INFO
    }
}