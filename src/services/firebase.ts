import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1KwobxvH8wsLqmJPJCFeu6lOqPcKXNT8",
  authDomain: "shiftflow-85430.firebaseapp.com",
  projectId: "shiftflow-85430",
  storageBucket: "shiftflow-85430.firebasestorage.app",
  messagingSenderId: "184977137930",
  appId: "1:184977137930:web:7901fe04cd4ac7a9315af3",
  measurementId: "G-VECKP38FFF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
export const auth = getAuth(app);

// Initialize Firestore
export const db = getFirestore(app);

console.log('Firebase initialized with project:', firebaseConfig.projectId);