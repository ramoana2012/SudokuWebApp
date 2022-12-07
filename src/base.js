import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

var firebaseConfig = {
    apiKey: "AIzaSyBHw8hAkocwfvntz3x3wKTocPw634WIkxM",
    authDomain: "sudokuappfirebase.firebaseapp.com",
    projectId: "sudokuappfirebase",
    storageBucket: "sudokuappfirebase.appspot.com",
    messagingSenderId: "725874039815",
    appId: "1:725874039815:web:85bd6b24664050d0391ea2",
    measurementId: "G-KDTLRFZMGD"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);

export default app;