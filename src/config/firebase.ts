import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInAnonymously,
  signOut,
} from "firebase/auth";
import { getDatabase, ref, onValue, set } from "firebase/database";
import config from "./config";

// @ts-ignore
const Firebase = initializeApp(config.firebase);

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
