import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyCrNP6CD_RFaFYidRf20urGofLXf6s2dL8",
    authDomain: "gdocs-9cc01.firebaseapp.com",
    projectId: "gdocs-9cc01",
    storageBucket: "gdocs-9cc01.appspot.com",
    messagingSenderId: "129331456894",
    appId: "1:129331456894:web:dbfe19f3a183fcc4f0e12f"
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();


const db = app.firestore();
export { db };
