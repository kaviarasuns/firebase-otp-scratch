// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlmuKExsbnHsq-YaFTdEoYkEpkfleb4F0",
  authDomain: "phoneauth-37eea.firebaseapp.com",
  projectId: "phoneauth-37eea",
  storageBucket: "phoneauth-37eea.appspot.com",
  messagingSenderId: "562301184812",
  appId: "1:562301184812:web:d88a8f2d29b1dbcab29a89"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app); 