import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

//Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAVWg1B-BlKbRrWhjWIkBhe-h501AYatyw",
  authDomain: "todo-crow.firebaseapp.com",
  projectId: "todo-crow",
  storageBucket: "todo-crow.appspot.com",
  messagingSenderId: "293647494750",
  appId: "1:293647494750:web:316dabad68be29ff8a8ecf",
  measurementId: "G-C65QZZZ1JR"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);