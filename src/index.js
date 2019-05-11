import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

import store from './store';
import App from './App';

import * as firebase from 'firebase';

import * as serviceWorker from './serviceWorker';

import './index.scss';


// firebase configs
var firebaseConfig = {
  apiKey: "AIzaSyACtYjKvBHtbbAl3rA-Ro7ahVYT5KrxlH0",
  authDomain: "bookstore-be4af.firebaseapp.com",
  databaseURL: "https://bookstore-be4af.firebaseio.com",
  projectId: "bookstore-be4af",
  storageBucket: "bookstore-be4af.appspot.com",
  messagingSenderId: "207931825267",
  appID: "app-id",
};

firebase.initializeApp(firebaseConfig)

// defining database
const db = firebase.database();
// booksRef
const booksRef = db.ref('books');

booksRef.orderByChild('title').equalTo('جنگ و صلح').on("value", function(snapshot) {
  console.log(' in booksRef order it by child with the key of title جنگ و صلح =-=-=-==->>>  ',snapshot.val());  
});

// rendering the app
ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
   document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
