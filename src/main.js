import { addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";

export default function runApp(externalBooks, db, colRef) {
  let myLibrary = [];

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

  // clear display when running app
  function clearDisplay() {
    booksDisplay.innerHTML = "";
  }
  clearDisplay();

  // display firebase books
  externalBooks.forEach((book) => {
    let externalBook = new Book(
      book.title,
      book.author,
      book.pages,
      book.readStatus,
      book.id
    );
    addBookToLibrary(externalBook);
  });
}
