// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyASeDQJXnYNz5cawL_kFrn6CzOeIKEnPPo",
  authDomain: "chameleon-61660.firebaseapp.com",
  projectId: "chameleon-61660",
  storageBucket: "chameleon-61660.appspot.com",
  messagingSenderId: "624808727609",
  appId: "1:624808727609:web:6e966123e2d6df73e029e8",
  measurementId: "G-JGY8H2B9GW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Get a reference to the storage service
export const storage = getStorage(app);

export { app, analytics };
