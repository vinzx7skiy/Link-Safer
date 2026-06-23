import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
 getAuth
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
 getFirestore
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA2ejuhn5qrrQWYS9RyleWqbns4OILDxXY",
  authDomain: "link-safer.firebaseapp.com",
  projectId: "link-safer",
  storageBucket: "link-safer.firebasestorage.app",
  messagingSenderId: "697650314687",
  appId: "1:697650314687:web:417f0a8636f2b7e12fb50a",
  measurementId: "G-8ZWHS45VCP"
};

const app =
initializeApp(firebaseConfig);

export const auth =
getAuth(app);

export const db =
getFirestore(app);