import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCXukgq13F_oFtFGdB-4Ki3v4OBDRNJdtc",
  authDomain: "whangsaff-67976.firebaseapp.com",
  databaseURL:
    "https://whangsaff-67976-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "whangsaff-67976",
  storageBucket: "whangsaff-67976.appspot.com",
  messagingSenderId: "896713345913",
  appId: "1:896713345913:web:8b5e41146730383e6dbda8",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();
const database = getDatabase(app);

export { app, db, auth, storage, googleProvider, database };
