// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-firestore-lite.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyANrI9PvNqHxOBjmiaNhiMWWjYXKIiPni0",
    authDomain: "points-dfd91.firebaseapp.com",
    projectId: "points-dfd91",
    storageBucket: "points-dfd91.appspot.com",
    messagingSenderId: "699709187982",
    appId: "1:699709187982:web:4a881460651a0980ff66df",
    measurementId: "G-BWB9ZLR8T7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const dp = getFirestore(app); //database
const analytics = getAnalytics(app);
const auth = getAuth(app);

onAuthStateChanged(auth, user => {
    if (user != null) {
        console.log('logged in!');
    } else {
        console.log('no user');
    }
});

console.log("hi");