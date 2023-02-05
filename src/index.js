import setupLibraryApp, { userLoggedinApp, userLoggedoutApp } from "./library";
import { setupSignins } from "./userAuth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./userAuth";

import "./normalize.css";
import "./styles.css";

// setup library
setupLibraryApp();
setupSignins();
// check if user logged in to run library
onAuthStateChanged(auth, (user) => {
  if (user) {
    userLoggedinApp(user);
  } else {
    userLoggedoutApp();
  }
});

function displayWarning(text) {
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
