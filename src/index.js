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

const db = firebase.database();
const ref = db.ref('books');
// ref.on('value', getData, errData);

let userRef = ref.child("users");
// console.log('userRef --> ',userRef.child("author"));
// Find the two shortest dinosaurs.
ref.orderByChild("price").limitToFirst(2).on("value", function(snapshot) {
  console.log('snapshot.key -->',snapshot.key);
});

// ref.orderByKey().on("value", function(snapshot) {
//   console.log(snapshot);
// });
ref.orderByChild('title').endAt('هملت').on("value", function(snapshot) {
  console.log(snapshot.key);
});

// Find all dinosaurs whose height is exactly 25 meters.
ref.orderByChild("title").equalTo('هملت').on("value", function(snapshot) {
  console.log(snapshot.key);
});

// function getData(data) {  
//   let books = data.val();
//   let keys = Object.keys(books);
//   console.log('books ==> ',keys);
//   keys.forEach((element,i) => {
//     console.log('element -> ', element)
//     console.log('index is -->', i);    
//     let bookTitle = books[i].title;
//     console.log('initials -->', bookTitle);
//     let author = books[i].author;
//     console.log('author -->', author);
//   });
// }

function errData(err){  
  console.log('err ---> ',err);
}


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
