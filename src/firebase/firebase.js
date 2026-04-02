// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArPzSnZDnqzzdabtStO9fu4UL1KOldCqU",
  authDomain: "graduationdummyjson.firebaseapp.com",
  projectId: "graduationdummyjson",
  storageBucket: "graduationdummyjson.firebasestorage.app",
  messagingSenderId: "632530865737",
  appId: "1:632530865737:web:06e2182a443dff99af7998",
  measurementId: "G-S3L680052G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export default app
