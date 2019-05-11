import * as firebase from 'firebase';

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

firebase.initializeApp(firebaseConfig);

const db = firebase.database();

export default db;