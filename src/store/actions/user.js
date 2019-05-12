import * as actionTypes from './actionTypes';

// import * as firebase from 'firebase';
import db from '../../configFirebase';

import store from '../index';



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

export const setUserOrders = () => {
    // SET USER INFO START  
            
    const ordersRef = db.ref('orders');
    
    const currentUserId = store.getState().auth.userId;

    // const anotherOrdersRef = ordersRef.child('user').equalTo(currentUserId);

    let userPurchases = [];

    ordersRef.on('value', function(snapshot){

        const relatedData = snapshot.val();        
        let keysArray = Object.keys(relatedData);            
            
        keysArray.forEach(orderId => {                                                
            if(currentUserId === relatedData[orderId].user.userId){
                userPurchases.push(relatedData[orderId]);
            }
        });                
        
    })
            

    console.log('userPurchases ---> ',userPurchases);
    
    // SET USER INFO END    
    return {
        type: actionTypes.SET_USER_ORDERS,
        userOrderInfo: userPurchases
    }
}