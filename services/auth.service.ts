
import { auth } from './firebase';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User as FirebaseUser 
} from 'firebase/auth';

export const AuthService = {
  login: async (email: string, pass: string) => {
    return signInWithEmailAndPassword(auth, email, pass);
  },

  logout: async () => {
    return signOut(auth);
  },

  subscribeToAuthChanges: (callback: (user: FirebaseUser | null) => void) => {
    return onAuthStateChanged(auth, callback);
  }
};
