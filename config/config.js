import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyB1MX06OB1O9v8Nt1r4h_uu79ryNYvlcsc",
  authDomain: "speed-up-games.firebaseapp.com",
  databaseURL: "https://speed-up-games.firebaseio.com",
  projectId: "speed-up-games",
  storageBucket: "speed-up-games.appspot.com",
  messagingSenderId: "162236211910",
  appId: "1:162236211910:web:fea69816b7fa9f38562dc7",
  measurementId: "G-HXN5092P7H"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const f = firebase;
  export const database = firebase.database();
  export const storage = firebase.storage();
  export const auth = firebase.auth();