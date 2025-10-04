import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBaJcYmFAI9a60AkYwkcTymAtNJOiy83dI",
  authDomain: "krg-residency-system.firebaseapp.com",
  projectId: "krg-residency-system",
  storageBucket: "krg-residency-system.firebasestorage.app",
  messagingSenderId: "262639304269",
  appId: "1:262639304269:web:5d9fab2efad0f3670ea604"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;