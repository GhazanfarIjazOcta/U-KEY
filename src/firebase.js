// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set, get, child } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4mTh1veuQ9yrqfsooFoL0TvvW28eCDP0",
  authDomain: "u-key-db.firebaseapp.com",
  projectId: "u-key-db",
  databaseURL: "https://u-key-db-default-rtdb.firebaseio.com/",
  storageBucket: "u-key-db.firebasestorage.app",
  messagingSenderId: "408265586740",
  appId: "1:408265586740:web:e3ccd061f5fd327f6bf261",
  measurementId: "G-BG1XWEF80V"
};


const app = initializeApp(firebaseConfig);

// Firebase services
const auth = getAuth(app);
const rtdb = getDatabase(app);  // This is the Realtime Database

export { auth, rtdb, createUserWithEmailAndPassword, signInWithEmailAndPassword, ref, set, get, child };
