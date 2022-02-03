import { FirebaseOptions } from "firebase/app";

const apiKey = import.meta.env.VITE_FIREBASE_KEY;
const authDomain = import.meta.env.VITE_FIREBASE_DOMAIN;
const databaseURL = import.meta.env.VITE_FIREBASE_DATABASE;
const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
const storageBucket = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET;
const messagingSenderId = import.meta.env.VITE_FIREBASE_SENDER_ID;
const appId = import.meta.env.VITE_FIREBASE_APP_ID;
const measurementId = import.meta.env.VITE_FIREBASE_MEASUREMENT_ID;

export function getFirebaseConfig(): FirebaseOptions | undefined {
  if (
    typeof apiKey === "string" &&
    typeof authDomain === "string" &&
    typeof databaseURL === "string" &&
    typeof projectId === "string" &&
    typeof storageBucket === "string" &&
    typeof messagingSenderId === "string" &&
    typeof appId === "string" &&
    typeof measurementId === "string"
  ) {
    const options: FirebaseOptions = {
      apiKey: apiKey,
      authDomain: authDomain,
      databaseURL: databaseURL,
      projectId: projectId,
      storageBucket: storageBucket,
      messagingSenderId: messagingSenderId,
      appId: appId,
      measurementId: measurementId,
    };
    return options;
  } else {
    throw Error("invalid firebase env variables");
  }
}
