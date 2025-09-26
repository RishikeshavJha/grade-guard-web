// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVdE2y6rc8soz1B0QCynJV5mXDMJ1cV5g",
  authDomain: "saraswatiidatabase.firebaseapp.com",
  projectId: "saraswatiidatabase",
  storageBucket: "saraswatiidatabase.firebasestorage.app",
  messagingSenderId: "477494660817",
  appId: "1:477494660817:web:e1f2f43cbe8dad9cf3fff0",
  measurementId: "G-2D3KDT4PXG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
