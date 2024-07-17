import { initializeApp } from 'firebase/app';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAc6EAIjpDrtdvAU-cJdop79ekC7lRMDfs",
    authDomain: "mesnchmuseumapp.firebaseapp.com",
    projectId: "mesnchmuseumapp",
    storageBucket: "mesnchmuseumapp.appspot.com",
    messagingSenderId: "546649656483",
    appId: "1:546649656483:web:7e1391fc0273c42c644316",
    measurementId: "G-PHE41T606C"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, sendPasswordResetEmail };
