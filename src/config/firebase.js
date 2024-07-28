import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAr4Qk2lJ1oL2pWuR5p-NX9bd5eeg8Dk1Q",
    authDomain: "furikaeri-app.firebaseapp.com",
    projectId: "furikaeri-app",
    storageBucket: "furikaeri-app.appspot.com",
    messagingSenderId: "834018993965",
    appId: "1:834018993965:web:53fac07d17d859779315a4"  
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };