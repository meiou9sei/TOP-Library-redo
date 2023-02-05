import { app } from "./firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export function setupSignins() {
  const signupForm = document.querySelector("#signup");
  const loginForm = document.querySelector("#login");
  const toLoginButton = document.querySelector(".to-login-button");
  const toSignupButton = document.querySelector(".to-signup-button");

  // display sign up initially
  loginForm.style.display = "none";

  // signup form
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = signupForm.email.value;
    const password = signupForm.password.value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        signupForm.style.display = "none";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
      });
  });

  toLoginButton.addEventListener("click", () => {
    signupForm.style.display = "none";
    loginForm.style.display = "block";
  });

  // login form
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = loginForm.email.value;
    const password = loginForm.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        loginForm.style.display = "none";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
      });
  });

  toSignupButton.addEventListener("click", () => {
    loginForm.style.display = "none";
    signupForm.style.display = "block";
  });
}

export const auth = getAuth(app);
