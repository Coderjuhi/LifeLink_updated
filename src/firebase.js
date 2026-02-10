import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyC3MteXBSoYbwKRJEqHoPzSeMofHydVskI",
  authDomain: "lifelink-10d85.firebaseapp.com",
  projectId: "lifelink-10d85",
  storageBucket: "lifelink-10d85.firebasestorage.app",
  messagingSenderId: "409376217908",
  appId: "1:409376217908:web:a5958612e7ca3b77dee361",
  measurementId: "G-VW17K2Y29J"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
