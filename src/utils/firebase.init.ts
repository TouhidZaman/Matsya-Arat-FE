// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
};
console.log("apiKey:", import.meta.env.VITE_apiKey);
console.log("authDomain:", import.meta.env.VITE_authDomain);
console.log("projectId:", import.meta.env.VITE_projectId);
console.log("storageBucket:", import.meta.env.VITE_storageBucket);
console.log("messagingSenderId:", import.meta.env.VITE_messagingSenderId);
console.log("appId:", import.meta.env.VITE_appId);
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
