import runApp from "./main";

import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

import "./normalize.css";
import "./styles.css";

runApp();

const firebaseConfig = {
  apiKey: "AIzaSyB9XL6YZAFlGJL9XKMqgvlLgJNOMlx3YHc",
  authDomain: "top-library-redo.firebaseapp.com",
  projectId: "top-library-redo",
  storageBucket: "top-library-redo.appspot.com",
  messagingSenderId: "790264663860",
  appId: "1:790264663860:web:c300b752614afd9f7f1f61",
};

// init firebase app
initializeApp(firebaseConfig);

// init services
const db = getFirestore();

// collection ref
const colRef = collection(db, "library");

// get collection data
getDocs(colRef)
  .then((snapshot) => {
    let myFireLibrary = [];
    snapshot.docs.forEach((doc) => {
      myFireLibrary.push({ ...doc.data(), id: doc.id });
    });
    console.log(myFireLibrary);
  })
  .catch((err) => console.log(err.message));
