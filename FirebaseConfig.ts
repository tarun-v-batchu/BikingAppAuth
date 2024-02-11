// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVKbEvezOk_IpY2sy7pqP6ZkmTmgbnbeY",
  authDomain: "rnauthvideo-c061f.firebaseapp.com",
  projectId: "rnauthvideo-c061f",
  storageBucket: "rnauthvideo-c061f.appspot.com",
  messagingSenderId: "278275911885",
  appId: "1:278275911885:web:750b5cc94c2fc7e0e3f984"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);