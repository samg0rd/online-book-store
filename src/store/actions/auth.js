import axios from 'axios';
import localAxios from '../../axios';

import * as actionTypes from './actionTypes';

// if any header is needed for our post request 
const header = {
    'Content-Type': 'application/json',
    'Authorization': 'something!' 
}

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {    
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const auth = (email, password, firstname, lastname, isSignup, route, isLoggedInbeforePurchase) => {
    return dispatch => {
        dispatch(authStart());

        let authData = null;
        // if its a signIn request the auth data will be
        if(!isSignup){
            authData = {
                email: email,
                password: password,
                returnSecureToken: true
            };
        }else{
            // if its a signUp request the auth data will be
            authData = {
                firstname: firstname,
                lastname: lastname, 
                email: email,
                password: password,
                returnSecureToken: true
            };
        }
        // if its a signup request replace the url below  with the desired endpoint url  
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyACtYjKvBHtbbAl3rA-Ro7ahVYT5KrxlH0';
                
        // if its a signin request replace the url below  with the desired endpoint url
        if (!isSignup) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyACtYjKvBHtbbAl3rA-Ro7ahVYT5KrxlH0';            
        } 

        axios.post(url, authData, {headers: header})
            .then(response => {
                console.log(response);
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));                

                if(!isSignup && isLoggedInbeforePurchase !== true){
                  // redirect to the home       
                  route.push('/');
                }
                if (!isSignup && isLoggedInbeforePurchase === true){
                  route.push('/Receipt');                  
                }
            })
            .then(response=>{                
                // add a post request here to save some user data (first name and last name and authId ) as an object in the dataBase
                if (isSignup){                    
                    localAxios.post('/users.json', authData)
                    .then(response => {
                      console.log('USER INFO STORING IN DATA BASE THEN FUNC AND RESPONSE IS --> ', response);   
                        if(isLoggedInbeforePurchase === true){
                          route.push('/Receipt');      
                        }
                        if(isLoggedInbeforePurchase !== true){
                          route.push('/');
                        }
                    })
                    .catch(error => {
                        console.log('inside auth actionCreator auth catch function (which is going to upload signedU user info in the database) and the error is --> ', error.message)
                    });
                }
            })       
            .catch(err => {
              console.log('inside catch function of auth action and the ERROR IS --> ',err);
                // dispatch(authFail(err.response.data.error));
            });
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

// we call this method in app.js file to check if our token is expired or not
export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }   
        }
    };
};