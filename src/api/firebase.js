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

export async function getTodos(uid) {
  return get(ref(database, `todos/${uid}`)).then((snapshot) => {
    const items = snapshot.val() || {};

    const sortedItems = Object.values(items).sort(
      (a, b) => b.createdDate - a.createdDate
    );

    return sortedItems;
  });
}

export async function addNewTodo(uid, todo) {
  const id = uuid();

  set(ref(database, `todos/${uid}/${id}`), {
    ...todo,
    id,
    status: 'active',
    done: 0,
    createdDate: serverTimestamp(),
  });
}

export async function editTodo(uid, todo) {
  return set(ref(database, `todos/${uid}/${todo.id}`), todo);
}

export async function removeTodo(uid, todoId) {
  return remove(ref(database, `todos/${uid}/${todoId}`));
}

export async function getPomodoro(uid) {
  const date = getDate();
  return get(ref(database, `pomodoroCounts/${uid}/${date}`)).then(
    (snapshot) => {
      const items = snapshot.val() || 0;
      return items;
    }
  );
}

export async function setPomodoro(uid, pomodoro) {
  const date = getDate();
  await set(ref(database, `pomodoroCounts/${uid}/${date}`), pomodoro + 1);
}

function getDate() {
  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}${(
    currentDate.getMonth() + 1
  )
    .toString()
    .padStart(2, '0')}${currentDate.getDate().toString().padStart(2, '0')}`;
  return formattedDate;
}
