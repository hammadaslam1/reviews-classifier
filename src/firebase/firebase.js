// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyt2Nl2QanJnDsmojexCPg1NPJTKOgCzU",
  authDomain: "mha-classifier.firebaseapp.com",
  projectId: "mha-classifier",
  storageBucket: "mha-classifier.appspot.com",
  messagingSenderId: "112690109273",
  appId: "1:112690109273:web:d18e18dfcbe4e26a84ca48",
  measurementId: "G-KGDS5VZ61L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);