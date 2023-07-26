// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDO4dpW8v7H4fErwKnkA-RyHbhXzRZlXLU",
  authDomain: "rn-app-notes.firebaseapp.com",
  projectId: "rn-app-notes",
  storageBucket: "rn-app-notes.appspot.com",
  messagingSenderId: "27043918429",
  appId: "1:27043918429:web:e5aaffd48fb39292a113b4"
};

const app = initializeApp(firebaseConfig);

export const FIRESTORE_DB = getFirestore(app)
export const FIREBASE_AUTH = getAuth(app)
