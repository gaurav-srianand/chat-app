// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGzEIhDemmazqhCa8Kan9l4usDUv9oPgQ",
  authDomain: "chat-bd4f5.firebaseapp.com",
  projectId: "chat-bd4f5",
  storageBucket: "chat-bd4f5.appspot.com",
  messagingSenderId: "730059091664",
  appId: "1:730059091664:web:f2f1606d606b4d7f9278d5"
}; 

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();