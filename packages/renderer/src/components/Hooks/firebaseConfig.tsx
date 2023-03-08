// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGn3yUYjEF9fZpciLkT2eLKc4xlejumdI",
  authDomain: "livechat-69642.firebaseapp.com",
  projectId: "livechat-69642",
  storageBucket: "livechat-69642.appspot.com",
  messagingSenderId: "392261138705",
  appId: "1:392261138705:web:78efc14cc67f746e8ab4b0",
  measurementId: "G-QYS6G97WCB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app)