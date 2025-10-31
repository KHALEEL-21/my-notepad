import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDkm6BqFq_sfm_ziHzz2IzxfoWBrXc58Ls",
  authDomain: "my-notepad-free.firebaseapp.com",
  projectId: "my-notepad-free",
  storageBucket: "my-notepad-free.firebasestorage.app",
  messagingSenderId: "129315852413",
  appId: "1:129315852413:web:c1ebcbb8c836a836da6114",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export { ref, set, onValue };
