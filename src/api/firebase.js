import { initializeApp } from 'firebase/app';
import { v4 as uuid } from 'uuid';
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import {
  get,
  getDatabase,
  ref,
  remove,
  serverTimestamp,
  set,
} from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const database = getDatabase();

export function login() {
  signInWithPopup(auth, provider).catch(console.error);
}

export function logout() {
  return signOut(auth);
}

export function onUserStateChange(callback) {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}

export async function getTodos(userId) {
  return get(ref(database, `todos/${userId}`)).then((snapshot) => {
    const items = snapshot.val() || {};
    return Object.values(items);
  });
}

export async function addNewTodo(userId, name) {
  const id = uuid();

  set(ref(database, `todos/${userId}/${id}`), {
    id,
    name,
    status: 'active',
    dealine: '2024-01-21',
    done: 0,
    estimate: 0,
    createdDate: serverTimestamp(),
  });
}

export async function removeTodo(userId, todoId) {
  return remove(ref(database, `todos/${userId}/${todoId}`));
}
