import { app } from "./firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export function signupNewUser() {
  const signupForm = document.querySelector("#signup");
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = signupForm.email.value;
    const password = signupForm.password.value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        signupForm.reset();
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
      });
  });
}

const auth = getAuth(app);
