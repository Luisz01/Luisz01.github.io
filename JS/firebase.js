// Firebase setup
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase, ref, set, get, child, update, remove } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";
import { db } from './firebase.js';
import { ref, onValue } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js';

const firebaseConfig = {
    apiKey: "AIzaSyDvtCjt2o7duNytvPEBm-a0S91MzUebOMk",
    authDomain: "restaurante-f6b4d.firebaseapp.com",
    databaseURL: "https://restaurante-f6b4d-default-rtdb.firebaseio.com",
    projectId: "restaurante-f6b4d",
    storageBucket: "restaurante-f6b4d.appspot.com",
    messagingSenderId: "125626296544",
    appId: "1:125626296544:web:64aabf1080540820e4c885",
    measurementId: "G-M2P5QVS8DB"
};

const app = initializeApp(firebaseConfig);

// Exporta o banco de dados
export const db = getDatabase(app);
