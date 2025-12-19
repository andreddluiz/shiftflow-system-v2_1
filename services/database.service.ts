
import { db } from './firebase';
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  collection, 
  query, 
  where, 
  getDocs 
} from 'firebase/firestore';
import { UserProfile, SystemSettings } from '../types';

export const DatabaseService = {
  getUserProfile: async (uid: string): Promise<UserProfile | null> => {
    const docRef = doc(db, 'usuarios', uid);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? (docSnap.data() as UserProfile) : null;
  },

  getSystemSettings: async (): Promise<SystemSettings | null> => {
    const docRef = doc(db, 'configuracoes', 'sistema');
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? (docSnap.data() as SystemSettings) : null;
  },

  updateSystemSettings: async (settings: Partial<SystemSettings>) => {
    const docRef = doc(db, 'configuracoes', 'sistema');
    return updateDoc(docRef, {
      ...settings,
      updatedAt: new Date().toISOString()
    });
  }
};
