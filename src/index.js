import { initFirebaseApp } from "./firebase";
import runLibraryApp from "./library";

import "./normalize.css";
import "./styles.css";

// init firebase app
initFirebaseApp();

// run app
runLibraryApp();

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
