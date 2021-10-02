import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCp6H94uOjFnuEvgDEoTt2V_PLtt0DBnrs",
  authDomain: "answercommunity-328ec.firebaseapp.com",
  projectId: "answercommunity-328ec",
  storageBucket: "answercommunity-328ec.appspot.com",
  messagingSenderId: "471754929471",
  appId: "1:471754929471:web:76a974475f1d82dbf54f8a",
  measurementId: "G-KJV9NQRBNJ"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

export const firebaseInstance = firebase;

export const messaging = firebase.messaging();
export const authService = firebase.auth();
export const dbService = firebase.firestore();
export const storageService = firebase.storage();