// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const apiUrl = process.env.REACT_APP_SECRET_KEY;
console.log(apiUrl);
const firebaseConfig = {
  apiKey: "AIzaSyAdlM2ULO_0OMaa49t8fsHQS-SQXlIFPAQ",
  authDomain: "alteroffice-1a3e8.firebaseapp.com",
  projectId: "alteroffice-1a3e8",
  storageBucket: "alteroffice-1a3e8.firebasestorage.app",
  messagingSenderId: "133400583331",
  appId: "1:133400583331:web:48faf33728c3bee6987316",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
