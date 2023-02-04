import { app } from "./firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const main = document.querySelector("main");

export function signupNewUser() {
  const signupForm = document.querySelector("#signup");
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = signupForm.email.value;
    const password = signupForm.password.value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        main.removeChild(signupForm);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
      });
  });
}

export const auth = getAuth(app);
