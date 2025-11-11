// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAKK94tYsFpx_4sst8rmVzL5DKKIbFQrnE",
    authDomain: "game-hub-app-2bb8d.firebaseapp.com",
    projectId: "game-hub-app-2bb8d",
    storageBucket: "game-hub-app-2bb8d.firebasestorage.app",
    messagingSenderId: "665248642273",
    appId: "1:665248642273:web:c08abd9877a052f38933a0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);