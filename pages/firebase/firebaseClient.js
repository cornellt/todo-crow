import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

// TODO: Replace the following with your app's Firebase project configuration
// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.FIREBASE_APP_ID,
//   measurementId: process.env.FIREBASE_MEASUREMENT_ID
// };

const firebaseConfig = {
  apiKey: "AIzaSyAVWg1B-BlKbRrWhjWIkBhe-h501AYatyw",
  authDomain: "todo-crow.firebaseapp.com",
  projectId: "todo-crow",
  storageBucket: "todo-crow.appspot.com",
  messagingSenderId: "293647494750",
  appId: "1:293647494750:web:316dabad68be29ff8a8ecf",
  measurementId: "G-C65QZZZ1JR"
};

const app = initializeApp(firebaseConfig);

export default firebase;
export const auth  = getAuth(app);
export const db = getFirestore(app);