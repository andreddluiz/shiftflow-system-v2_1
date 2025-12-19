
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Note: In a production environment, these values would come from environment variables.
// The placeholders below must be updated with actual project credentials in the .env file.
const firebaseConfig = {
  apiKey: "AIzaSy_MOCK_API_KEY",
  authDomain: "shiftflow-gol.firebaseapp.com",
  projectId: "shiftflow-gol",
  storageBucket: "shiftflow-gol.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
