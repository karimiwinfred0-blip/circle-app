import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD0WOh-KRKqPKOt92c_dNI6YRpyry7fVwM",
  authDomain: "circle-nairobi.firebaseapp.com",
  projectId: "circle-nairobi",
  storageBucket: "circle-nairobi.firebasestorage.app",
  messagingSenderId: "1039421118520",
  appId: "1:1039421118520:web:af1e90a4164fcaf6e0eecd",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);