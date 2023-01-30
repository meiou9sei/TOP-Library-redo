import runApp from "./main";

import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

import "./normalize.css";
import "./styles.css";

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
    console.log("firebaseBooks successfully retrieved");
    console.log(myFireLibrary);
    // initiate app
    runApp(myFireLibrary, db, colRef);
  })
  .catch((err) => {
    displayWarning("error retrieving books from database");
    console.log(err.message);
  });

function displayWarning(text) {
  console.log(text);

  const errorDisplay = document.createElement("div");
  errorDisplay.classList.add("warning");
  const errorTitle = document.createElement("h2");
  errorTitle.textContent = "Error!";
  errorDisplay.appendChild(errorTitle);
  const errorDescription = document.createElement("p");
  errorDescription.textContent = text;
  errorDisplay.appendChild(errorDescription);

  const library = document.querySelector(".library");
  library.appendChild(errorDisplay);
  setTimeout(library.removeChild(displayWarning), 5000);
}
