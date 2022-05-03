import { initalizeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {

};

const app = initializeApp(firebaseConfig);
const dp = getFirestore(app); //database

