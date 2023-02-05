import { app } from "./firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { auth } from "./userAuth";
import { signOut } from "firebase/auth";

const libraryWrapper = document.querySelector(".library-wrapper");
const logoutButton = document.querySelector(".logout-button");
const signUp = document.getElementById("signup");
const currentUserDisplay = document.querySelector(".current-user-display");

export function userLoggedinApp() {
  // display library
  libraryWrapper.style.display = "block";
  logoutButton.style.display = "block";
  currentUserDisplay.textContent = "Current user: " + user.uid;
  currentUserDisplay.style.display = "block";
  signUp.style.display = "none";
}

export function userLoggedoutApp() {
  currentUserDisplay.style.display = "none";
  // display login/signup
  logoutButton.style.display = "none";
  libraryWrapper.style.display = "none";
}

export default function setupLibraryApp() {
  // set up logout
  logoutButton.addEventListener("click", () => {
    signOut(auth);
  });

  // init services
  const db = getFirestore(app);

  // collection ref
  const colRef = collection(db, "library");

  // real time collection data
  onSnapshot(colRef, (snapshot) => {
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

  // webapp logic

  // declarations
  let myLibrary = [];
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
      readStatus: addBookForm.isBookRead.value,
    }).then(() => {
      console.log("adding book successful");
      addBookForm.reset();
    });
  }

  function addBookToLibrary(newBook) {
    myLibrary.push(newBook);
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
      console.log(bookCard.dataset.id);
      const docRef = doc(db, "library", bookCard.dataset.id);
      deleteDoc(docRef);
    });
    bookCard.appendChild(discardBook);

    // toggle read button
    const toggleRead = document.createElement("button");
    toggleRead.textContent = "toggle read";
    toggleRead.addEventListener("click", function () {
      // new way
      const bookToUpdate = doc(db, "library", bookCard.dataset.id);
      updateDoc(bookToUpdate, { readStatus: !readStatus });
    });
    bookCard.appendChild(toggleRead);

    // sets bookCard bg color class
    if (newBook.read) bookCard.classList.add("bookCardRead");
    else bookCard.classList.add("bookCardNotRead");

    return bookCard;
  }
}
