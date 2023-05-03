// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAiXTirkZkTV-lrqk8l4f3gyJDIJmFP15g",
  authDomain: "thred-s.firebaseapp.com",
  projectId: "thred-s",
  storageBucket: "thred-s.appspot.com",
  messagingSenderId: "932176154493",
  appId: "1:932176154493:web:a3db31447f16b6972f4614",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
