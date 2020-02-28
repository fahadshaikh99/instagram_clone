import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCFQwNHXOp6RsxAlW9bc-ths85I96VvXWo",
    authDomain: "photo-feed-9bf2d.firebaseapp.com",
    databaseURL: "https://photo-feed-9bf2d.firebaseio.com",
    projectId: "photo-feed-9bf2d",
    storageBucket: "photo-feed-9bf2d.appspot.com",
    messagingSenderId: "1020770004070",
    appId: "1:1020770004070:web:12334ff5ab3355c6dc91a7",
    measurementId: "G-WQZM05193X"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const f = firebase;
  export const database = firebase.database();
  export const storage = firebase.storage();
  export const auth = firebase.auth();