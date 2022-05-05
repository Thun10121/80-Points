// functions import
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-analytics.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-database.js";

//URL you change change the thingy before .js
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//configuration !do not touch
const firebaseConfig = {
    apiKey: "AIzaSyANrI9PvNqHxOBjmiaNhiMWWjYXKIiPni0",
    authDomain: "points-dfd91.firebaseapp.com",
    projectId: "points-dfd91",
    storageBucket: "points-dfd91.appspot.com",
    messagingSenderId: "699709187982",
    appId: "1:699709187982:web:4a881460651a0980ff66df",
    measurementId: "G-BWB9ZLR8T7"
};

// intializations
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// function writeUserData() {
//     try {
//         const docRef = await addDoc(collection(db, "games"), {
//             gameID: 10121,
//             points: 80,
//             players: ["hbl", "thun", "eemmaa", "avocado"]
//         });
//         console.log("data saved");
//     } catch (e) {
//         console.error(e);
//     }
// }
// writeUserData();