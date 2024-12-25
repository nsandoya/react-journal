// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// 1. Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: `${import.meta.env.VITE_FIREBASE_APP_API_KEY}`,
  authDomain: `${import.meta.env.VITE_FIREBASE_APP_AUTH_DOMAIN}`,
  projectId: `${import.meta.env.VITE_FIREBASE_APP_PROJECT_ID}`,
  storageBucket: `${import.meta.env.VITE_FIREBASE_APP_STORAGE_BUCKET}`,
  messagingSenderId: `${import.meta.env.VITE_FIREBASE_APP_MESSAGING_SENDER_ID}`,
  appId: `${import.meta.env.VITE_FIREBASE_APP_APP_ID}`,
  
  
};

// 2. Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

// 3. Auth
export const FirebaseAuth = getAuth(FirebaseApp);

// 4. BBDD
export const FirebaseDB = getFirestore(FirebaseApp)
