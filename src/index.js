import runLibraryApp from "./library";
import { signupNewUser } from "./userAuth";

import "./normalize.css";
import "./styles.css";
import { auth } from "./userAuth";
import { onAuthStateChanged } from "firebase/auth";

const main = document.querySelector("main");

// check if user logged in to run library
onAuthStateChanged(auth, (user) => {
  if (user) {
    const currentUserDisplay = document.createElement("div");
    currentUserDisplay.textContent = "Current user: " + user.uid;
    main.appendChild(currentUserDisplay);

    runLibraryApp();
  } else {
    console.log("running");
    // display login/signup
    const signupTemplate = document.getElementById("signup-template").content;
    main.appendChild(document.importNode(signupTemplate, true));
    signupNewUser();
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
