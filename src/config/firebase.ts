import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCfIBX6eUOyFHLWHGGjNn8ZMkBCYreULt4",
  authDomain: "sparklee-d00db.firebaseapp.com",
  projectId: "sparklee-d00db",
  storageBucket: "sparklee-d00db.appspot.com",
  messagingSenderId: "713052198323",
  appId: "1:713052198323:web:44114a5e749006d12467c6",
  measurementId: "G-72BBBF3LZH",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const gitProvider = new GithubAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
