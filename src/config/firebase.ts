import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInAnonymously,
  signOut,
} from "firebase/auth";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { getFirebaseConfig } from "./config";

const firebaseConfig = getFirebaseConfig();
if (firebaseConfig === undefined) throw new Error("Invalid firebase config.");

const Firebase = initializeApp(firebaseConfig);

const Providers = {
  google: new GoogleAuthProvider(),
};
const auth = getAuth();

const database = getDatabase();

export {
  Providers,
  auth,
  signInWithPopup,
  signInAnonymously,
  signOut,
  database,
  ref,
  onValue,
  set,
};

export default Firebase;
