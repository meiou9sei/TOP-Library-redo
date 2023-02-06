import { app } from "./firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { auth } from "./userAuth";
import { onAuthStateChanged, signOut } from "firebase/auth";

const libraryWrapper = document.querySelector(".library-wrapper");
const logoutButton = document.querySelector(".logout-button");
const signUp = document.getElementById("signup");
const currentUserDisplay = document.querySelector(".current-user-display");

export function userLoggedinApp(user) {
  // display library
  libraryWrapper.style.display = "flex";
  logoutButton.style.display = "flex";
  currentUserDisplay.textContent = "Current user: " + user.uid;
  currentUserDisplay.style.display = "flex";
  signUp.style.display = "none";
}

export function userLoggedoutApp() {
  currentUserDisplay.style.display = "none";
  // display login/signup
  logoutButton.style.display = "none";
  libraryWrapper.style.display = "none";
  signUp.style.display = "block";
}

export default function setupLibraryApp() {
  // init services
  const db = getFirestore(app);
  let colRef = null;
  let currUser = null;
  let unsub = null;

  onAuthStateChanged(auth, (user) => {
    currUser = user;
    if (user) {
      // define current user's collection ref
      colRef = collection(db, `${user.uid}-library`);

      // real time collection data
      unsub = onSnapshot(colRef, (snapshot) => {
        let myFireLibrary = [];
        snapshot.docs.forEach((doc) => {
          myFireLibrary.push({ ...doc.data(), id: doc.id });
        });

        // clear library
        booksDisplay.innerHTML = "";
        // add books back
        myFireLibrary.forEach((book) => {
          let newBook = new Book(
            book.title,
            book.author,
            book.pages,
            book.readStatus,
            book.id
          );
          addBookToLibrary(newBook);
        });
      });
    }
  });

  // set up logout
  logoutButton.addEventListener("click", () => {
    signOut(auth);
    unsub();
  });

  // declarations
  const booksDisplay = document.getElementById("booksDisplay");
  const addBookForm = document.getElementById("addBookForm");
  addBookForm.addEventListener("submit", submitNewBook);

  // constructor
  function Book(title, author, pages, read, id = null) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
  }

  Book.prototype.info = function () {
    return `${title} by ${author}, ${pages} pages, ${
      read ? "read" : "not read yet" + "."
    }`;
  };

  function submitNewBook(e) {
    e.preventDefault();

    addDoc(colRef, {
      title: addBookForm.bookTitle.value,
      author: addBookForm.bookAuthor.value,
      pages: addBookForm.bookPages.value,
      readStatus: addBookForm.isBookRead.value === "true",
    }).then(() => {
      console.log("adding book successful");
      addBookForm.reset();
    });
  }

  function addBookToLibrary(newBook) {
    addBookToDisplay(newBook);
  }

  function addBookToDisplay(newBook) {
    let newBookCard = createBookCard(newBook);
    booksDisplay.appendChild(newBookCard);
  }

  function createBookCard(newBook) {
    const bookCard = document.createElement("div");
    const title = document.createElement("p");
    const author = document.createElement("p");
    const pages = document.createElement("p");
    const readStatus = document.createElement("p");

    title.textContent = newBook.title;
    author.textContent = newBook.author;
    pages.textContent = newBook.pages;
    readStatus.textContent = `Book read: ${newBook.read}`;

    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pages);
    bookCard.appendChild(readStatus);

    // remove book button
    const discardBook = document.createElement("button");
    discardBook.textContent = "remove book";
    bookCard.dataset.id = newBook.id;
    discardBook.addEventListener("click", function () {
      const docRef = doc(db, `${currUser.uid}-library`, bookCard.dataset.id);
      deleteDoc(docRef);
    });
    bookCard.appendChild(discardBook);

    // toggle read button
    const toggleRead = document.createElement("button");
    toggleRead.textContent = "toggle read";
    toggleRead.addEventListener("click", async function () {
      const bookToUpdate = doc(
        db,
        `${currUser.uid}-library`,
        bookCard.dataset.id
      );
      const docSnap = await getDoc(bookToUpdate);

      if (docSnap.exists()) {
        updateDoc(bookToUpdate, { readStatus: !docSnap.data().readStatus });
      } else {
        console.log("could not update book readStatus");
      }
    });
    bookCard.appendChild(toggleRead);

    // sets bookCard bg color class
    console.log(newBook, newBook.read);
    if (newBook.read) bookCard.classList.add("bookCardRead");
    else bookCard.classList.add("bookCardNotRead");

    return bookCard;
  }
}
