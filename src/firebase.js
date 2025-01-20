// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const apiUrl = process.env.REACT_APP_SECRET_KEY;

const firebaseConfig = {
  apiKey: "AIzaSyDCYGHE04UfBwLlP1HbxzEQv4rDmJRVtaM",
  authDomain: "alteroffice-1fe39.firebaseapp.com",
  projectId: "alteroffice-1fe39",
  storageBucket: "alteroffice-1fe39.firebasestorage.app",
  messagingSenderId: "789249935826",
  appId: "1:789249935826:web:2f87637222d99765bd200b",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
