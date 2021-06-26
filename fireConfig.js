import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAFCOmi9MYqsMPR3xqAn7rxQrGHMka-h2Q",
    authDomain: "watsappexpo.firebaseapp.com",
    projectId: "watsappexpo",
    storageBucket: "watsappexpo.appspot.com",
    messagingSenderId: "645945449551",
    appId: "1:645945449551:web:9fed7efedc139ffaab9e3a"
};


export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()
