// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsqaAfk9geLgjPosirtVX-XbH9_nDN6SQ",
  authDomain: "consult-portal.firebaseapp.com",
  projectId: "consult-portal",
  storageBucket: "consult-portal.firebasestorage.app",
  messagingSenderId: "489444700107",
  appId: "1:489444700107:web:a2e9f14356f220534f904e",
  measurementId: "G-47HP7S5D2L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
export default app;
export const db = getFirestore(app);