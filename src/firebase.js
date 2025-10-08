// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5c5ECVfQWnYis3h2aK60ynkT6tG5K_sI",
  authDomain: "family-car-sharing-edf43.firebaseapp.com",
  databaseURL: "https://family-car-sharing-edf43-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "family-car-sharing-edf43",
  storageBucket: "family-car-sharing-edf43.firebasestorage.app",
  messagingSenderId: "705221190297",
  appId: "1:705221190297:web:77f0c7aa88d86b8b528e08"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and export
export const database = getDatabase(app);