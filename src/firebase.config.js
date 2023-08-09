// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/getFirestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJ_itfsfhpQgna21bAZpN6Bi2mZIDQDcc",
  authDomain: "house-marketplace--app-34d86.firebaseapp.com",
  projectId: "house-marketplace--app-34d86",
  storageBucket: "house-marketplace--app-34d86.appspot.com",
  messagingSenderId: "296981753809",
  appId: "1:296981753809:web:29a02a95d99a46c478faf0",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
