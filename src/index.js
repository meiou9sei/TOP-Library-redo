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
