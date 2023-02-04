import runLibraryApp from "./library";
import { signupNewUser } from "./userAuth";

import "./normalize.css";
import "./styles.css";

// check if user logged in to run library
if (false) {
  runLibraryApp();
} else {
  // display login/signup
  const template = document.getElementById("signup-template");
  document.querySelector("main").appendChild(template.content);
  signupNewUser();
}

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
