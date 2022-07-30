import firebase from "firebase/app";
import "firebase/auth";

// firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCVHyCD_XlIDwKVoP5_RqGMGTo173hZeYU",
  authDomain: "ecommerce-d99ce.firebaseapp.com",
  projectId: "ecommerce-d99ce",
  storageBucket: "ecommerce-d99ce.appspot.com",
  messagingSenderId: "560041602657",
  appId: "1:560041602657:web:462f3ca69dc465386f0420",
};

// initialize firebase app
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
