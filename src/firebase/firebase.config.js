// src/firebase.config.js (or wherever you have it)

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; // 1. Import getDatabase

const firebaseConfig = {
    apiKey: import.meta.env.VITE_apiKey,
    authDomain: import.meta.env.VITE_authDomain,
    projectId: import.meta.env.VITE_projectId,
    storageBucket: import.meta.env.VITE_storageBucket,
    messagingSenderId: import.meta.env.VITE_messagingSenderId,
    appId: import.meta.env.VITE_appId,
    // IMPORTANT: Make sure your databaseURL is in your .env file
    databaseURL: import.meta.env.VITE_databaseURL,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 2. Initialize the Realtime Database and export it
const db = getDatabase(app);

export { app, db }; // 3. Export db alongside app