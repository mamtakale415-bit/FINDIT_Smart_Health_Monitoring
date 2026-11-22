
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDCYVvhfcTa1N5FHBWNM0IRxZjIqcvWnRg",
  authDomain: "medicare-smart-health.firebaseapp.com",
  projectId: "medicare-smart-health",
  storageBucket: "medicare-smart-health.firebasestorage.app",
  messagingSenderId: "92774410565",
  appId: "1:92774410565:web:ba21079ce073d99c12b62c",
  measurementId: "G-8SRDRLDL0J"
};

// Initialize Firebase
const app = getApps().length
  ? getApp()
  : initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
