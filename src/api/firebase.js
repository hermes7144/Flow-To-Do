import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut,  } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId:process.env.REACT_APP_FIREBASE_PROJECT_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export  function login() {
  signInWithPopup(auth, provider).catch(console.error);
}

export function logout() {
  return signOut(auth);
}

export function onUserStateChange(callback) {
  onAuthStateChanged(auth, user => {
    callback(user)
  })
}